import { motion } from 'framer-motion'
import { Calendar, Star, Users } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Statistics: FC = () => {
  const { t } = useTranslation()

  const stats = [
    {
      icon: Calendar,
      id: 'days-count',
      label: t('statistics.days_online'),
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Users,
      id: 'contributors-count',
      label: t('statistics.contributors'),
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Star,
      id: 'stars-count',
      label: t('statistics.stars'),
      gradient: 'from-orange-500/20 to-amber-500/20'
    }
  ]

  return (
    <section className="fun-facts-section bg-secondary/30 relative overflow-hidden py-16">
      <div className="grid-pattern absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card relative overflow-hidden rounded-2xl border p-6 transition-all duration-300">
              {/* Gradient Background */}
              <div
                className={`absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${stat.gradient}`}
              />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="bg-primary/10 text-primary mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl">
                  <stat.icon className="h-7 w-7" />
                </div>

                {/* Number */}
                <div id={stat.id} className="text-foreground mb-2 text-4xl font-bold tabular-nums lg:text-5xl">
                  0
                </div>

                {/* Label */}
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics
