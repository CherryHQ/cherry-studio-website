// Compare decoded paths without a trailing slash, while preserving output URLs.
const normalizePath = (url) => decodeURIComponent(url).replace(/\/+$/, '') || '/'

export function validateRedirects(redirects, pageUrls) {
  const pages = new Set([...pageUrls].map(normalizePath))
  return Object.fromEntries(
    Object.entries(redirects).filter(([source, destination]) => {
      const normalizedSource = normalizePath(source)
      if (normalizedSource === normalizePath(destination)) return false
      if (pages.has(normalizedSource))
        throw new Error(`Redirect would overwrite an article: ${source} -> ${destination}`)
      return true
    })
  )
}
