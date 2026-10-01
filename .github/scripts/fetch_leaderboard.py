import os
import re
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from io import StringIO

import pandas as pd
import pytz
import requests
from bs4 import BeautifulSoup


# ---------------------------------------------------------------------------
# 榜单配置
# ---------------------------------------------------------------------------
# 原 lmarena.ai 已更名为 Arena AI，新域名为 https://arena.ai/。
# 模型榜单现为一个目录，包含以下子榜单。
BASE_URL = "https://arena.ai"
OUTPUT_DIR = "docs-site/content/other/model_rank"
EN_OUTPUT_DIR = "docs-site/content/i18n/english/other/model_rank"

# 每个榜单的配置：
#   slug          : 输出文件名（不含扩展名）与 README 链接标识
#   url           : Arena AI 榜单地址
#   title         : 页面标题
#   description   : 简短说明
#   model_col     : 表格中 "Model" 所在列的索引（0 基）
#   preferred     : 期望保留并翻译的英文列名（顺序即展示顺序）
#   top_n         : 快照展示的行数
LEADERBOARDS = [
    {
        "slug": "agent",
        "url": f"{BASE_URL}/leaderboard/agent",
        "title": "Agent 智能体榜单",
        "description": "本榜单评测模型在多轮工具调用 / 智能体任务上的综合表现，涵盖净改进率、确认成功率、赞踩比、可控性、Bash 恢复率、工具幻觉率等维度。",
        "en": {
            "title": "Agent Leaderboard",
            "description": "This leaderboard measures how models perform on multi-turn tool-calling and agent tasks, across net improvement, confirmed success, praise-to-complaint ratio, steerability, Bash recovery, tool hallucination and session volume.",
            "how_to_read": [
                "**Rank / Rank Spread**: Arena AI's estimate of relative position from agent-task battles. The spread shows how far the rank moves within the confidence interval.",
                "**Net Improvement**: how much the model improves on the baseline across multi-turn tool-calling and agent tasks.",
                "**Confirmed Success**: share of completed tasks the user confirmed as successful.",
                "**Praise vs Complaint**: ratio of upvotes to downvotes on the model's answers.",
                "**Steerability**: how well the model follows instructions and keeps its output stable.",
                "**Bash Recovery**: share of Bash / command-line errors the model recovers from.",
                "**Tool Hallucination**: share of calls to tools that do not exist. Lower is better.",
                "**Sessions**: sample size. Rankings move more when there are fewer sessions.",
            ],
        },
        "model_col": 1,
        "preferred": [
            "Rank",
            "Rank Spread",
            "Model",
            "Net Improvement",
            "Confirmed Success",
            "Praise vs Complaint",
            "Steerability",
            "Bash Recovery",
            "Tool Hallucination",
            "Sessions",
        ],
        "top_n": 30,
        "how_to_read": [
            "**排名 / 排名区间**：Arena AI 根据智能体任务对战投票估算的相对名次；排名区间表示在置信范围内的名次波动。",
            "**净改进率**：相比基线在多轮工具调用 / 智能体任务中的净改进幅度。",
            "**确认成功率**：任务完成后用户确认成功（赞）的比例。",
            "**赞踩比**：用户对回答投“赞”与“踩”的比例，反映主观满意度。",
            "**可控性**：模型遵循指令并保持稳定输出的能力。",
            "**Bash 恢复率**：在 Bash / 命令行操作出错后能自我恢复的比例。",
            "**工具幻觉率**：模型虚构或调用不存在工具的比例，越低越好。",
            "**会话数**：样本量参考；样本较少时，排名通常更容易波动。",
        ],
    },
    {
        "slug": "text",
        "url": f"{BASE_URL}/leaderboard/text",
        "title": "文本榜单",
        "description": "本榜单是 Arena AI 最核心的文本对战榜单，根据人类盲投对战估算模型相对实力。",
        "en": {
            "title": "Text Leaderboard",
            "description": "This is Arena AI's core text battle leaderboard, which estimates relative model strength from blind human-voted matchups.",
            "how_to_read": [
                "**Rank / Rank Spread**: relative position estimated from battle votes. The spread shows how far the rank moves within the confidence interval.",
                "**Score**: a relative score, useful for comparing the models listed at the same moment.",
                "**Votes / Sessions**: sample size. Rankings move more when there are fewer votes.",
                "**Price $/M**: reference price per million tokens for input / output.",
                "**Context**: maximum context length the model supports.",
            ],
        },
        "model_col": 2,
        "preferred": ["Rank", "Rank Spread", "Model", "Score", "Votes", "Price $/M", "Context"],
        "top_n": 30,
        "how_to_read": [
            "**排名 / 排名区间**：Arena AI 根据对战投票估算的相对名次；排名区间表示在置信范围内的名次波动。",
            "**分数**：相对评分，适合比较同一时刻榜单中的模型。",
            "**票数 / 会话数**：样本量参考；样本较少时，排名通常更容易波动。",
            "**价格 $/百万Token**：输入 / 输出每百万 Token 的参考价格。",
            "**上下文**：模型支持的最大上下文长度。",
        ],
    },
    {
        "slug": "search",
        "url": f"{BASE_URL}/leaderboard/search",
        "title": "搜索榜单",
        "description": "本榜单评测模型在联网搜索 / 信息检索类任务上的表现。",
        "en": {
            "title": "Search Leaderboard",
            "description": "This leaderboard measures how models perform on web search and information-retrieval tasks.",
            "how_to_read": [
                "**Rank / Rank Spread**: relative position estimated from battle votes. The spread shows how far the rank moves within the confidence interval.",
                "**Score**: a relative score, useful for comparing the models listed at the same moment.",
                "**Votes / Sessions**: sample size. Rankings move more when there are fewer votes.",
                "**Price $/M**: reference price per million tokens for input / output.",
                "**Context**: maximum context length the model supports.",
            ],
        },
        "model_col": 2,
        "preferred": ["Rank", "Rank Spread", "Model", "Score", "Votes", "Price $/M", "Context"],
        "top_n": 30,
        "how_to_read": [
            "**排名 / 排名区间**：Arena AI 根据对战投票估算的相对名次；排名区间表示在置信范围内的名次波动。",
            "**分数**：相对评分，适合比较同一时刻榜单中的模型。",
            "**票数 / 会话数**：样本量参考；样本较少时，排名通常更容易波动。",
            "**价格 $/百万Token**：输入 / 输出每百万 Token 的参考价格。",
            "**上下文**：模型支持的最大上下文长度。",
        ],
    },
    {
        "slug": "vision",
        "url": f"{BASE_URL}/leaderboard/vision",
        "title": "视觉榜单",
        "description": "本榜单评测多模态模型在图像理解类任务上的表现。",
        "en": {
            "title": "Vision Leaderboard",
            "description": "This leaderboard measures how multimodal models perform on image-understanding tasks.",
            "how_to_read": [
                "**Rank / Rank Spread**: relative position estimated from battle votes. The spread shows how far the rank moves within the confidence interval.",
                "**Score**: a relative score, useful for comparing the models listed at the same moment.",
                "**Votes / Sessions**: sample size. Rankings move more when there are fewer votes.",
                "**Price $/M**: reference price per million tokens for input / output.",
                "**Context**: maximum context length the model supports.",
            ],
        },
        "model_col": 2,
        "preferred": ["Rank", "Rank Spread", "Model", "Score", "Votes", "Price $/M", "Context"],
        "top_n": 30,
        "how_to_read": [
            "**排名 / 排名区间**：Arena AI 根据对战投票估算的相对名次；排名区间表示在置信范围内的名次波动。",
            "**分数**：相对评分，适合比较同一时刻榜单中的模型。",
            "**票数 / 会话数**：样本量参考；样本较少时，排名通常更容易波动。",
            "**价格 $/百万Token**：输入 / 输出每百万 Token 的参考价格。",
            "**上下文**：模型支持的最大上下文长度。",
        ],
    },
    {
        "slug": "code-webdev",
        "url": f"{BASE_URL}/leaderboard/code/webdev",
        "title": "代码 / Web 开发榜单",
        "description": "本榜单评测模型在 Web 前端开发（HTML/CSS/JS）任务上的实际表现。",
        "en": {
            "title": "Code / Web Dev Leaderboard",
            "description": "This leaderboard measures how models perform in practice on web front-end development (HTML/CSS/JS) tasks.",
            "how_to_read": [
                "**Rank / Rank Spread**: relative position estimated from battle votes. The spread shows how far the rank moves within the confidence interval.",
                "**Score**: a relative score, useful for comparing the models listed at the same moment.",
                "**Votes / Sessions**: sample size. Rankings move more when there are fewer votes.",
                "**Price $/M**: reference price per million tokens for input / output.",
                "**Context**: maximum context length the model supports.",
            ],
        },
        "model_col": 2,
        "preferred": ["Rank", "Rank Spread", "Model", "Score", "Votes", "Price $/M", "Context"],
        "top_n": 30,
        "how_to_read": [
            "**排名 / 排名区间**：Arena AI 根据对战投票估算的相对名次；排名区间表示在置信范围内的名次波动。",
            "**分数**：相对评分，适合比较同一时刻榜单中的模型。",
            "**票数 / 会话数**：样本量参考；样本较少时，排名通常更容易波动。",
            "**价格 $/百万Token**：输入 / 输出每百万 Token 的参考价格。",
            "**上下文**：模型支持的最大上下文长度。",
        ],
    },
    {
        "slug": "text-to-image",
        "url": f"{BASE_URL}/leaderboard/text-to-image",
        "title": "文生图榜单",
        "description": "本榜单评测文生图模型根据文本提示生成图像的能力。",
        "en": {
            "title": "Text-to-Image Leaderboard",
            "description": "This leaderboard measures how well text-to-image models turn a text prompt into an image.",
            "how_to_read": [
                "**Rank / Rank Spread**: relative position estimated from text-to-image battles. The spread shows how far the rank moves within the confidence interval.",
                "**Score**: a relative score, useful for comparing the models listed at the same moment.",
                "**Votes**: sample size. Rankings move more when there are fewer votes.",
            ],
        },
        "model_col": 2,
        "preferred": ["Rank", "Rank Spread", "Model", "Score", "Votes"],
        "top_n": 30,
        "how_to_read": [
            "**排名 / 排名区间**：Arena AI 根据文生图对战投票估算的相对名次；排名区间表示在置信范围内的名次波动。",
            "**分数**：相对评分，适合比较同一时刻榜单中的模型。",
            "**票数**：样本量参考；样本较少时，排名通常更容易波动。",
        ],
    },
]

