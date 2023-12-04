import { EMBED_ADMIN_BASE_URL } from './constants'

export const getEmbedAdminUrl = (action: string, embedAdminAppName: string, formId?: string) => {
  const embedAdminQueryString = `?isEmbedAdmin=${encodeURIComponent(embedAdminAppName)}`
  switch (action) {
    case 'edit':
      if (!formId) {
        throw new Error('You need to provide a form id for "edit" action')
      }
      return `${EMBED_ADMIN_BASE_URL}/form/${formId}/create${embedAdminQueryString}`
    default:
    case 'select':
      return `${EMBED_ADMIN_BASE_URL}${embedAdminQueryString}`
  }
}
