import { EmbedAdminType } from './open'

export type ActionConfig = {
  type?: EmbedAdminType
  appName?: string
}

let defaultConfig: ActionConfig = {}

export const setDefaultConfig = (config: ActionConfig) => {
  defaultConfig = config
}

export const getDefaultConfig = () => {
  return defaultConfig
}
