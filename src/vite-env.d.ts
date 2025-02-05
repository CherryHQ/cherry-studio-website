/// <reference types="vite/client" />

interface Window {
  $: typeof import('jquery')
  marked: typeof import('marked')
  flatpickr: any
  echarts: any
}

declare const $: typeof import('jquery')
