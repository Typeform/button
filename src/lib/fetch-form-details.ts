export interface FormDetails {
  title?: string
  url?: string
  imageUrl?: string
}
export const fetchFormDetails = async (formId: string): Promise<FormDetails> => {
  const host = 'https://form.typeform.com'
  const formUrl = `${host}/to/${formId}`

  try {
    const result = await fetch(`${host}/oembed?url=${encodeURIComponent(formUrl)}`)
    if (!result.ok) {
      return {}
    }
    const data = await result.json()
    const { title, author_url: url, thumbnail_url: image } = data || {}
    return { title, url, imageUrl: image?.href ?? image }
  } catch (e) {
    return {}
  }
}
