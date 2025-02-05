// R2 配置
const config = {
    R2_CUSTOM_DOMAIN: 'cherrystudiorss.ocool.online', // R2 存储桶的自定义域名
    CACHE_KEY: 'latest-release.json',
    VERSION_DB: 'versions.json',
    LOG_FILE: 'logs.json',
    RSS_CACHE_TTL: 3600,
    MAX_LOGS: 1000,
    SKIP_FILES: ['cherry-studio-latest-release'],
    DATA_FILES: ['versions.json', 'logs.json']
};

// Markdown 转 HTML 函数
function markdownToHtml(markdown) {
  return markdown
    // 处理标题
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // 处理列表
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    // 处理链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // 处理粗体
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // 处理斜体
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // 处理代码块
    .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
    // 处理行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 处理段落
    .replace(/\n\n/g, '</p><p>')
    // 包装整个内容
    .replace(/^(.+)$/gm, '<p>$1</p>');
}

// 生成下载链接列表
function generateDownloadLinks(version) {
  const cleanVersion = version.replace(/^v/, '');
  return `
    <h3>Windows系统安装包:</h3>
    <ul>
      <li><a href="https://cherrystudio.ocool.online/Cherry-Studio-${cleanVersion}-setup.exe">Cherry-Studio-${cleanVersion}-setup.exe - Windows标准安装包</a></li>
      <li><a href="https://cherrystudio.ocool.online/Cherry-Studio-${cleanVersion}-portable.exe">Cherry-Studio-${cleanVersion}-portable.exe - Windows便携版</a></li>
    </ul>
    
    <h3>MacOS系统安装包:</h3>
    <ul>
      <li><a href="https://cherrystudio.ocool.online/Cherry-Studio-${cleanVersion}-x64.dmg">Cherry-Studio-${cleanVersion}-x64.dmg - Intel芯片Mac</a></li>
      <li><a href="https://cherrystudio.ocool.online/Cherry-Studio-${cleanVersion}-arm64.dmg">Cherry-Studio-${cleanVersion}-arm64.dmg - Apple Silicon芯片Mac</a></li>
    </ul>
    
    <h3>Linux系统安装包:</h3>
    <ul>
      <li><a href="https://cherrystudio.ocool.online/Cherry-Studio-${cleanVersion}-x86_64.AppImage">Cherry-Studio-${cleanVersion}-x86_64.AppImage - x86_64架构</a></li>
      <li><a href="https://cherrystudio.ocool.online/Cherry-Studio-${cleanVersion}-arm64.AppImage">Cherry-Studio-${cleanVersion}-arm64.AppImage - ARM架构</a></li>
    </ul>`;
}

// 生成 RSS XML
function generateRSS(releaseInfo) {
  const pubDate = new Date(releaseInfo.publishedAt).toUTCString();
  const downloadLinks = generateDownloadLinks(releaseInfo.version);
  const changelogHtml = markdownToHtml(releaseInfo.changelog);
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" 
     xmlns:wfw="http://wellformedweb.org/CommentAPI/" 
     xmlns:dc="http://purl.org/dc/elements/1.1/" 
     xmlns:atom="http://www.w3.org/2005/Atom" 
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" 
     xmlns:slash="http://purl.org/rss/1.0/modules/slash/" 
     version="2.0">
  <channel>
    <title>Cherry Studio 更新日志</title>
    <link>https://cherry-ai.com</link>
    <description>Cherry Studio 的最新版本更新信息</description>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <language>zh-cn</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>https://${config.R2_CUSTOM_DOMAIN}/cherrylogo.png</url>
      <title>Cherry Studio 更新日志</title>
      <link>https://cherry-ai.com</link>
      <width>144</width>
      <height>144</height>
    </image>
    <copyright>© 2024 Cherry Studio. All rights reserved.</copyright>
    <atom:link href="https://cherry-ai.com/rss" rel="self" type="application/rss+xml"/>
    
    <item>
      <title><![CDATA[Cherry Studio ${releaseInfo.version} 更新发布]]></title>
      <link>https://cherry-ai.com/download</link>
      <pubDate>${pubDate}</pubDate>
      <author>Cherry Studio Team</author>
      <category>更新</category>
      <guid isPermaLink="false">https://cherry-ai.com/releases/${releaseInfo.version}</guid>
      <description><![CDATA[${releaseInfo.changelog}]]></description>
      <content:encoded><![CDATA[
        <div class="changelog">
          <h2>更新内容</h2>
          ${changelogHtml}
          <h2>下载地址</h2>
          ${downloadLinks}
        </div>
      ]]></content:encoded>
    </item>
  </channel>
</rss>`;
}

// 处理请求
async function handleRequest(request, env) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    let releaseInfo;
    
    // 获取最新版本信息
    const response = await fetch('https://cherry.ocool.online/');
    if (!response.ok) {
      throw new Error('Failed to fetch release info');
    }

    releaseInfo = await response.json();
    releaseInfo.timestamp = Date.now();

    // 尝试使用 R2 存储（如果可用）
    try {
      if (env?.cherryrss) {
        // 尝试存储到 R2
        await env.cherryrss.put(config.CACHE_KEY, JSON.stringify(releaseInfo), {
          customMetadata: {
            'version': releaseInfo.version
          }
        });
      }
    } catch (r2Error) {
      console.error('R2 storage error:', r2Error);
      // 继续执行，不影响主要功能
    }

    // 返回 RSS XML
    return new Response(generateRSS(releaseInfo), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': `public, max-age=${config.RSS_CACHE_TTL}`,
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      message: error.message
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// 添加日志记录函数
async function addLog(env, type, event, details = null) {
    try {
        const logFile = await env.cherryrss.get(config.LOG_FILE);
        let logs = { logs: [] };

        if (logFile) {
            logs = JSON.parse(await logFile.text());
        }

        logs.logs.unshift({
            timestamp: new Date().toISOString(),
            type,
            event,
            details
        });

        // 保持日志数量在限制内
        if (logs.logs.length > config.MAX_LOGS) {
            logs.logs = logs.logs.slice(0, config.MAX_LOGS);
        }

        await env.cherryrss.put(config.LOG_FILE, JSON.stringify(logs, null, 2), {
            customMetadata: {
                isDataFile: 'true'
            }
        });
    } catch (error) {
        console.error('写入日志失败:', error);
    }
}

// 初始化数据文件
async function initDataFiles(env) {
    try {
        // 检查并初始化版本数据库
        const versionDB = await env.cherryrss.get(config.VERSION_DB);
        if (!versionDB) {
            const initialVersions = {
                versions: {},
                latestVersion: null,
                lastChecked: new Date().toISOString()
            };
            await env.cherryrss.put(config.VERSION_DB, JSON.stringify(initialVersions, null, 2), {
                customMetadata: {
                    isDataFile: 'true'
                }
            });
            await addLog(env, 'INFO', 'versions.json 初始化成功');
        }

        // 检查并初始化日志文件
        const logFile = await env.cherryrss.get(config.LOG_FILE);
        if (!logFile) {
            const initialLogs = {
                logs: [{
                    timestamp: new Date().toISOString(),
                    type: 'INFO',
                    event: '系统初始化'
                }]
            };
            await env.cherryrss.put(config.LOG_FILE, JSON.stringify(initialLogs, null, 2), {
                customMetadata: {
                    isDataFile: 'true'
                }
            });
            console.log('logs.json 初始化成功');
        }
    } catch (error) {
        console.error('初始化数据文件失败:', error);
    }
}

// 检查并初始化 logo
async function checkLogo(env) {
    try {
        const logo = await env.cherryrss.get('cherrylogo.png');
        if (!logo) {
            await addLog(env, 'WARN', 'Logo 文件不存在');
        }
    } catch (error) {
        console.error('检查 logo 失败:', error);
        await addLog(env, 'ERROR', '检查 logo 失败', error.message);
    }
}

// 导出 Worker
export default {
    // HTTP 请求处理函数
    async fetch(request, env, ctx) {
        return handleRequest(request, env);
    },

    // 定时器触发配置
    scheduled: {
        cron: '*/30 * * * *'  // 每30分钟执行一次
    },

    // 定时器执行函数
    async scheduled(event, env, ctx) {
        try {
            await initDataFiles(env);
            await checkLogo(env);
            console.log('开始定时检查新版本...');
            
            // 先获取版本数据库
            const versionDB = await env.cherryrss.get(config.VERSION_DB);
            if (!versionDB) {
                throw new Error('版本数据库不存在');
            }
            
            const versions = JSON.parse(await versionDB.text());
            
            // 执行清理操作
            await addLog(env, 'INFO', '开始执行定时清理');
            
            // 获取最新版本信息并更新
            const response = await fetch('https://cherry.ocool.online/');
            if (!response.ok) {
                throw new Error('Failed to fetch release info');
            }

            const releaseInfo = await response.json();
            releaseInfo.timestamp = Date.now();

            // 更新缓存
            await env.cherryrss.put(config.CACHE_KEY, JSON.stringify(releaseInfo), {
                customMetadata: {
                    'version': releaseInfo.version
                }
            });

            await addLog(env, 'INFO', `更新检查完成，当前版本: ${releaseInfo.version}`);

        } catch (error) {
            console.error('定时任务执行失败:', error);
            await addLog(env, 'ERROR', '定时任务执行失败', error.message);
        }
    }
};
