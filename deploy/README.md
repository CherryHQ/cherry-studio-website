# 中国站容器与 GitOps 发布

`.github/workflows/docs.yml` 复用既有内容检查、Biome 和中英文构建，再构建并实际启动
`linux/amd64` Docker 镜像。PR、fork 和非 main 手动运行只验证构建。
`CherryHQ/cherry-studio-website` 的 main push 或 main 手动运行通过检查后，推送
`sha-<完整提交 SHA>`，将本次构建返回的 digest 回写 GitOps。Dockerfile 始终构建
`build:cn`，包含完整 `/docs`；海外站现有发布方式不受此流程影响。

自动构建采用简单的路径忽略规则：仅修改根目录 `*.md`、`docs-site/README.md`、
`deploy/**`、`.github/**`、`.vscode/**`、`.claude/**`、`.conductor/**` 或 `.context/**`
时只运行检查，跳过中英文构建、镜像构建与后续发布。其中三个文件始终触发构建：
`.github/workflows/docs.yml`、`.github/scripts/build-impact.cjs`、`.github/scripts/smoke-container.sh`。
其他路径一律构建，包括公开文档、页面、资源、测试和未知路径，不再按文件类型细分。
push 比较整批提交，PR 比较分支共同祖先后的改动，删除和重命名也参与判断。
手动运行 `Docs` 始终构建，选择 main 时按既有规则发布，可用于强制重新构建。

参考数据工作流使用默认 `GITHUB_TOKEN` 提交，GitHub 不会因此触发 push 工作流，
所以有更新时显式 dispatch `docs.yml`，让这些更新也经过同一套检查和发布。
参见 [GitHub 工作流触发规则](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)。

## 实际目标

| 项目 | 配置 |
| --- | --- |
| 源仓库/分支 | `CherryHQ/cherry-studio-website` / `main` |
| GitOps 仓库/分支 | `CherryInternal/cherry-gitops` / `main` |
| 回写文件 | `cherryai-web/overlays/prod/kustomization.yaml` |
| Kustomize 镜像匹配键 | `cherryai-web` |
| Argo CD 父/子 Application | `cherry-argocd-apps` / `cherryai-web-prod` |
| 工作负载/命名空间 | Deployment `cherryai-web` / `cherry-prod` |
| 服务 | `cherryai-web-http:80` → 容器 `80` |
| 入口 | `cherryai.com.cn`、`www.cherryai.com.cn`；旧域名重定向 |
| 集群拉取凭证 | `cherry-prod` 命名空间的 `acr-secret`（启用前核实） |

## GitHub Actions 配置

在源仓库设置，或在 **CherryHQ** 组织设置并授权源仓库读取。CherryInternal 组织的
Actions 配置不能直接供 CherryHQ 仓库使用。

| 名称 | 类型 | 当前 ACR 所需值/用途 |
| --- | --- | --- |
| `CONTAINER_REGISTRY_HOST` | Variable，必需 | `cherry-prod-docker-registry-registry.cn-hangzhou.cr.aliyuncs.com` |
| `CONTAINER_REGISTRY_PULL_HOST` | Variable，本部署必需 | `cherry-prod-docker-registry-registry-vpc.cn-hangzhou.cr.aliyuncs.com` |
| `CONTAINER_REGISTRY_NAMESPACE` | Variable，可选 | `cherry`；省略时保留该现有命名空间 |
| `CONTAINER_REGISTRY_AUTH_MODE` | Variable，可选 | `credentials`（默认） |
| `CONTAINER_REGISTRY_USERNAME` | Secret，必需 | ACR 客户端用户名 |
| `CONTAINER_REGISTRY_PASSWORD` | Secret，必需 | 允许推送 `cherry/cherry-studio-website` 的 ACR 客户端密码 |
| `GITOPS_TOKEN` | Secret，必需 | 仅授权目标 GitOps 仓库 `Contents: write` 的身份 |

2026-10-28 核对结果：源仓库级没有上述配置；当前身份读取组织级 Variables/Secrets
返回 403，因此组织配置是否存在、是否授权源仓库仍待核实。两个 ACR 域名均由
`GetInstanceEndpoint` 确认；公网 `/v2/` 返回预期的未认证 401，这不能证明实际推送权限。
不要将凭证值写入文件或日志。组织 Secret 名称、源仓库读取权限、Registry 登录和推送权限
需要分别验证。

如以后迁移 GHCR，可显式选择 `github-token`，并配置 `ghcr.io` 和实际命名空间。
脚本拒绝将此 Token 用于其他 Registry。生产拉取使用独立的持久只读身份，不能使用
Actions 的临时 Token。推送和拉取域名相同时可以省略 `CONTAINER_REGISTRY_PULL_HOST`。

## GitOps 配套改动与启用顺序

本次配套改动以 GitOps main `3e4f936` 为基线，位于工作区 `.context/gitops`，可用
`.context/cherry-gitops.patch` 转移到 GitOps 仓库。

1. 为该应用配置上表中的 Variables/Secrets，核实 `acr-secret` 包含 VPC 拉取域名、
   集群架构为 amd64，并验证镜像推送身份。确认父/子 Application 来源、同步与健康状态，
   处理现存的 ComparisonError 和所有将被自动应用的差异。
2. 停用旧 ACR 自动构建与部署回调，并等待/取消其在途构建与回调，防止两套发布器竞争。
   当前实例 `cri-29b1fozzr3x49ytu`、仓库 `crr-jcd7y6y1b325crjh` 仍为 AUTO_BUILD，
   规则 `crbr-ffj7kgjcjxyy6zaz` 将 main 构建成 latest，回调 `crw-d9xbbxx1lu76n84c`
   仍存在。本次没有修改这些云端配置。
3. 先合并 GitOps 配套改动：base `image` 使用稳定别名 `cherryai-web`，overlay 使用同名
   `images[].name`，`newName` 保留当前 VPC 地址，保留当前 digest
   `sha256:854fe8d9e99a275f23119cd6dac10d387efb09ea99e30e1a9dd691531ef4d225`。
   只将 `apps/values.yaml` 的 `cherryai-web-prod.autoSync` 改为 true，其他应用保持原样。
   **开启自动同步可能立即应用该应用当前 Git 与线上之间的其他差异**；保留 digest
   不代表不会变更副本、路由等配置。不要只凭本地渲染就执行生产同步。
4. 核实父 Application 已下发该子 Application 的自动同步配置，再合并应用工作流。
   首次启用后推送 main，或手动运行 Docs 并选择 main。工作流缺少别名配套时会停止回写；
   完成配套后重跑最新 main 即可。
5. 分别核实 Actions 质量检查、镜像推送、GitOps 提交、Argo CD 同步、Pod 就绪及
   `imageID`，最后验证中国站首页、下载页和中英文 `/docs` 的真实请求。

此配置任务不包含合并、Sync、停用云端触发器或生产切换。没有执行上述步骤时不能
宣称部署成功。Argo CD 自动同步机制见
[官方文档](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/)。

## 回写契约与验证

回写器固定目标仓库、分支、文件和镜像别名；源 head 查询使用源仓库只读 Token，
写入使用独立 `GITOPS_TOKEN`。修改同时包含 `newName` 和 `digest`，两者都未变则不提交。
遇到 409 只在重新读取后确认文件 blob SHA 已变化时重试，最多五次，每次重新检查源 main。
401/403、目标缺失、校验失败和无法证明为并发的拒绝立即失败。回写提交使用
`github-actions[bot]` 作为作者和提交者，标题为 `deploy(cherry-studio-website): <12 位源 SHA>`，
正文包含源提交链接、镜像地址与 digest、工作流链接和 bot 的 `Signed-off-by`。
提交署名与认证分开，跨仓库访问仍使用 `GITOPS_TOKEN`。

main 镜像发布串行执行；检查和构建不会被后续的内部改动工作流替换。
回写时若 main 已前进，只有确认源 SHA 是其祖先且所有后续差异均不影响构建时才允许继续，
避免内部说明提交使在途代码发布失效；后续存在产物改动或历史分叉则跳过旧构建。
比较文件列表缺失或达到 API 的 [300 文件上限](https://docs.github.com/en/rest/commits/commits#compare-two-commits)
时立即失败，应手动构建当前 main。
源 head 检查与跨仓库写入之间仍存在短暂窗口，
不是跨仓库事务；新 main 的成功发布会再次收敛。GitHub 的并发机制参见
[官方文档](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency)。

```bash
node --test .github/scripts/*.test.cjs
pnpm exec biome ci .
pnpm docs:test
pnpm docs:generate
pnpm docs:lint
pnpm build:cn && pnpm docs:verify
actionlint .github/workflows/*.yml
docker build --platform linux/amd64 -t website-test:local .
TEST_IMAGE=website-test:local bash .github/scripts/smoke-container.sh
```

在 GitOps 仓库运行 `kubectl kustomize cherryai-web/overlays/prod` 和
`helm template cherry-argocd-apps apps`。对比基线，实际工作负载应保持原镜像和 digest，
只有该子 Application 新增自动同步。模拟切换 Registry 时，应只有目标容器镜像同时
变更地址和 digest。

## 回退

先暂停 Docs 发布并取消在途发布；必要时暂时关闭该子 Application 的自动同步。
在 GitOps 恢复上一个**已验证**的 `newName` 和 `digest`，再恢复同步并核实真实入口。
不要只改 tag 或重新读取 latest。保留当前与前一可用 digest 对应镜像，检查 ACR 清理
规则不会提前删除它们。恢复旧 ACR 回调前先停止 GitOps 发布，确保只有一条链路管理工作负载。
