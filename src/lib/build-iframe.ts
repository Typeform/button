export const buildIframe = (url: string, onClose: VoidFunction) => {
  const wrapper = document.createElement('div')
  wrapper.dataset.testid = 'tf-embed-admin-wrapper'
  wrapper.className = 'tf-embed-admin-wrapper'
  wrapper.style.position = 'absolute'
  wrapper.style.top = '0'
  wrapper.style.left = '0'
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  wrapper.style.backgroundColor = 'rgba(0,0,0,0.75)'
  wrapper.style.zIndex = '10000'

  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.dataset.testid = 'tf-embed-admin--iframe'
  iframe.className = 'tf-embed-admin--iframe'
  iframe.style.margin = '50px'
  iframe.style.width = 'calc(100% - 100px)'
  iframe.style.height = 'calc(100% - 100px)'
  iframe.style.border = 'none'
  iframe.style.borderRadius = '8px'
  iframe.style.backgroundColor = '#fff'
  wrapper.appendChild(iframe)

  const closeIframe = () => {
    onClose && onClose()
    wrapper.remove()
  }

  const close = document.createElement('button')
  close.dataset.testid = 'tf-embed-admin--close-button'
  close.className = 'tf-embed-admin--close-button'
  close.style.all = 'unset'
  close.style.position = 'absolute'
  close.style.top = '15px'
  close.style.right = '50px'
  close.style.fontSize = '30px'
  close.style.color = '#fff'
  close.style.textAlign = 'right'
  close.style.width = '30px'
  close.style.height = '30px'
  close.style.lineHeight = '30px'
  close.style.cursor = 'pointer'
  close.style.opacity = '0.75'
  close.innerHTML = '&times'
  close.onclick = closeIframe
  wrapper.appendChild(close)

  document.body.appendChild(wrapper)

  return {
    close: closeIframe,
  }
}
