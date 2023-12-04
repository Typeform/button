import { getEmbedAdminDefaultAppName } from './get-embed-admin-default-app-name'
import { DEFAULT_EMBED_ADMIN_APP_NAME } from './constants'

describe('#getEmbedAdminDefaultAppName', () => {
  it('should return current hostname without www prefix', () => {
    Object.defineProperty(window, 'location', { value: { hostname: 'www.example.com' } })
    expect(getEmbedAdminDefaultAppName()).toBe('example.com')
  })

  it('should return default app name', () => {
    window.location.hostname = null as unknown as string
    expect(getEmbedAdminDefaultAppName()).toBe(DEFAULT_EMBED_ADMIN_APP_NAME)
  })
})
