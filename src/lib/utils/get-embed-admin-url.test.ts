import { getEmbedAdminUrl } from './get-embed-admin-url'
import { EMBED_ADMIN_BASE_URL } from './constants'

describe('#getEmbedAdminUrl', () => {
  it('should return correct url for "select" action', () => {
    const url = getEmbedAdminUrl('select', 'foobar')
    expect(url).toBe(`${EMBED_ADMIN_BASE_URL}?isEmbedAdmin=foobar`)
  })

  it('should return correct url for "edit" action', () => {
    const url = getEmbedAdminUrl('edit', 'foobar', '123')
    expect(url).toBe(`${EMBED_ADMIN_BASE_URL}/form/123/create?isEmbedAdmin=foobar`)
  })
})
