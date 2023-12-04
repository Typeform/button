const getWindowSizeAndPosition = () => {
  const { availWidth = 1200, availHeight = 900 } = window?.screen || {}

  const minOffset = 40
  const width = Math.min(availWidth - minOffset, 1120)
  const height = Math.min(availHeight - minOffset, 650)
  const left = (availWidth - width) / 2
  const top = (availHeight - height) / 2

  return [`width=${width}`, `height=${height}`, `left=${left}`, `top=${top}`]
}

export const buildPopup = (url: string, onClose: VoidFunction) => {
  const windowFeatures = [
    'popup',
    'titlebar=no',
    'directories=0',
    'location=no',
    'toolbar=no',
    'menubar=no',
    'resizable=yes',
    ...getWindowSizeAndPosition(),
  ]
  const popup = window.open(url, '_blank', windowFeatures.join(','))

  const interval = setInterval(function () {
    if (popup?.closed) {
      clearInterval(interval)
      onClose && onClose()
    }
  }, 1000)

  const closePopup = () => {
    onClose && onClose()
    popup?.close()
  }
  return {
    close: closePopup,
  }
}