# ---------------------------------------------------------------------------
# 表头中英文映射
# ---------------------------------------------------------------------------
# 覆盖当前所有榜单的英文表头，翻译为中文以便文档展示。
COLUMN_MAPPING = {
    # 通用列
    "Rank": "排名",
    "Rank Spread": "排名区间",
    "Model": "模型",
    "Score": "分数",
    "Votes": "票数",
    "Price $/M": "价格 $/百万Token",
    "Context": "上下文",
    # Agent 专属列
    "Net Improvement": "净改进率",
    "Confirmed Success": "确认成功率",
    "Praise vs Complaint": "赞踩比",
    "Steerability": "可控性",
    "Bash Recovery": "Bash 恢复率",
    "Tool Hallucination": "工具幻觉率",
    "Sessions": "会话数",
}


# ---------------------------------------------------------------------------
# 抓取与解析
# ---------------------------------------------------------------------------
def fetch_page_html(url, api_key):
    """
    使用 ScraperAPI 抓取指定 URL 的 HTML。榜单页是服务端预渲染的，表格已在原始 HTML 中，
    因此不需要 render=true（每个请求 10 credits → 1 credit）。
    带重试与指数退避。
    """
    scraperapi_url = f"http://api.scraperapi.com?api_key={api_key}&url={url}"

    retries = 3
    delay = 60
    last_exc = None
    last_html = None

    for i in range(retries):
        try:
            print(f"  Attempt {i + 1}/{retries} to fetch {url} via ScraperAPI...")
            response = requests.get(scraperapi_url, timeout=180)
            response.raise_for_status()
            # 挑战页与软错误页同样返回 200，缺表格时重抓一次比让整个榜单停更划算。
            if "<table" not in response.text:
                last_html = response.text
                if i < retries - 1:
                    print(f"  No <table> in the response ({len(response.text)} bytes). Retrying in {delay}s...")
                    time.sleep(delay)
                    delay *= 2
                else:
                    print("  All retries returned a page without a leaderboard table.")
                continue
            print("  Successfully fetched page.")
            return response.text
        except requests.exceptions.HTTPError as e:
            last_exc = e
            if i < retries - 1:
                print(f"  HTTP error: {e}. Retrying in {delay}s...")
                time.sleep(delay)
                delay *= 2
            else:
                print("  All retries failed with HTTP errors.")
        except requests.exceptions.RequestException as e:
            last_exc = e
            if i < retries - 1:
                print(f"  Network error: {e}. Retrying in {delay}s...")
                time.sleep(delay)
                delay *= 2
            else:
                print("  All retries failed due to network errors.")

    if last_exc:
        raise last_exc
    # 始终交回最后一次响应，交由下游按「未解析到表格」处理并保留旧快照。
    return last_html


