import axios from 'axios'
import React from 'react'

async function UpdateAxios(type, data, regNo) {
  const val = await axios.post(
    `https://bunkmate-backend.herokuapp.com/${type}`,
    {
      type,
      data,
      regNo,
    }
  )
  return val
}

export default UpdateAxios
