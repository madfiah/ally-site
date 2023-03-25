import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const Api = {
  get: async (path: string, token: any, id?: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : token,
        id: id,
      },
    }

    return await new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/${path}`, config)
        .then((result: any) => {
          return resolve(result.data)
        })
        .catch((error: any) => {
          reject(error.response)
        })
    })
  },

  post: async (path: string, token: any, id?: any, params?: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : token,
        id: id ? id : null,
      },
    }

    return await new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/${path}`, params, config)
        .then((result: any) => {
          return resolve(result.data)
        })
        .catch((error: any) => {
          reject(error.response)
        })
    })
  },
}
