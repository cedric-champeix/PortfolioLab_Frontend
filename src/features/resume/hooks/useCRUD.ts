import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * CRUD handler method
 * Specify an endpoint where to fetch the API
 *
 * @param url
 * @returns {{data: *[], update: ((function(*, *): Promise<void>)|*), create: ((function(*): Promise<void>)|*), remove: ((function(*): Promise<void>)|*)}}
 */
export const useCRUD = (url: string) => {
  const [data, setData] = useState<Record<string, any>[]>([])

  useEffect(() => {
    axios({
      url: url,
      method: 'GET',
      withCredentials: true,
    })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [url])

  const create = async (body: Record<string, any>) => {
    const fetch = await axios({
      url: `${url}`,
      method: 'POST',
      withCredentials: true,
      data: body,
    })

    if (fetch.status === 200) {
      console.log(data)
      setData([...data, fetch.data])
    } else {
      console.error(fetch.status, fetch.data.message)
    }
  }

  const update = async (id: string, body: Record<string, any>) => {
    const fetch = await axios({
      url: `${url}/${id}`,
      method: 'PUT',
      withCredentials: true,
      data: body,
    })

    if (fetch.status === 200) {
      setData(data.map((item) => (item.id === id ? { ...fetch.data } : item)))
    } else {
      console.error(fetch.status, fetch.data.message)
    }
  }

  const remove = async (id: string) => {
    const fetch = await axios({
      url: `${url}/${id}`,
      method: 'DELETE',
      withCredentials: true,
    })

    if (fetch.status === 200) {
      setData(
        data.filter((experience) => {
          return experience.id !== id
        })
      )
    } else {
      console.error(fetch.data.message)
    }
  }

  return { update, create, remove, data }
}
