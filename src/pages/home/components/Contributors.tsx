import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Contributor {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

const Contributors: FC = () => {
  const { t } = useTranslation()
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)

  // 显示 40 个贡献者
  const MAX_CONTRIBUTORS = 40

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/CherryHQ/cherry-studio/contributors?per_page=100')
        if (response.ok) {
          const data: Contributor[] = await response.json()
          // 计算总贡献数
          const total = data.reduce((sum, c) => sum + c.contributions, 0)
          setTotalContributions(total)
          // 只取前 MAX_CONTRIBUTORS 个贡献者
          setContributors(data.slice(0, MAX_CONTRIBUTORS))
        }
      } catch (error) {
        console.error('Error fetching contributors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [])

  // 计算贡献百分比
  const getContributionPercent = (contributions: number) => {
    if (totalContributions === 0) return 0
    return ((contributions / totalContributions) * 100).toFixed(1)
  }

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-background py-16">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t('contributors.project_contributors')}
          </h2>
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-background py-16">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t('contributors.project_contributors')}</h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
          {contributors.map((contributor, index) => (
            <motion.a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${contributor.login}: ${contributor.contributions} commits (${getContributionPercent(contributor.contributions)}%)`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
              className="group flex flex-col items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 p-2 transition-all duration-300 hover:border-primary/30 hover:bg-card sm:p-3">
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="h-10 w-10 rounded-full ring-2 ring-border transition-all duration-300 group-hover:ring-primary/50 sm:h-12 sm:w-12"
              />
              <span className="max-w-full truncate text-[10px] text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
                {contributor.login}
              </span>
              <span className="text-[9px] text-muted-foreground/60 sm:text-[10px]">
                {contributor.contributions} commits
              </span>
            </motion.a>
          ))}
        </div>

        {/* View all on GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center">
          <a
            href="https://github.com/CherryHQ/cherry-studio/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
            <span>View all contributors on GitHub</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Contributors
