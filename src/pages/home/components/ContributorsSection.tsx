import { ArrowUpRight } from 'lucide-react'
import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import BlurInText from '@/components/website/BlurInText'

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
// The first page of contributors (GitHub's maximum) fills the avatar wall; the rest are counted.
const FEATURED_CONTRIBUTORS = 100
const CONTRIBUTOR_URL = 'https://github.com/CherryHQ/cherry-studio/graphs/contributors'

const ContributorsSection: FC = () => {
  const { t } = useTranslation()
  const [featuredContributors, setFeaturedContributors] = useState<Contributor[]>([])
  const [repoStats, setRepoStats] = useState<RepoStats>({ stars: null, contributors: null, forks: null })

  useEffect(() => {
    // Repository stats and the contributor wall
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

    fetchRepoStats()
  }, [])

  const formatStat = (value: number | null) => {
    if (value === null) return '—'
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString('en-US')
  }

  const stats = [
    { label: t('statistics.stars'), value: repoStats.stars },
    { label: t('statistics.contributors'), value: repoStats.contributors },
    { label: t('statistics.forks'), value: repoStats.forks }
  ]

  return (
    <section className="isolate bg-background relative overflow-hidden site-section">
      <div className="site-container relative z-10">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <h2 className="mb-3 text-4xl font-display text-balance sm:mb-4 sm:text-5xl">
            <BlurInText text={t('contributors.project_contributors')} />
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

        <div className="glass-card mx-auto max-w-4xl rounded-[20px] p-6 sm:p-8">
          <dl className="mx-auto grid max-w-[560px] grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dd className="font-display text-3xl text-foreground tabular-nums sm:text-3xl">
                  {formatStat(stat.value)}
                </dd>
                <dt className="text-muted-foreground mt-1 text-xs sm:text-sm">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <ul
            aria-label={t('statistics.contributors')}
            className="border-border/50 mt-6 flex flex-wrap justify-center gap-1.5 border-t pt-6">
            {featuredContributors.map((contributor) => (
              <li key={contributor.id}>
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={contributor.login}
                  className="group relative block rounded-full transition-transform duration-200 hover:z-10 hover:-translate-y-1 hover:scale-125 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-primary">
                  <img
                    src={
                      contributor.avatar_url.includes('?')
                        ? `${contributor.avatar_url}&s=64`
                        : `${contributor.avatar_url}?s=64`
                    }
                    alt={contributor.login}
                    loading="lazy"
                    className="size-8 rounded-full bg-secondary ring-1 ring-border"
                  />
                </a>
              </li>
            ))}
            {repoStats.contributors !== null && repoStats.contributors > featuredContributors.length && (
              <li>
                <a
                  href={CONTRIBUTOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 min-w-8 items-center justify-center rounded-full bg-secondary px-2.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                  +{repoStats.contributors - featuredContributors.length}
                </a>
              </li>
            )}
          </ul>
          <div className="mt-5 flex justify-center">
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

export default ContributorsSection
