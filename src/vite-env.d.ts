/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_LOCALE?: string
  readonly VITE_PUBLIC_POSTHOG_KEY?: string
  readonly VITE_PUBLIC_POSTHOG_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  $: typeof import('jquery')
  marked: typeof import('marked')
  flatpickr: any
  echarts: any
}

declare const $: typeof import('jquery')
