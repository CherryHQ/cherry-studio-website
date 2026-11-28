const lightIcons = import.meta.glob<string>('../../../assets/images/brand/providers/light/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})
const darkIcons = import.meta.glob<string>('../../../assets/images/brand/providers/dark/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})
const cliIcons = import.meta.glob<string>('../../../assets/images/brand/cli/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})

const byName = (icons: Record<string, string>) =>
  Object.fromEntries(Object.entries(icons).map(([path, url]) => [path.split('/').pop()!.replace('.svg', ''), url]))

const light = byName(lightIcons)
const dark = byName(darkIcons)
const cli = byName(cliIcons)

/** Provider logos copied from Cherry Studio packages/ui/icons/providers; dark variants exist for monochrome marks. */
export function providerIcon(id: string) {
  return { light: light[id], dark: dark[id] ?? light[id] }
}

/** CLI logos copied from Cherry Studio packages/ui/icons/general. */
export function cliIcon(id: string): string | undefined {
  return cli[id]
}
