import { initializeButtons } from './initialize-buttons'

declare global {
  interface Window {
    callback: VoidFunction
  }
}

describe('#initializeButtons', () => {
  it('should throw an error for missing callback', () => {
    document.body.innerHTML = '<a data-tf-embed-admin-select></a>'
    expect(() => initializeButtons()).toThrowError()
  })

  it('should initialize button for popup', () => {
    window.callback = () => {}
    const openSpy = jest.fn()
    window.open = openSpy
    document.body.innerHTML =
      '<a id="select-button" data-tf-embed-admin-select data-tf-embed-admin-callback="callback"></a>'
    initializeButtons()

    const button = document.querySelector('#select-button') as HTMLElement
    button.click()
    const [[url]] = openSpy.mock.calls

    expect(openSpy).toHaveBeenCalledTimes(1)
    expect(url).toBe('https://embed-admin.typeform.com?isEmbedAdmin=localhost')
  })

  it('should initialize button for iframe', () => {
    window.callback = () => {}
    document.body.innerHTML =
      '<a id="edit-button" data-tf-embed-admin-edit="1234" data-tf-embed-admin-type="iframe" data-tf-embed-admin-app-name="jest-app" data-tf-embed-admin-callback="callback"></a>'
    initializeButtons()

    const button = document.querySelector('#edit-button') as HTMLElement
    button.click()

    expect(document.querySelector('iframe')?.src).toBe(
      'https://embed-admin.typeform.com/form/1234/create?isEmbedAdmin=jest-app',
    )
  })
})
