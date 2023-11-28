import { EmbedAdminActionConfig, EmbedAdminCallback, EmbedAdminType, open } from './open'

const getCallbackFunction = (name?: string): EmbedAdminCallback | undefined => {
  const callbackFn = name && name in window ? window[name] : undefined
  return typeof callbackFn === 'function' ? callbackFn : undefined
}

const getActionConfigFromButton = (button: HTMLButtonElement): EmbedAdminActionConfig | undefined => {
  const type = button.dataset.tfEmbedAdminType as EmbedAdminType
  const appName = button.dataset.tfEmbedAdminAppName
  const callback = getCallbackFunction(button.dataset.tfEmbedAdminCallback)

  if (!callback) {
    throw new Error(`No callback function found for data-tf-embed-admin`)
  }

  if (button.dataset.tfEmbedAdminSelect !== undefined) {
    return {
      type,
      action: 'select',
      appName,
      callback,
    }
  }

  if (button.dataset.tfEmbedAdminEdit !== undefined) {
    return {
      type,
      action: 'edit',
      formId: button.dataset.tfEmbedAdminEdit,
      appName,
      callback,
    }
  }
}

const selectors = ['[data-tf-embed-admin-select]', '[data-tf-embed-admin-edit]']

export const initializeButtons = () => {
  document.querySelectorAll(selectors.join(',')).forEach((element) => {
    const button = element as HTMLButtonElement
    if (button.dataset.tfEmbedAdminLoaded !== 'true') {
      const config = getActionConfigFromButton(button)

      if (!config) {
        throw new Error(`Invalid config for data-tf-embed-admin`)
      }

      button.addEventListener('click', () => {
        open(config)
      })

      button.dataset.tfEmbedAdminLoaded = 'true'
    }
  })
}
