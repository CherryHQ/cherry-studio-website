const downloadOrigins = {
  cn: 'https://gitcode.com',
  global: 'https://github.com'
}

export function getDesktopReleaseUrl(
  value: string,
  version: string,
  assetName: string,
  region: keyof typeof downloadOrigins
): string | null {
  try {
    const url = new URL(value)
    const expectedPath = `/CherryHQ/cherry-studio/releases/download/${encodeURIComponent(version)}/${encodeURIComponent(assetName)}`
    return url.origin === downloadOrigins[region] &&
      url.pathname === expectedPath &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash
      ? url.href
      : null
  } catch {
    return null
  }
}
