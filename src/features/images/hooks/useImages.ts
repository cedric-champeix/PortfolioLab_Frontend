import { useEffect, useState } from 'react'
import { endpoints } from '../../../data/endpoints.ts'
import axios from 'axios'
import { ImageObj } from '../../../types/entities/Image.ts';

export const useImages = () => {
  const [images, setImages] = useState<ImageObj[]>([])

  const url = endpoints.imagesEndpoint

  useEffect(() => {
    axios({
      url: url,
      method: 'GET',
      withCredentials: true,
    })
      .then((response) => {
        setImages(response.data)
      })
      .catch((error) => {
        console.error("Couldn't get images: ", error)
      })
  }, [])

  const upload = async (file: File, body: {name: string}, cb: (_: any) => void) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(body))
    formData.append('image', file)

    await axios({
      url: url,
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then((res) => {
        setImages([...images, res.data])
        cb(res.data)
      })
      .catch((error) => {
        console.error('Error when uploading image: ', error)
        cb(null)
      })
  }

  const update = async (id: string, imageName: string) => {
    const body = {
      name: imageName,
    }

    axios({
      url: `${url}/${id}`,
      method: 'PUT',
      withCredentials: true,
      data: body,
    })
      .then((res) => {
        setImages(images.map((image) => (image.id === id ? res.data : image)))
      })
      .catch((error) => {
        console.error('Error when updating image name: ', error)
      })
  }

  const remove = async (id: string) => {
    axios({
      url: `${url}/${id}`,
      method: 'DELETE',
      withCredentials: true,
    })
      .then(() => {
        setImages(
          images.filter((image) => {
            return image.id !== id
          })
        )
      })
      .catch((error) => {
        console.error('Error when deleting image: ', error)
      })
  }

  const removeMultiple = async (idList: string[]) => {
    const body = {
      imageIds: idList,
    }

    axios({
      url: `${url}`,
      method: 'DELETE',
      withCredentials: true,
      data: body,
    })
      .then(() => {
        setImages(
          images.filter((image) => {
            return !idList.includes(image.id)
          })
        )
      })
      .catch((error) => {
        console.error('Error when deleting images: ', error)
      })
  }

  return { images, setImages, upload, update, remove, removeMultiple }
}