def parse_rank_spread(cell):
    """
    解析排名区间列。

    实际 HTML 中该列并不是 '1-3' 这样的连字符文本，而是两个独立的
    <span>（如 <span>1</span> 与 <span>5</span>），中间夹着一个无文本的
    SVG 箭头图标。直接 get_text() 会把两端数字拼成 '15'（连字符丢失）。

    这里改为提取单元格内所有带文本的 <span>，再用 '-' 连接，从而得到
    '1-5' 这样的排名区间。
    """
    parts = [
        s.get_text(strip=True)
        for s in cell.find_all("span")
        if s.get_text(strip=True)
    ]
    if parts:
        return "-".join(parts)
    # 兜底：若没有 span（极少数情况），退回单元格纯文本
    return cell.get_text(strip=True)


def parse_rank_cell(cell):
    """
    解析 agent 榜单的 Rank 单元格，将其拆分为 (主排名, 排名区间)。

    该单元格结构特殊：外层 <div> 内含两个直接子元素——
      1) <span class="text-text-primary ...">主排名</span>（大号数字）
      2) <div class="text-text-tertiary ...">区间</div>（小字，内含两个
         带文本的 <span> 夹着无文本的 SVG 箭头，如 1 <svg/> 6）

    返回 (rank, rank_spread)。若结构不匹配则退回通用解析。
    """
    outer = cell.find("div", recursive=False) if cell.find("div") else None
    if outer is not None:
        children = outer.find_all(recursive=False)
        # 期望结构：[主排名 span, 区间 div]
        if len(children) == 2:
            rank_el = children[0]
            spread_el = children[1]
            rank_text = rank_el.get_text(strip=True)
            # 仅保留开头的数字部分
            m = re.match(r"\d+", rank_text)
            rank = m.group(0) if m else rank_text
            # 区间 div 内两个带文本的 span 用 '-' 连接
            spread_parts = [
                s.get_text(strip=True)
                for s in spread_el.find_all("span")
                if s.get_text(strip=True)
            ]
            spread = "-".join(spread_parts) if spread_parts else ""
            return rank, spread

    # 结构不匹配，退回通用正排名解析
    first_span = cell.find("span")
    if first_span:
        rank_text = first_span.get_text(strip=True)
        m = re.match(r"\d+", rank_text)
        return (m.group(0) if m else rank_text), ""
    txt = cell.get_text(strip=True)
    m = re.match(r"\d+", txt)
    return (m.group(0) if m else txt), ""


