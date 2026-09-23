import locales from '../../../locales.json'
export default function Page() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24">
      <p className="mb-3 font-medium text-rose-500">Cherry Studio</p>
      <h1 className="text-3xl font-semibold">Documentation · 使用文档</h1>
      <p className="mt-4 text-fd-muted-foreground">Choose your language / 选择语言</p>
      <ul className="mt-8 grid grid-cols-2 gap-3">
        {locales.map((locale) => (
          <li key={locale.code}>
            <a
              className="block rounded-xl border border-fd-border p-4 hover:bg-fd-muted"
              href={`/docs/${locale.code}/`}>
              {locale.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
