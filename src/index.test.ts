import { open } from './lib/open'
import { setDefaultConfig } from './lib/default-config'

import { setDefaultConfiguration, selectForm, editForm } from './index'

jest.mock('./lib/open')

describe('#lib', () => {
  const callback = jest.fn()

  beforeEach(() => {
    ;(open as jest.Mock).mockReset()
    setDefaultConfig({})
  })

  describe('#selectForm', () => {
    it('should use no configuration', () => {
      selectForm({ callback })
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'select',
        callback,
      })
    })

    it('should use default configuration', () => {
      setDefaultConfiguration({ type: 'iframe', appName: 'jest-app-1' })
      selectForm({ callback })
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'select',
        type: 'iframe',
        appName: 'jest-app-1',
        callback,
      })
    })

    it('should use custom configuration', () => {
      setDefaultConfiguration({ type: 'iframe', appName: 'jest-app-1' })
      selectForm({ callback, type: 'popup', appName: 'jest-app-8' })
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'select',
        type: 'popup',
        appName: 'jest-app-8',
        callback,
      })
    })
  })

  describe('#editForm', () => {
    it('should use no configuration', () => {
      editForm({ formId: '1234', callback })
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'edit',
        formId: '1234',
        callback,
      })
    })

    it('should use default configuration', () => {
      setDefaultConfiguration({ type: 'popup', appName: 'jest-app-2' })
      editForm({ formId: '1234', callback })
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'edit',
        formId: '1234',
        type: 'popup',
        appName: 'jest-app-2',
        callback,
      })
    })

    it('should use custom configuration', () => {
      setDefaultConfiguration({ type: 'popup', appName: 'jest-app-2' })
      editForm({ formId: '1234', callback, type: 'iframe', appName: 'jest-app-3' })
      expect(open).toHaveBeenCalledTimes(1)
      expect(open).toHaveBeenCalledWith({
        action: 'edit',
        formId: '1234',
        type: 'iframe',
        appName: 'jest-app-3',
        callback,
      })
    })
  })
})