def parse_leaderboard_table(html, config):
    """
    解析页面 HTML 中的排行榜表格，返回 pandas DataFrame。

    - 自动定位 Model 列并保留其中的外链，转为 Markdown 超链接。
    - 其余单元格取纯文本。
    """
    soup = BeautifulSoup(html, "lxml")
    table = soup.find("table")
    if not table:
        print("  No <table> found on the page.")
        return None

    thead = table.find("thead")
    if not thead:
        print("  No <thead> found.")
        return None

    headers = [th.get_text(strip=True) for th in thead.find_all("th")]

    # agent 等榜单没有独立的 "Rank Spread" 列：主排名与排名区间被放在
    # 同一个 Rank 单元格里（大号数字为主排名，下方小字为区间）。
    # 当配置的 preferred 需要 "Rank Spread" 但表头没有时，将其拆为两列。
    needs_split_rank = (
        "Rank Spread" in config.get("preferred", [])
        and "Rank Spread" not in headers
    )
    if needs_split_rank and "Rank" in headers:
        rank_pos = headers.index("Rank")
        headers.insert(rank_pos + 1, "Rank Spread")

    tbody = table.find("tbody")
    if not tbody:
        print("  No <tbody> found.")
        return None

    model_col = config["model_col"]
    # Rank 列在表头中的位置（用于只取排名数字、排除变化趋势等附加信息）
    rank_col = headers.index("Rank") if "Rank" in headers else None
    spread_col = headers.index("Rank Spread") if "Rank Spread" in headers else None

    rows = []
    for tr in tbody.find_all("tr", recursive=False):
        cells = tr.find_all("td")
        if not cells:
            continue
        row_data = []
        for idx, cell in enumerate(cells):
            if idx == model_col:
                # Model 列：取其中的 <a> 标签文本与外链，转 Markdown 超链接
                link_tag = cell.find("a")
                if link_tag and link_tag.get_text(strip=True):
                    model_name = link_tag.get_text(strip=True)
                    href = link_tag.get("href", "")
                    if href:
                        full_url = (
                            f"{BASE_URL}{href}" if href.startswith("/") else href
                        )
                        row_data.append(f"{model_name} [<sup>1</sup>]({full_url})")
                    else:
                        row_data.append(model_name)
                else:
                    row_data.append(cell.get_text(strip=True))
            elif rank_col is not None and idx == rank_col:
                if needs_split_rank:
                    # agent 榜单：Rank 单元格拆成主排名 + 排名区间两列
                    rank, spread = parse_rank_cell(cell)
                    row_data.append(rank)
                    row_data.append(spread)
                else:
                    # 通用榜单：单元格内可能同时包含排名数字与变化趋势，
                    # 只取第一个排名数字（首个 <span>），排除附带的趋势数字。
                    first_span = cell.find("span")
                    if first_span:
                        rank_text = first_span.get_text(strip=True)
                        # 仅保留开头的数字部分，避免误带入其它文本
                        m = re.match(r"\d+", rank_text)
                        row_data.append(m.group(0) if m else rank_text)
                    else:
                        txt = cell.get_text(strip=True)
                        m = re.match(r"\d+", txt)
                        row_data.append(m.group(0) if m else txt)
            elif spread_col is not None and headers[idx] == "Rank Spread":
                # 排名区间列：单元格内是几个带文本的 <span> 夹着无文本的
                # SVG 箭头（如 1 <svg/> 5），直接 get_text 会拼成 '15'，
                # 用专门函数把这些 span 用 '-' 连接，得到 '1-5'。
                row_data.append(parse_rank_spread(cell))
            else:
                row_data.append(cell.get_text(strip=True))
        # 行的列数可能与表头数不完全一致（合并单元格等），按表头对齐截断/补齐
        if len(row_data) < len(headers):
            row_data += [""] * (len(headers) - len(row_data))
        elif len(row_data) > len(headers):
            row_data = row_data[: len(headers)]
        rows.append(row_data)

    df = pd.DataFrame(rows, columns=headers)
    return df


