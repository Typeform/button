import { EmbedAdminCallback, EmbedAdminType, open } from './open'
import { EmbedAdminAction } from './add-message-handler'

const getCallbackFunction = (name?: string): EmbedAdminCallback | undefined => {
  const callbackFn = name && name in window ? window[name] : undefined
  return typeof callbackFn === 'function' ? callbackFn : undefined
}
export const initializeButtons = () => {
  document.querySelectorAll('[data-tf-embed-admin]').forEach((element) => {
    const button = element as HTMLButtonElement
    const type = button.dataset.tfEmbedAdminType as EmbedAdminType
    const action = button.dataset.tfEmbedAdminAction as EmbedAdminAction
    const payload = button.dataset.tfEmbedAdminPayload
    const appName = button.dataset.tfEmbedAdminAppName
    const callback = getCallbackFunction(button.dataset.tfEmbedAdminCallback)

    if (!callback) {
      throw new Error('No callback function found for data-tf-embed-admin')
    }

    button.onclick = () => open({ type, action, payload, appName, callback })
  })
}
