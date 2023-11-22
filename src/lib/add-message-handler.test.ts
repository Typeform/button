import { addMessageHandler, MessageType } from './add-message-handler'
import { MESSAGE_ORIGINS_WHITELIST } from './utils/constants'

describe('#addMessageHandler', () => {
  it('should add a message handler', () => {
    const addSpy = jest.spyOn(window, 'addEventListener')
    addMessageHandler(() => {})
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  it('should remove a message handler', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener')
    const remove = addMessageHandler(() => {})
    remove()
    expect(removeSpy).toHaveBeenCalledTimes(1)
  })

  describe('when message is received', () => {
    const customCallback = jest.fn()
    let messageHandler: EventListener

    beforeEach(() => {
      jest.spyOn(window, 'addEventListener').mockImplementationOnce((_, handler) => {
        messageHandler = handler as EventListener
      })
      addMessageHandler(customCallback)
    })

    it.each([
      {},
      { origin: MESSAGE_ORIGINS_WHITELIST[0] },
      { origin: MESSAGE_ORIGINS_WHITELIST[0], data: { type: 'foobar', payload: { id: '123' } } },
      { origin: 'invalid', data: { type: MessageType.SELECT, payload: { id: '123' } } },
    ] as Event[])('should not call callback function for invalid event %j', (event) => {
      messageHandler(event)
      expect(customCallback).not.toHaveBeenCalled()
    })

    it('should call callback function for valid event', () => {
      messageHandler({
        origin: MESSAGE_ORIGINS_WHITELIST[0],
        data: { type: MessageType.SELECT, payload: { id: '123' } },
      } as unknown as Event)
      expect(customCallback).toHaveBeenCalledWith('123')
    })
  })
})
