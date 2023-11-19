import { DEFAULT_EMBED_ADMIN_APP_NAME } from './constants'

export const getEmbedAdminDefaultAppName = () => {
  return window?.location?.hostname || DEFAULT_EMBED_ADMIN_APP_NAME
}
