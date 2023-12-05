import { getEmbedAdminDefaultAppName, getEmbedAdminUrl } from './utils'
import { buildIframe } from './build-iframe'
import { buildPopup } from './build-popup'
import { addMessageHandler, EmbedAdminAction } from './add-message-handler'

export type EmbedAdminActionPayload = {
  formId: string
  action: EmbedAdminAction
}

export type EmbedAdminCallback = (payload: EmbedAdminActionPayload) => void

export type EmbedAdminType = 'iframe' | 'popup'

export interface BaseActionConfig {
  type?: EmbedAdminType
  appName?: string
  callback: EmbedAdminCallback
}

export interface SelectActionPayload extends BaseActionConfig {}

interface SelectActionConfig extends SelectActionPayload {
  action: 'select'
}

export interface EditActionPayload extends BaseActionConfig {
  formId: string
}

interface EditActionConfig extends EditActionPayload {
  action: 'edit'
}

export type EmbedAdminActionConfig = SelectActionConfig | EditActionConfig

type OpenTypeformEmbedAdmin = (config: EmbedAdminActionConfig) => void

const hasFormId = (config: EmbedAdminActionConfig): config is EditActionConfig => config.action === 'edit'

export const open: OpenTypeformEmbedAdmin = (config) => {
  const { type, action = 'select', appName, callback } = config
  const formId = hasFormId(config) ? config.formId : undefined
  const url = getEmbedAdminUrl(action, appName ?? getEmbedAdminDefaultAppName(), formId)

  const removeMessageHandler = addMessageHandler((formId: string) => {
    close()
    callback && callback({ action, formId })
  })

  const { close } = type === 'iframe' ? buildIframe(url, removeMessageHandler) : buildPopup(url, removeMessageHandler)

  return {
    close,
  }
}
