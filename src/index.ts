import { open, EmbedAdminCallback, EmbedAdminType } from './lib/open'

export type ActionConfig = {
  type?: EmbedAdminType
  appName?: string
}

export const lib = {
  config: {} as ActionConfig,

  configure(config: ActionConfig) {
    this.config = config
    return this
  },

  selectForm(callback: EmbedAdminCallback) {
    return open({ ...this.config, action: 'select', callback })
  },

  editForm(formId: string, callback: EmbedAdminCallback) {
    return open({ ...this.config, action: 'edit', formId, callback })
  },
}
