import { MESSAGE_ORIGINS_WHITELIST } from './utils/constants'

export type EmbedAdminAction = 'select' | 'edit'

export enum MessageType {
  SELECT = 'embedFormSelect',
}

export const addMessageHandler = (callback: (id: string) => void) => {
  const messageHandler = (event: MessageEvent) => {
    if (!MESSAGE_ORIGINS_WHITELIST.includes(event.origin)) {
      return
    }
    const { type, payload } = event.data || {}
    const { id } = payload || {}
    if (type === MessageType.SELECT && typeof id === 'string') {
      callback(id)
      removeEventHandler()
    }
  }

  window.addEventListener('message', messageHandler, false)

  const removeEventHandler = () => window.removeEventListener('message', messageHandler, false)
  return removeEventHandler
}
