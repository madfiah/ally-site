const API_URL = process.env.NEXT_PUBLIC_API_URL

export const Api = {
  get: async (path: string, token: any, id?: any) => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : token,
        id: id ? id : null,
      },
    })

    return await response.json()
  },
  post: async (
    path: string,
    params: any,
    is_multi_part: boolean,
    token: any
  ) => {
    const data_headers: { [k: string]: any } = {}

    data_headers['Authorization'] = token ? `Bearer ${token}` : token
    data_headers['Content-Type'] = is_multi_part
      ? 'multipart/form-data'
      : 'application/json'

    const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: data_headers,
      body: params,
    })

    return await response.json()
  },
}
