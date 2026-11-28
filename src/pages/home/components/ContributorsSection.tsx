import { ArrowUpRight } from 'lucide-react'
import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import GitHubUserCard from '@/components/GitHubUserCard'
import { isEnglishSite } from '@/utils/urls'
import SectionBackdrop from './SectionBackdrop'

interface Contributor {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

interface RepoStats {
  stars: number | null
  contributors: number | null
  forks: number | null
}

const GITHUB_REPO = 'https://api.github.com/repos/CherryHQ/cherry-studio'
const FEATURED_CONTRIBUTORS = 10
const VISIBLE_CONTRIBUTORS = 15
const CONTRIBUTOR_URL = 'https://github.com/CherryHQ/cherry-studio/graphs/contributors'

const ContributorsSection: FC = () => {
  const { t, i18n } = useTranslation()
  const isEn = isEnglishSite(i18n.resolvedLanguage || i18n.language)
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [featuredContributors, setFeaturedContributors] = useState<Contributor[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [repoStats, setRepoStats] = useState<RepoStats>({ stars: null, contributors: null, forks: null })

  // 显示 40 个贡献者
  const MAX_CONTRIBUTORS = 40

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(`${GITHUB_REPO}/contributors?per_page=100`)
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

    // 英文站展示仓库统计和贡献者头像
    const fetchRepoStats = async () => {
      try {
        const [repoResponse, contributorsResponse, featuredResponse] = await Promise.all([
          fetch(GITHUB_REPO),
          fetch(`${GITHUB_REPO}/contributors?per_page=1&anon=true`),
          fetch(`${GITHUB_REPO}/contributors?per_page=${FEATURED_CONTRIBUTORS}`)
        ])

        const repo = repoResponse.ok ? await repoResponse.json() : null
        const lastPage = contributorsResponse.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/)

        setRepoStats({
          stars: typeof repo?.stargazers_count === 'number' ? repo.stargazers_count : null,
          forks: typeof repo?.forks_count === 'number' ? repo.forks_count : null,
          contributors: lastPage ? Number(lastPage[1]) : null
        })

        if (featuredResponse.ok) {
          const featured: Contributor[] = await featuredResponse.json()
          setFeaturedContributors(featured.slice(0, FEATURED_CONTRIBUTORS))
        }
      } catch (error) {
        console.error('Error fetching repo stats:', error)
      }
    }

    if (isEn) {
      fetchRepoStats()
    } else {
      fetchContributors()
    }
  }, [isEn])

  // 计算贡献百分比
  const getContributionPercent = (contributions: number) => {
    if (totalContributions === 0) return 0
    return ((contributions / totalContributions) * 100).toFixed(1)
  }

  const formatStat = (value: number | null) => {
    if (value === null) return '—'
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString('en-US')
  }

  if (isEn) {
    const stats = [
      { label: t('statistics.stars'), value: repoStats.stars },
      { label: t('statistics.contributors'), value: repoStats.contributors },
      { label: t('statistics.forks'), value: repoStats.forks }
    ]

    return (
      <section className="isolate bg-background relative overflow-hidden site-section">
        <SectionBackdrop variant="rules" />
        <div className="site-container relative z-10">
          <div className="mx-auto mb-6 max-w-3xl text-center">
            <h2 className="text-foreground mb-3 text-3xl font-semibold tracking-tight sm:mb-4 sm:text-4xl">
              {t('contributors.project_contributors')}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t('contributors.project_contributors_subtitle')}
            </p>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="https://trendshift.io/repositories/14318" target="_blank" rel="noopener noreferrer">
              <img
                src="https://trendshift.io/api/badge/repositories/14318"
                alt="CherryHQ/cherry-studio | Trendshift"
                className="block h-[70px] w-auto dark:hidden"
              />
              <img
                src="https://trendshift.io/api/badge/repositories/14318?theme=dark"
                alt="CherryHQ/cherry-studio | Trendshift"
                className="hidden h-[70px] w-auto dark:block"
              />
            </a>
          </div>

          <div className="border-border/50 bg-card/50 mx-auto max-w-[520px] rounded-lg border p-6">
            <dl className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dd className="text-foreground text-2xl font-bold tabular-nums sm:text-3xl">
                    {formatStat(stat.value)}
                  </dd>
                  <dt className="text-muted-foreground mt-1 text-xs sm:text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <div className="border-border/50 mt-6 flex flex-col items-center justify-center gap-4 border-t pt-5 sm:flex-row sm:gap-3">
              {featuredContributors.length > 0 && (
                <div className="flex items-center -space-x-3 sm:-space-x-2">
                  {featuredContributors.map((contributor) => (
                    <a
                      key={contributor.id}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={contributor.login}
                      className="border-background focus-visible:ring-primary relative rounded-full border-2 transition-transform hover:z-10 hover:-translate-y-1 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2">
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="h-7 w-7 rounded-full sm:h-8 sm:w-8"
                      />
                    </a>
                  ))}
                  {repoStats.contributors !== null && repoStats.contributors > featuredContributors.length && (
                    <span className="border-background bg-secondary text-muted-foreground relative flex h-8 min-w-8 items-center justify-center rounded-full border-2 px-1 text-[10px] font-medium sm:h-9 sm:min-w-9">
                      +{repoStats.contributors - featuredContributors.length}
                    </span>
                  )}
                </div>
              )}
              <a
                href={CONTRIBUTOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary focus-visible:ring-primary inline-flex items-center gap-1 text-xs whitespace-nowrap transition-colors focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2">
                {t('contributors.view_all_on_github')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const communityLinks = [
    { title: 'Product Hunt', href: 'https://www.producthunt.com/posts/cherry-studio' },
    { title: 'GitHub Trending', href: 'https://trendshift.io/repositories/14318' },
    { title: 'HelloGitHub', href: 'https://hellogithub.com/repository/1605492e1e2a4df3be07abfa4578dd37' }
  ]

  const people = contributors.map((contributor) => (
    <li key={contributor.id} className="min-w-0">
      <GitHubUserCard username={contributor.login}>
        <a
          href={contributor.html_url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${contributor.login}: ${contributor.contributions} commits (${getContributionPercent(contributor.contributions)}%)`}
          className="group flex min-w-0 items-center gap-2.5 rounded-md py-2 pr-2 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary sm:gap-3">
          <img
            src={contributor.avatar_url}
            alt=""
            loading="lazy"
            className="size-9 shrink-0 rounded-full object-cover"
          />
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-medium text-foreground group-hover:text-primary">
              {contributor.login}
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {t('contributors.commit_count', { count: contributor.contributions })}
            </span>
          </span>
        </a>
      </GitHubUserCard>
    </li>
  ))

  return (
    <section id="contributors" className="isolate relative scroll-mt-[60px] bg-secondary/45 site-section">
      <SectionBackdrop variant="rules" />
      <div className="site-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t('contributors.project_contributors')}
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              {t('contributors.project_contributors_subtitle')}
            </p>
          </div>
          <a
            href={CONTRIBUTOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {t('contributors.view_all_on_github')}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <ul aria-busy={loading} className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-5">
          {loading
            ? Array.from({ length: VISIBLE_CONTRIBUTORS }, (_, index) => (
                <li key={index} aria-hidden="true" className="flex items-center gap-3 py-2 motion-safe:animate-pulse">
                  <span className="size-9 shrink-0 rounded-full bg-muted" />
                  <span className="h-4 w-20 rounded-sm bg-muted" />
                </li>
              ))
            : people.slice(0, VISIBLE_CONTRIBUTORS)}
        </ul>
        {people.length > VISIBLE_CONTRIBUTORS && (
          <details className="mt-4 border-t border-border pt-4">
            <summary className="w-fit cursor-pointer rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              {t('contributors.show_more', { count: people.length - VISIBLE_CONTRIBUTORS })}
            </summary>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3 lg:grid-cols-5">
              {people.slice(VISIBLE_CONTRIBUTORS)}
            </ul>
          </details>
        )}

        <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-5">
          {communityLinks.map(({ title, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-input hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
              {title}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContributorsSection
