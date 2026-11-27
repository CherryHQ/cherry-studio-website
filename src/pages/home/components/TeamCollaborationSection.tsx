import { ArrowUpRight, BarChart3, BrainCircuit, ShieldCheck, UsersRound } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import teamAvatar1 from '@/assets/images/team-avatars/avatar-1-v2.png'
import teamAvatar2 from '@/assets/images/team-avatars/avatar-2-v2.png'
import teamAvatar3 from '@/assets/images/team-avatars/avatar-3-v2.png'
import teamAvatar4 from '@/assets/images/team-avatars/avatar-4-v2.png'
import BlurInText from '@/components/website/BlurInText'
import { goToEnterprise } from '@/utils/analytics'

const capabilities = [
  {
    icon: UsersRound,
    titleKey: 'team_collaboration.capabilities.workspace.title',
    descriptionKey: 'team_collaboration.capabilities.workspace.description'
  },
  {
    icon: BrainCircuit,
    titleKey: 'team_collaboration.capabilities.models.title',
    descriptionKey: 'team_collaboration.capabilities.models.description'
  },
  {
    icon: BarChart3,
    titleKey: 'team_collaboration.capabilities.insights.title',
    descriptionKey: 'team_collaboration.capabilities.insights.description'
  }
]

const teamAvatars = [
  { name: '团队成员 1', src: teamAvatar1 },
  { name: '团队成员 2', src: teamAvatar2 },
  { name: '团队成员 3', src: teamAvatar3 },
  { name: '团队成员 4', src: teamAvatar4 }
]

const TeamCollaborationSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="isolate bg-background relative overflow-hidden site-section">
      <div className="site-container site-split relative z-10">
        <div className="min-w-0">
          <h2 className="mb-4 text-4xl font-display text-balance sm:text-5xl">
            <BlurInText text={t('team_collaboration.title')} />
          </h2>
          <p className="text-muted-foreground max-w-md text-sm leading-7 sm:text-base">
            {t('team_collaboration.description')}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => goToEnterprise('team_collaboration_section')}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-hairline-strong hover:bg-accent">
              {t('team_collaboration.cta')}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <span className="text-muted-foreground text-sm">{t('team_collaboration.activity')}</span>
          </div>
        </div>

        <div className="glass-card relative min-w-0 overflow-hidden rounded-[20px] p-3 sm:p-5">
          <div className="bg-secondary/50 flex items-center justify-between rounded-lg px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="bg-background text-muted-foreground flex h-9 w-9 items-center justify-center rounded-xl">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">{t('team_collaboration.mockup.title')}</p>
                <p className="text-muted-foreground text-xs">{t('team_collaboration.mockup.subtitle')}</p>
              </div>
            </div>
            <span className="text-muted-foreground hidden text-xs font-medium sm:inline">
              {t('team_collaboration.mockup.status')}
            </span>
          </div>

          <div className="grid gap-3 py-3 sm:grid-cols-3 sm:py-5">
            {capabilities.map(({ icon: Icon, titleKey, descriptionKey }) => (
              <div key={titleKey} className="rounded-xl border border-border bg-background/60 p-4 sm:p-5">
                <Icon className="mb-4 h-5 w-5 text-primary" />
                <h3 className="text-foreground mb-2 text-sm font-semibold">{t(titleKey)}</h3>
                <p className="text-muted-foreground text-xs leading-5">{t(descriptionKey)}</p>
              </div>
            ))}
          </div>

          <div className="border-border/60 bg-background/50 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 sm:px-5">
            <div className="flex -space-x-2">
              {teamAvatars.map(({ name, src }, index) => (
                <img
                  key={name}
                  src={src}
                  alt={name}
                  loading="lazy"
                  className="border-background h-7 w-7 rounded-full border-2 bg-white object-cover"
                  style={{ opacity: 1 - index * 0.12 }}
                />
              ))}
            </div>
            <p className="text-muted-foreground text-xs">{t('team_collaboration.mockup.members')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamCollaborationSection
