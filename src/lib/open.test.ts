import { open } from './open'

describe('#open', () => {
  describe('as popup', () => {
    const openSpy = jest.fn()
    window.open = openSpy

    beforeEach(() => {
      openSpy.mockReset()
    })

    it('should open embed admin to select form', () => {
      open({ action: 'select', appName: 'foo1', callback: () => {} })

      const [[url]] = openSpy.mock.calls

      expect(openSpy).toHaveBeenCalledTimes(1)
      expect(url).toBe('https://embed-admin.typeform.com?isEmbedAdmin=foo1')
    })

    it('should open embed admin to edit form', () => {
      open({ action: 'edit', formId: '1234', appName: 'foo2', callback: () => {} })

      const [[url]] = openSpy.mock.calls

      expect(openSpy).toHaveBeenCalledTimes(1)
      expect(url).toBe('https://embed-admin.typeform.com/form/1234/create?isEmbedAdmin=foo2')
    })
  })

  describe('as iframe', () => {
    beforeEach(() => {
      document.querySelector('iframe')?.remove()
    })

    it('should open embed admin to select form', () => {
      open({
        action: 'select',
        type: 'iframe',
        appName: 'bar1',
        callback: () => {},
      })

      expect(document.querySelector('iframe')?.src).toBe('https://embed-admin.typeform.com/?isEmbedAdmin=bar1')
    })

    it('should open embed admin to edit form', () => {
      open({
        action: 'edit',
        formId: '1234',
        type: 'iframe',
        appName: 'bar2',
        callback: () => {},
      })

      expect(document.querySelector('iframe')?.src).toBe(
        'https://embed-admin.typeform.com/form/1234/create?isEmbedAdmin=bar2',
      )
    })
  })
})
