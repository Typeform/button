import { getEmbedAdminDefaultAppName, getEmbedAdminUrl } from './utils'
import { buildIframe } from './build-iframe'
import { buildPopup } from './build-popup'
import { addMessageHandler, EmbedAdminAction } from './add-message-handler'

export type EmbedAdminCallback = (action: EmbedAdminAction, formId: string) => void

export interface TypeformEmbedAdmin {
  open: OpenTypeformEmbedAdmin
}

export type EmbedAdminType = 'iframe' | 'popup'

interface EmbedAdminConfig {
  type: EmbedAdminType
  action: EmbedAdminAction
  payload?: string
  appName?: string
  callback: EmbedAdminCallback
}

type OpenTypeformEmbedAdmin = (config: EmbedAdminConfig) => void

export const open: OpenTypeformEmbedAdmin = (config) => {
  const { type, action = 'select', payload, appName, callback } = config
  const url = getEmbedAdminUrl(action, payload, appName ?? getEmbedAdminDefaultAppName())

  const removeMessageHandler = addMessageHandler((formId: string) => {
    removeMessageHandler()
    close()
    callback && callback(action, formId)
  })

  const { close } = type === 'iframe' ? buildIframe(url, removeMessageHandler) : buildPopup(url, removeMessageHandler)

  return {
    close,
  }
}
