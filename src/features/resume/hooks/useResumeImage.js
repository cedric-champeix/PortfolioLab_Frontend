import { useState } from 'react'
import axios from 'axios'
import { constants } from '../../../constants.js'
import profilePlaceHolder from '../../../assets/icons/blank-profile-picture.png'
import { endpoints } from '../../../data/endpoints.js'

export const useResumeImage = () => {
  const [image, setImage] = useState(profilePlaceHolder)

  const url = endpoints.resumeImageEndpoint

  const connectImage = (image) => {
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
