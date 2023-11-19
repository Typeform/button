import { getEmbedAdminDefaultAppName } from './get-embed-admin-default-app-name'
import { DEFAULT_EMBED_ADMIN_APP_NAME } from './constants'

describe('#getEmbedAdminDefaultAppName', () => {
  it('should return current hostname', () => {
    Object.defineProperty(window, 'location', { value: { hostname: 'foobar' } })
    expect(getEmbedAdminDefaultAppName()).toBe('foobar')
  })

  it('should return default app name', () => {
    window.location.hostname = null as any
    expect(getEmbedAdminDefaultAppName()).toBe(DEFAULT_EMBED_ADMIN_APP_NAME)
  })
})
