import fetchMock from 'jest-fetch-mock'

import { fetchFormDetails } from './fetch-form-details'

fetchMock.enableMocks()

describe('#fetchFormDetails', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('fetches data from oembed URL', async () => {
    fetchMock.mockReturnValueOnce(new Promise((res) => res(new Response('{}'))))
    await fetchFormDetails('12345')
    expect(fetchMock).toHaveBeenCalledWith(
      `https://form.typeform.com/oembed?url=${encodeURIComponent('https://form.typeform.com/to/12345')}`,
    )
  })

  it('returns empty object when it fails to fetch form details', async () => {
    fetchMock.mockReject(() => Promise.reject('error'))
    const formDetails = await fetchFormDetails('12345')
    expect(formDetails).toEqual({})
  })

  it('returns form details when it fetches form details', async () => {
    const title = 'foobar'
    const url = 'https://form.typeform.com/to/12345'
    const imageUrl = 'https://images.typeform.com/images/abcde'
    const oembedBodyMock = JSON.stringify({
      title,
      author_url: url,
      thumbnail_url: imageUrl,
    })
    fetchMock.mockReturnValueOnce(new Promise((res) => res(new Response(oembedBodyMock))))
    const formDetails = await fetchFormDetails('12345')
    expect(formDetails).toEqual({
      title,
      url,
      imageUrl,
    })
  })
})
