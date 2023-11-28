import { open } from './lib/open'

import { lib } from './index'

jest.mock('./lib/open')

describe('#lib', () => {
  beforeEach(() => {
    ;(open as jest.Mock).mockReset()
  })

  describe('#configure', () => {
    it('should set config', () => {
      lib.configure({ type: 'iframe', appName: 'jest-app' })
      expect(lib.config.type).toBe('iframe')
      expect(lib.config.appName).toBe('jest-app')
    })
  })

  describe('#selectForm', () => {
    it('should call open function with correct payload', () => {
      const callback = jest.fn()
      lib.configure({ type: 'iframe', appName: 'jest-app' })
      lib.selectForm(callback)
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'select',
        type: 'iframe',
        appName: 'jest-app',
        callback,
      })
    })
  })

  describe('#editForm', () => {
    it('should call open function with correct payload', () => {
      const callback = jest.fn()
      lib.configure({ type: 'iframe', appName: 'jest-app' })
      lib.editForm('1234', callback)
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'edit',
        formId: '1234',
        type: 'iframe',
        appName: 'jest-app',
        callback,
      })
    })
  })
})
