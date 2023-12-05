import { initializeButtons } from './lib/initialize-buttons'

import * as lib from './index'

export {}

declare global {
  interface Window {
    tfEmbedAdmin: typeof lib & { load: VoidFunction }
  }
}

const load = () => initializeButtons()

document.addEventListener('DOMContentLoaded', load, false)

window.tfEmbedAdmin = {
  ...lib,
  load,
}
