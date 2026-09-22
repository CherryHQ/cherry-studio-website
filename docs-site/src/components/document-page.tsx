import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/page'

import type { getPage } from '@/lib/content'

type PageData = NonNullable<ReturnType<typeof getPage>>

export function DocumentPage({ lang, page }: { lang: string; page: PageData }) {
  return (
    <DocsPage
      toc={page.toc}
      editOnGithub={{
        owner: 'CherryHQ',
        repo: 'cherry-studio-website',
        sha: 'main',
        path: `docs-site/content/${page.file}`
      }}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsBody>
        <div
          lang={page.fallback ? 'zh-cn' : lang}
          className="[&_[id]]:scroll-mt-40 lg:[&_[id]]:scroll-mt-28 [&_[data-cards]]:grid [&_[data-cards]]:gap-3 [&_[data-cards]]:sm:grid-cols-2 [&_[data-card]]:rounded-xl [&_[data-card]]:border [&_[data-card]]:border-fd-border [&_[data-card]]:p-4 [&_[data-table-container]]:my-6 [&_[data-table-container]]:overflow-x-auto [&_[data-table-container]]:rounded-lg [&_[data-table-container]_table]:my-0 [&_[data-mobile-gallery]]:my-8 [&_[data-mobile-gallery]]:grid [&_[data-mobile-gallery]]:min-w-0 [&_[data-mobile-gallery]]:w-full [&_[data-mobile-gallery]]:max-w-full [&_[data-mobile-gallery]]:grid-cols-1 [&_[data-mobile-gallery]]:items-start [&_[data-mobile-gallery]]:gap-4 sm:[&_[data-mobile-gallery][data-mobile-gallery=pair]]:grid-cols-2 [&_[data-mobile-gallery=single]]:mx-auto [&_[data-mobile-gallery=single]]:max-w-md [&_[data-mobile-shot]]:my-0 [&_[data-mobile-shot]]:min-w-0 [&_[data-mobile-shot]]:w-full [&_[data-mobile-shot]]:max-w-full [&_[data-mobile-shot]]:overflow-hidden [&_[data-mobile-shot]]:rounded-[18px] [&_[data-mobile-shot]]:border [&_[data-mobile-shot]]:border-fd-border [&_[data-mobile-shot]]:bg-[#f5f5f7] [&_[data-mobile-shot]]:p-3 dark:[&_[data-mobile-shot]]:bg-zinc-900 [&_[data-mobile-shot]_a]:flex [&_[data-mobile-shot]_a]:h-96 [&_[data-mobile-shot]_a]:items-center [&_[data-mobile-shot]_a]:justify-center [&_[data-mobile-shot]_a]:overflow-hidden [&_[data-mobile-shot]_a]:rounded-xl [&_[data-mobile-shot]_a]:outline-none sm:[&_[data-mobile-shot]_a]:h-[28rem] [&_[data-mobile-shot]_a]:focus-visible:ring-2 [&_[data-mobile-shot]_a]:focus-visible:ring-fd-primary [&_[data-mobile-shot]_img]:m-0 [&_[data-mobile-shot]_img]:h-auto [&_[data-mobile-shot]_img]:max-h-full [&_[data-mobile-shot]_img]:w-auto [&_[data-mobile-shot]_img]:max-w-full [&_[data-mobile-shot]_img]:rounded-xl [&_[data-mobile-shot]_img]:object-contain [&_[data-mobile-shot]_img]:shadow-[3px_5px_30px_rgba(0,0,0,0.16)] [&_[data-mobile-shot]_figcaption]:mt-3 [&_[data-mobile-shot]_figcaption]:px-1 [&_[data-mobile-shot]_figcaption]:text-center [&_[data-mobile-shot]_figcaption]:text-xs [&_[data-mobile-shot]_figcaption]:leading-5 [&_[data-mobile-shot]_figcaption]:text-fd-muted-foreground [&_[data-mobile-shot]_figcaption_p]:my-0 [&_aside]:my-5 [&_aside]:rounded-xl [&_aside]:border [&_aside]:border-fd-border [&_aside]:bg-fd-muted/50 [&_aside]:px-5 [&_aside]:py-1 [&_figure]:my-6 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-fd-muted-foreground [&_img]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-fd-muted [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </DocsBody>
    </DocsPage>
  )
}
