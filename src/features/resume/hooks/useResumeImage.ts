import { useState } from 'react'
import axios from 'axios'
import profilePlaceHolder from '../../../assets/icons/blank-profile-picture.png'
import { constants } from '../../../constants.ts'
import { endpoints } from '../../../data/endpoints.ts'
import { ImageObj } from '../../../types/entities/Image.ts';

export const useResumeImage = () => {
  const [image, setImage] = useState<string>(profilePlaceHolder)

  const url = endpoints.resumeImageEndpoint

  const connectImage = (image: ImageObj) => {
    axios({
      url: `${url}/${image.id}`,
      method: 'PUT',
      withCredentials: true,
    })
      .then(() => {
        setImage(constants.BACKEND_URL + image.path)
      })
      .catch((err) => {
        console.error("Couldn't connect profile picture: ", err)
      })
  }

  return { image, setImage, connectImage }
}