# ---------------------------------------------------------------------------
# Markdown 生成
# ---------------------------------------------------------------------------
def _normalize_score(val):
    """清理 Score 单元格中的附加说明文本。

    Arena AI 的 Score 单元格会把分数、置信区间和标签拼在一起，例如：
      '1712+20/-20Preliminary' -> '1712 (+20/-20) Preliminary'
      '1385±5'                 -> '1385 (±5)'
      '1271±6Preliminary'       -> '1271 (±6) Preliminary'
    """
    if not isinstance(val, str):
        return val

    s = val.strip()
    if not s:
        return s

    # 提取开头的分数
    m = re.match(r"^(\d+)", s)
    if not m:
        return s
    base = m.group(1)
    rest = s[len(base):].strip()

    parts = [base]

    # 情况 1：+hi/-lo 格式（如 +20/-20）
    m_pm = re.match(r"^\s*([+\-]?\d+)\s*/\s*([+\-]?\d+)\s*(.*)$", rest)
    if m_pm:
        hi, lo, extra = m_pm.groups()
        parts.append(f"(+{hi}/{'+' + lo if lo and lo[0] != '-' else lo})")
        rest = extra.strip()
    else:
        # 情况 2：±n 格式（如 ±5）
        m_pm2 = re.match(r"^\s*±\s*(\d+)\s*(.*)$", rest)
        if m_pm2:
            ci, extra = m_pm2.groups()
            parts.append(f"(±{ci})")
            rest = extra.strip()
        else:
            # 情况 3：单独的 +n 或 -n
            m_pm3 = re.match(r"^\s*([+\-]\d+)\s*(.*)$", rest)
            if m_pm3:
                ci, extra = m_pm3.groups()
                parts.append(f"({ci})")
                rest = extra.strip()

    if rest:
        parts.append(rest)

    return " ".join(parts)


