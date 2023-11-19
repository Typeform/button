import * as lib from './index'
import { initializeButtons } from './lib/initialize-buttons'

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
