import { initializeButtons } from './initialize-buttons'

declare global {
  interface Window {
    callback: VoidFunction
  }
}

describe('#initializeButtons', () => {
  it('should throw an error for missing callback', () => {
    document.body.innerHTML = '<a data-tf-embed-admin></a>'
    expect(() => initializeButtons()).toThrowError()
  })

  it('should initialize button for popup', () => {
    window.callback = () => {}
    const openSpy = jest.fn()
    window.open = openSpy
    document.body.innerHTML = '<a data-tf-embed-admin data-tf-embed-admin-callback="callback"></a>'
    initializeButtons()

    const button = document.querySelector('[data-tf-embed-admin]') as HTMLElement
    button.click()
    const [[url]] = openSpy.mock.calls

    expect(openSpy).toHaveBeenCalledTimes(1)
    expect(url).toBe('https://embed-admin.typeform.com?isEmbedAdmin=localhost')
  })

  it('should initialize button for iframe', () => {
    window.callback = () => {}
    document.body.innerHTML =
      '<a data-tf-embed-admin data-tf-embed-admin-type="iframe" data-tf-embed-admin-action="edit" data-tf-embed-admin-payload="1234" data-tf-embed-admin-app-name="jest-app" data-tf-embed-admin-callback="callback"></a>'
    window.open = jest.fn()
    initializeButtons()

    const button = document.querySelector('[data-tf-embed-admin]') as HTMLElement
    button.click()

    expect(document.querySelector('iframe')?.src).toBe(
      'https://embed-admin.typeform.com/form/1234/create?isEmbedAdmin=jest-app',
    )
  })
})
