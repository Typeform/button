import { getEmbedAdminDefaultAppName, getEmbedAdminUrl } from './utils'
import { buildIframe } from './build-iframe'
import { buildPopup } from './build-popup'
import { addMessageHandler, EmbedAdminAction } from './add-message-handler'

export type EmbedAdminActionPayload = {
  formId: string
}

export type EmbedAdminCallback = (action: EmbedAdminAction, payload: EmbedAdminActionPayload) => void

export interface TypeformEmbedAdmin {
  open: OpenTypeformEmbedAdmin
}

export type EmbedAdminType = 'iframe' | 'popup'

interface BaseActionConfig {
  type: EmbedAdminType
  appName?: string
  callback: EmbedAdminCallback
}

interface SelectActionConfig extends BaseActionConfig {
  action: 'select'
}

interface EditActionConfig extends BaseActionConfig {
  action: 'edit'
  formId: string // This makes `formId` required when `action` is set to `'edit'`
}

type EmbedAdminActionConfig = SelectActionConfig | EditActionConfig

type OpenTypeformEmbedAdmin = (config: EmbedAdminActionConfig) => void

const hasFormId = (config: EmbedAdminActionConfig): config is EditActionConfig => config.action === 'edit'

export const open: OpenTypeformEmbedAdmin = (config) => {
  const { type, action = 'select', appName, callback } = config
  const formId = hasFormId(config) ? config.formId : undefined
  const url = getEmbedAdminUrl(action, appName ?? getEmbedAdminDefaultAppName(), formId)

  const removeMessageHandler = addMessageHandler((formId: string) => {
    close()
    callback && callback(action, { formId })
  })

  const { close } = type === 'iframe' ? buildIframe(url, removeMessageHandler) : buildPopup(url, removeMessageHandler)

  return {
    close,
  }
}
