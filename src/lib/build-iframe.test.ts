import '@testing-library/jest-dom'
import { screen } from '@testing-library/dom'

import { buildIframe } from './build-iframe'

describe('#buildIframe', () => {
  beforeEach(() => {
    // cleanup the DOM before running each test
    document.body.innerHTML = ''
  })

  it('should call close callback', () => {
    const closeFn = jest.fn()
    const { close } = buildIframe('foo', closeFn)
    close()
    expect(closeFn).toHaveBeenCalledTimes(1)
  })

  it('should render iframe wrapper', () => {
    buildIframe('foo', () => {})
    expect(screen.getByTestId('tf-embed-admin-wrapper')).toBeVisible()
  })

  it('should render iframe', () => {
    buildIframe('foo', () => {})
    expect(screen.getByTestId('tf-embed-admin--iframe')).toBeVisible()
  })

  it('should render close button', () => {
    buildIframe('foo', () => {})
    expect(screen.getByTestId('tf-embed-admin--close-button')).toBeVisible()
  })

  it('should call close callback when close button is clicked', () => {
    const closeFn = jest.fn()
    buildIframe('foo', closeFn)
    screen.getByTestId('tf-embed-admin--close-button').click()
    expect(closeFn).toHaveBeenCalledTimes(1)
  })
})
