interface FetchProps {
  input: RequestInfo | URL
  init?: RequestInit
  uploadingFile?: boolean
  token: string
}

export const typedFetch = async <Model>({
  input,
  init,
  token,
  uploadingFile = false,
}: FetchProps): Promise<Model> => {
  const headers = new Headers(init?.headers)
  headers.set('Authorization', `Bearer ${token}`)
  if (!uploadingFile) headers.set('Content-Type', 'application/json')
  const response = await fetch(input, { ...init, headers })
  if (!response.ok) {
    let message = `Request failed (${response.status}). Please try again.`
    try {
      const body: unknown = await response.json()
      if (body && typeof body === 'object') {
        for (const key of ['detail', 'error', 'title']) {
          if (key in body) {
            const value = Reflect.get(body, key)
            if (typeof value === 'string' && value.length < 500) {
              message = value
              break
            }
          }
        }
      }
    } catch {
      /* Preserve the HTTP failure when the response has no JSON body. */
    }
    throw new Error(message)
  }
  return response.json()
}
