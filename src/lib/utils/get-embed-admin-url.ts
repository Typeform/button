import { EMBED_ADMIN_BASE_URL } from './constants'

export const getEmbedAdminUrl = (action: string, formId?: string, embedAdminAppName?: string) => {
  const embedAdminQueryString = `?isEmbedAdmin=${embedAdminAppName}`
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
