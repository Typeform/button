import { buildPopup } from './build-popup'

describe('#buildPopup', () => {
  it('should call close callback', () => {
    const popupCloseSpy = jest.fn()
    window.open = jest.fn().mockReturnValue({ closed: false, close: popupCloseSpy })
    const closeFn = jest.fn()
    const { close } = buildPopup('foo', closeFn)
    close()
    expect(popupCloseSpy).toHaveBeenCalledTimes(1)
    expect(closeFn).toHaveBeenCalledTimes(1)
  })

  it('should open popup window', () => {
    window.open = jest.fn()
    Object.defineProperty(window, 'screen', { value: { availWidth: 1200, availHeight: 900 } })
    buildPopup('foo', () => {})
    expect(window.open).toHaveBeenCalledWith(
      'foo',
      '_blank',
      'popup,titlebar=no,directories=0,location=no,toolbar=no,menubar=no,resizable=yes,width=1120,height=650,left=40,top=125',
    )
  })

  it('should call close callback when popup is closed', () => {
    window.open = jest.fn().mockReturnValue({ closed: true })
    jest.useFakeTimers()
    const closeFn = jest.fn()
    buildPopup('foo', closeFn)
    jest.runAllTimers()
    expect(closeFn).toHaveBeenCalledTimes(1)
  })
})
