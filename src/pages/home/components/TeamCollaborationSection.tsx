import { ArrowUpRight, BarChart3, BrainCircuit, ShieldCheck, UsersRound } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import teamAvatar1 from '@/assets/images/team-avatars/avatar-1-v2.png'
import teamAvatar2 from '@/assets/images/team-avatars/avatar-2-v2.png'
import teamAvatar3 from '@/assets/images/team-avatars/avatar-3-v2.png'
import teamAvatar4 from '@/assets/images/team-avatars/avatar-4-v2.png'
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
    <section className="bg-background relative overflow-hidden py-8 sm:py-16">
      <div className="grid-pattern absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <h2 className="text-foreground mb-4 text-2xl font-bold tracking-tight sm:mb-5 sm:text-4xl lg:text-5xl">
            {t('team_collaboration.title')}
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-sm leading-7 sm:mb-8 sm:text-base sm:leading-8">
            {t('team_collaboration.description')}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:mt-7 sm:flex-nowrap">
            <button
              type="button"
              onClick={() => goToEnterprise('team_collaboration_section')}
              className="border-primary/25 bg-primary/10 text-primary hover:bg-primary/15 inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold shadow-sm transition-colors sm:px-6 sm:py-3.5 sm:text-base">
              {t('team_collaboration.cta')}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <span className="text-border hidden text-base sm:inline" aria-hidden="true">
              |
            </span>
            <span className="text-primary/75 text-center text-sm font-medium sm:text-left sm:text-base">
              {t('team_collaboration.activity')}
            </span>
          </div>
        </div>

        <div className="border-border/70 bg-card/70 relative mx-auto max-w-[1180px] overflow-hidden rounded-[2rem] border p-3 shadow-2xl backdrop-blur sm:p-5">
          <div className="bg-secondary/50 flex items-center justify-between rounded-2xl px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/15 text-primary flex h-9 w-9 items-center justify-center rounded-xl">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">{t('team_collaboration.mockup.title')}</p>
                <p className="text-muted-foreground text-xs">{t('team_collaboration.mockup.subtitle')}</p>
              </div>
            </div>
            <span className="text-primary hidden text-xs font-medium sm:inline">
              {t('team_collaboration.mockup.status')}
            </span>
          </div>

          <div className="grid gap-3 py-3 sm:grid-cols-3 sm:py-5">
            {capabilities.map(({ icon: Icon, titleKey, descriptionKey }) => (
              <div key={titleKey} className="border-border/60 bg-background/60 rounded-2xl border p-4 sm:p-5">
                <Icon className="text-primary mb-4 h-5 w-5" />
                <h3 className="text-foreground mb-2 text-sm font-semibold">{t(titleKey)}</h3>
                <p className="text-muted-foreground text-xs leading-5">{t(descriptionKey)}</p>
              </div>
            ))}
          </div>

          <div className="border-border/60 bg-background/50 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 sm:px-5">
            <div className="flex -space-x-2">
              {teamAvatars.map(({ name, src }, index) => (
                <img
                  key={name}
                  src={src}
                  alt={name}
                  loading="lazy"
                  className="border-background h-7 w-7 rounded-full border-2 bg-white object-cover"
                  style={{ opacity: 1 - index * 0.12 }} />
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
