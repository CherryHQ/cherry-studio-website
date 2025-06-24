import { FC } from 'react'
import {
  KeyRound,
  BookOpen,
  Users,
  Building2,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Download,
  FileText
} from 'lucide-react'
import './index.css'
import Footer from '@/components/website/Footer'

const EnterprisePage: FC = () => {
  return (
    <div className="enterprise-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Cherry Studio Enterprise</h1>
            <p className="subtitle">专为现代团队和企业打造的 AI 生产力与管理平台</p>
            <div className="hero-actions">
              <a href="mailto:bd@cherry-ai.com" className="primary-button">
                联系我们
              </a>
              <a href="#features" className="secondary-button">
                了解更多
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>核心优势</h2>
            <p>专业的企业级功能，助力团队提升生产力</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">
                <KeyRound size={32} />
              </div>
              <h3>统一模型管理</h3>
              <p>集中接入和管理各类云端大模型，支持本地私有化部署，员工无需配置即可使用</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <BookOpen size={32} />
              </div>
              <h3>企业级知识库</h3>
              <p>构建和管理团队共享知识库，基于统一知识进行 AI 交互，提升回答质量</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <Users size={32} />
              </div>
              <h3>精细化权限控制</h3>
              <p>统一的管理后台，基于角色的权限分配，灵活的资源访问控制</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <Building2 size={32} />
              </div>
              <h3>完全私有化部署</h3>
              <p>支持企业内部服务器部署，私有云环境部署，数据100%私有可控</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <RefreshCw size={32} />
              </div>
              <h3>可靠的后端服务</h3>
              <p>提供稳定的 API 服务、企业级数据备份与恢复机制，保障业务连续性</p>
            </div>
            <div className="feature-card">
              <div className="icon">
                <ShieldCheck size={32} />
              </div>
              <h3>安全合规保障</h3>
              <p>满足最严格的数据安全与合规要求，支持审计日志，确保数据使用可追溯</p>
            </div>
          </div>
        </div>
      </section>

      {/* Version Comparison */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header">
            <h2>版本对比</h2>
            <p>选择最适合您团队的方案</p>
          </div>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>特性</th>
                  <th>Community</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>开源许可</td>
                  <td>
                    <span className="check">✓</span> 开源
                  </td>
                  <td>
                    <span className="cross">◎</span> 商业授权
                  </td>
                </tr>
                <tr>
                  <td>使用费用</td>
                  <td>个人免费/商用授权</td>
                  <td>买断 + 可选服务费</td>
                </tr>
                <tr>
                  <td>部署方式</td>
                  <td>单机部署</td>
                  <td>
                    <span className="check">✓</span> 私有化部署
                  </td>
                </tr>
                <tr>
                  <td>功能特性</td>
                  <td>基础功能</td>
                  <td>
                    <ul className="feature-list">
                      <li>
                        <span className="check">✓</span> 模型管理
                      </li>
                      <li>
                        <span className="check">✓</span> 员工管理
                      </li>
                      <li>
                        <span className="check">✓</span> 共享知识库
                      </li>
                      <li>
                        <span className="check">✓</span> Dify 工作流
                      </li>
                      <li>
                        <span className="check">✓</span> 权限控制
                      </li>
                      <li>
                        <span className="check">✓</span> 数据备份
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>技术支持</td>
                  <td>社区支持</td>
                  <td>
                    <span className="check">✓</span> 专属支持服务
                  </td>
                </tr>
                <tr>
                  <td>系统支持</td>
                  <td>Windows 10+, macOS, Linux</td>
                  <td>Windows 7+, macOS, Linux</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Beta Notice Section */}
      <section className="beta-section">
        <div className="container">
          <div className="beta-notice">
            <div className="notice-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="notice-content">
              <h2>公测说明</h2>
              <p>企业版目前处于公测阶段，我们正在持续优化功能。如遇问题或有建议，欢迎反馈！</p>
            </div>
          </div>

          <div className="beta-content">
            <div className="beta-card">
              <h3>体验环境</h3>
              <div className="card-content">
                <ul>
                  <li>
                    <strong>管理后台：</strong>
                    <a href="https://demo.admin.cherry-ai.com" target="_blank" rel="noopener noreferrer">
                      demo.admin.cherry-ai.com
                    </a>
                  </li>
                  <li>
                    <strong>账号：</strong>admin
                  </li>
                  <li>
                    <strong>密码：</strong>admin123
                  </li>
                </ul>
              </div>
            </div>

            <div className="beta-card">
              <h3>客户端下载</h3>
              <div className="card-content">
                <p>为获得完整体验，请下载企业版客户端：</p>
                <div className="download-info">
                  <p className="system-support">支持 macOS 和 Windows 系统</p>
                  <a
                    href="https://pan.quark.cn/s/2e5696d25483"
                    className="download-button"
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="icon">
                      <Download size={20} />
                    </span>
                    <span className="button-text">下载客户端</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="beta-card">
              <h3>使用手册</h3>
              <div className="card-content">
                <p>感谢您参与 Cherry Studio 企业版的体验活动。我们提供详细的使用手册，帮助您快速上手所有功能。</p>
                <a
                  href="https://doc.weixin.qq.com/doc/w3_ASIAPQaBALgCNdQv1pcxUTJGhXLsX?scode=APkA7AeJABIVWchL1vASIAPQaBALg"
                  className="doc-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="icon">
                    <FileText size={20} />
                  </span>
                  查看使用手册
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <div className="container">
          <div className="section-header">
            <h2>获取支持</h2>
            <p>如果您对 Cherry Studio 企业版感兴趣，欢迎联系我们的商务团队</p>
          </div>
          <div className="support-actions">
            <div className="contact-info">
              <p className="email">bd@cherry-ai.com</p>
              <div className="contact-buttons">
                <a href="mailto:bd@cherry-ai.com" className="contact-button">
                  发送邮件
                </a>
                <a
                  href="https://docs.cherry-ai.com/contact-us/questions"
                  className="contact-button secondary"
                  target="_blank"
                  rel="noopener noreferrer">
                  商务合作
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default EnterprisePage
