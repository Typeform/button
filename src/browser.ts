import { initializeButtons } from './lib/initialize-buttons'

import * as lib from './index'

export {}

declare global {
  interface Window {
    tfEmbedAdmin: lib.TypeformEmbedAdmin & { reload: VoidFunction }
  }
}

const load = () => initializeButtons()

document.addEventListener('DOMContentLoaded', load, false)

window.tfEmbedAdmin = {
  ...lib,
  reload: load,
}
