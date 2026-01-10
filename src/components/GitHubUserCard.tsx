import { type FC, useEffect, useState } from 'react'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  location: string | null
  company: string | null
}

interface GitHubUserCardProps {
  username: string
  children: React.ReactNode
}

// Simple in-memory cache
const userCache = new Map<string, GitHubUser>()

const GitHubUserCard: FC<GitHubUserCardProps> = ({ username, children }) => {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchUser = async () => {
    // Check cache first
    if (userCache.has(username)) {
      setUser(userCache.get(username)!)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      if (response.ok) {
        const data: GitHubUser = await response.json()
        userCache.set(username, data)
        setUser(data)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild onMouseEnter={fetchUser}>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top">
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}

        {error && <div className="text-muted-foreground py-4 text-center text-sm">Failed to load user info</div>}

        {user && !loading && (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <img src={user.avatar_url} alt={user.login} className="h-12 w-12 rounded-full" />
              <div className="flex-1 overflow-hidden">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary block truncate font-semibold transition-colors">
                  {user.name || user.login}
                </a>
                <span className="text-muted-foreground text-sm">@{user.login}</span>
              </div>
            </div>

            {user.bio && <p className="text-muted-foreground line-clamp-2 text-sm">{user.bio}</p>}

            <div className="flex flex-wrap gap-3 text-sm">
              {user.location && (
                <div className="text-muted-foreground flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{user.location}</span>
                </div>
              )}
              {user.company && (
                <div className="text-muted-foreground flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="truncate">{user.company}</span>
                </div>
              )}
            </div>

            <div className="border-border flex justify-around border-t pt-3">
              <div className="text-center">
                <div className="text-foreground font-semibold">{user.public_repos}</div>
                <div className="text-muted-foreground text-xs">Repos</div>
              </div>
              <div className="text-center">
                <div className="text-foreground font-semibold">{user.followers}</div>
                <div className="text-muted-foreground text-xs">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-foreground font-semibold">{user.following}</div>
                <div className="text-muted-foreground text-xs">Following</div>
              </div>
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}

export default GitHubUserCard
