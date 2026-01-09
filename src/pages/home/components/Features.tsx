import { motion } from 'framer-motion'
import { ArrowUpRight, Cloud, Image, Languages, MessageSquare, Shield, Users } from 'lucide-react'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface Feature {
  icon: React.ElementType
  titleKey: string
  descriptionKey: string
  href: string
  gradient: string
}

const features: Feature[] = [
  {
    icon: MessageSquare,
    titleKey: 'features.conversation.title',
    descriptionKey: 'features.conversation.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/chat',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    icon: Image,
    titleKey: 'features.drawing.title',
    descriptionKey: 'features.drawing.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/drawing',
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    icon: Languages,
    titleKey: 'features.translation.title',
    descriptionKey: 'features.translation.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/translation',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    icon: Users,
    titleKey: 'features.assistants.title',
    descriptionKey: 'features.assistants.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/agents',
    gradient: 'from-orange-500/20 to-amber-500/20'
  },
  {
    icon: Shield,
    titleKey: 'features.knowledge_base.title',
    descriptionKey: 'features.knowledge_base.description',
    href: 'https://docs.cherry-ai.com/advanced-basic/knowledge-base',
    gradient: 'from-red-500/20 to-rose-500/20'
  },
  {
    icon: Cloud,
    titleKey: 'features.backup.title',
    descriptionKey: 'features.backup.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/settings/data',
    gradient: 'from-indigo-500/20 to-violet-500/20'
  }
]

const Features: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">{t('features.title')}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            <Trans i18nKey="features.description">
              以下仅为部分功能介绍，更多功能可以下载客户端体验，或在
              <a
                href="https://docs.cherry-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline">
                官方文档
              </a>
              中了解。
            </Trans>
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.a
              key={feature.titleKey}
              href={feature.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6',
                'transition-all duration-300',
                'hover:border-primary/30 hover:bg-card'
              )}>
              {/* Gradient Background */}
              <div
                className={cn(
                  'absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300',
                  feature.gradient,
                  'group-hover:opacity-100'
                )}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                  {t(feature.titleKey)}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">{t(feature.descriptionKey)}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