def generate_markdown(df, config, utc_now, beijing_now, lang="zh-cn"):
    """
    将 DataFrame 转换为 Markdown 内容。

    中文页使用 COLUMN_MAPPING 把表头译为中文；英文页直接使用抓取到的原始列名，
    避免中文表头再翻译回英文造成偏差。
    """
    english = lang != "zh-cn"
    if df is None or df.empty:
        return "Could not fetch or parse the leaderboard data.\n" if english else "未能获取或解析排行榜数据。\n"

    df = df.copy()

    # 仅保留期望展示的列（按配置顺序），缺失的列自动跳过
    preferred = config["preferred"]
    visible_columns = [c for c in preferred if c in df.columns]
    if visible_columns:
        df = df.loc[:, visible_columns]

    # 清理 Score 列的附加文本
    if "Score" in df.columns:
        df["Score"] = df["Score"].apply(_normalize_score)

    if not english:
        df.rename(columns={c: COLUMN_MAPPING.get(c, c) for c in df.columns}, inplace=True)

    df = df.head(config["top_n"])

    utc_time_str = utc_now.strftime("%Y-%m-%d %H:%M:%S %Z")
    beijing_time_str = beijing_now.strftime("%Y-%m-%d %H:%M:%S %Z")

    md_table = df.to_markdown(index=False)

    url = config["url"]
    copy = config["en"] if english else config
    title = copy["title"]
    description = copy["description"]

    # 榜单专属的“怎么看这张表”说明
    how_to_read_lines = "\n".join(f"* {line}" for line in copy.get("how_to_read", []))

    if english:
        return f"""# {title}

This page shows the top {config['top_n']} models on the [Arena AI]({url}) leaderboard, snapshotted daily so you can see how recent models are doing at a glance. See the Arena AI site for the full leaderboard, filters and latest changes.

{description}

> **Data updated**: {utc_time_str} / {beijing_time_str} (Beijing time)

{{% hint style="info" %}}
A leaderboard reflects one particular evaluation and the preferences of its voters, so a high rank does not mean a model will do better on your tasks. Weigh price, speed, context, tool calling, privacy and regional availability as well.
{{% endhint %}}

## Top {config['top_n']}

{md_table}

## How to read this table

{how_to_read_lines}

## Three things to check before choosing a model

1. Whether the provider actually serves the model, and whether it is available in your region and for your account;
2. Whether the API price, rate limits and context window fit your workload;
3. Run a small test on three to five real tasks instead of relying on the overall ranking alone.

## Data source

Data comes from the [Arena AI {title}]({url}) and is refreshed daily by GitHub Actions. For model pricing, licenses and capabilities, check the model provider's own documentation.
"""

    return f"""# {title}

本页展示 [Arena AI]({url}) 榜单前 {config['top_n']} 名的最新快照，方便快速了解近期模型表现。完整榜单、筛选项和最新变化请到 Arena AI 官网查看。

{description}

> **数据更新时间**: {utc_time_str} / {beijing_time_str} (北京时间)

{{% hint style="info" %}}
排行榜反映特定评测和用户投票偏好，不等同于模型在你的任务中一定更好。选择模型时还要考虑价格、速度、上下文、工具调用、隐私和地区可用性。
{{% endhint %}}

## 前 {config['top_n']} 名

{md_table}

## 怎么看这张表

{how_to_read_lines}

## 选模型时再确认三件事

1. Provider 是否实际提供这个模型，以及你的地区和账户是否可用；
2. API 价格、速率限制和上下文是否适合你的任务；
3. 用 3～5 个真实任务做小规模测试，不要只看总榜名次。

## 数据来源

数据来自 [Arena AI 官方 {title}]({url})，由 GitHub Actions 每天更新一次。模型价格、许可证和能力请以模型服务商官方信息为准。
"""


def generate_readme(lang="zh-cn"):
    """
    生成模型榜单目录页 README.md，列出所有子榜单。
    """
    if lang != "zh-cn":
        lines = [
            "# Model Rankings\n",
            "These rankings help you compare the relative performance of different models; they should not be the only input to a model choice. "
            "The data comes from [Arena AI](https://arena.ai/) and is refreshed daily by GitHub Actions.\n",
            "When choosing a model, also weigh the task type, context length, multimodal and tool-calling abilities, speed, price, "
            "regional availability and data policy. Rankings and prices change over time: trust the update time shown on each page and the "
            "model provider's own documentation.\n",
            "## Leaderboards\n",
        ]
        for cfg in LEADERBOARDS:
            lines.append(f"* [{cfg['en']['title']}]({cfg['slug']}.md): {cfg['en']['description']}")
        lines.append("")
        lines.append("***\n")
        lines.append("### 💡 Get help and send feedback\n")
        lines.append(
            "If you run into questions, bugs or feature suggestions while configuring or using Cherry Studio, "
            "please use the official channels listed in [Feedback and suggestions](../../question-contact/suggestions.md).\n"
        )
        return "\n".join(lines)

    lines = []
    lines.append("# 模型榜单\n")
    lines.append(
        "模型榜单用于辅助比较不同模型的相对表现，不应单独作为选型结论。数据来自 [Arena AI](https://arena.ai/)，由 GitHub Actions 每天自动更新一次。\n"
    )
    lines.append("选择模型时还应综合考虑任务类型、上下文长度、多模态与工具调用能力、速度、价格、地区可用性和数据政策。排行榜与价格会动态变化，请以页面标注的更新时间和模型服务商官方信息为准。\n")
    lines.append("## 榜单目录\n")
    for cfg in LEADERBOARDS:
        lines.append(f"* [{cfg['title']}]({cfg['slug']}.md)：{cfg['description']}")
    lines.append("")
    lines.append("***\n")
    lines.append("### 💡 获取帮助与提交反馈\n")
    lines.append(
        "如果您在配置或使用过程中遇到任何疑问、Bug 或有功能改进建议，请参考 [反馈与建议](../../question-contact/suggestions.md) 中提供的官方渠道。\n"
    )
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------
def main():
    api_key = os.getenv("SCRAPER_API_KEY")
    if not api_key:
        print("错误：SCRAPER_API_KEY 环境变量未设置。")
        raise ValueError("SCRAPER_API_KEY is not set.")

    for directory in (OUTPUT_DIR, EN_OUTPUT_DIR):
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"Created directory: {directory}")

    utc_now = datetime.now(pytz.utc)
    beijing_tz = pytz.timezone("Asia/Shanghai")
    beijing_now = utc_now.astimezone(beijing_tz)

    updated_files = []

    # 1. 生成各子榜单
    # 由于 free plan 并发上限为 5，这里将全部榜单分为多组、每组 3 个，
    # 组内并发抓取，组间串行执行。
    def process_leaderboard(cfg):
        print(f"\n=== Processing {cfg['slug']} ({cfg['url']}) ===")
        try:
            html = fetch_page_html(cfg["url"], api_key)
            df = parse_leaderboard_table(html, cfg)
            # 抓取或解析失败时保留上一份快照，绝不把页面覆盖成占位内容
            if df is None or df.empty:
                print(f"  Skipped {cfg['slug']}: no leaderboard data parsed")
                return None
            # 两种语言的正文先生成再落盘，避免写入中途失败留下半新半旧的页面
            contents = {lang: generate_markdown(df, cfg, utc_now, beijing_now, lang) for lang in ("zh-cn", "en")}

            paths = []
            for lang, directory in (("zh-cn", OUTPUT_DIR), ("en", EN_OUTPUT_DIR)):
                output_path = os.path.join(directory, f"{cfg['slug']}.md")
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(contents[lang])
                print(f"  Updated: {output_path}")
                paths.append(output_path)
            return paths
        except Exception as e:
            print(f"  Failed to update {cfg['slug']}: {e}")
            return None

    groups = [LEADERBOARDS[i : i + 3] for i in range(0, len(LEADERBOARDS), 3)]
    for group in groups:
        with ThreadPoolExecutor(max_workers=len(group)) as executor:
            futures = [executor.submit(process_leaderboard, cfg) for cfg in group]
            for future in futures:
                result = future.result()
                if result:
                    updated_files.extend(result)

    # 2. 生成 / 更新目录页 README.md
    for lang, directory in (("zh-cn", OUTPUT_DIR), ("en", EN_OUTPUT_DIR)):
        readme_path = os.path.join(directory, "README.md")
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(generate_readme(lang))
        print(f"\nUpdated index: {readme_path}")
        updated_files.append(readme_path)

    # 3. 删除旧的 lmarena.md（已更名为 Arena AI 多榜单）
    for directory in (OUTPUT_DIR, EN_OUTPUT_DIR):
        old_file = os.path.join(directory, "lmarena.md")
        if os.path.exists(old_file):
            os.remove(old_file)
            print(f"Removed obsolete file: {old_file}")

    skipped = [
        cfg["slug"]
        for cfg in LEADERBOARDS
        if any(
            os.path.join(directory, f"{cfg['slug']}.md") not in updated_files
            for directory in (OUTPUT_DIR, EN_OUTPUT_DIR)
        )
    ]
    if skipped:
        print(f"\n以下榜单未刷新，保留上一次的数据: {', '.join(skipped)}")
        raise SystemExit(1)

    print("\nAll leaderboards updated.")
    print("Updated files:")
    for path in updated_files:
        print(f"  - {path}")


if __name__ == "__main__":
    main()
