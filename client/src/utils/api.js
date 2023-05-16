import axios from 'axios'
import { BASE_URL } from '../requestMethods'
const baseUrl = `${BASE_URL}`

// General Post Request
export const generalPostRequest = async (url, _obj) => {
  try {
    const data = await axios.post(baseUrl + url, _obj)
    return data
  } catch (error) {
    console.log(error)
    return error.response
  }
}

//post Request
export const postRequest = async (url, _obj) => {
  try {
    const saved = window.localStorage.getItem('__xTFTGweTHDeRTT__%')
    const accesstoken = JSON.parse(saved)
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }
    const data = await axios.post(baseUrl + url, _obj, header)
    return data
  } catch (error) {
    console.log(error)
    return error.response
  }
}

//getRequest
export const getRequest = async (url) => {
  try {
    const saved = window.localStorage.getItem('__xTFTGweTHDeRTT__%')
    const accesstoken = JSON.parse(saved)
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }
    const data = await axios.get(baseUrl + url, header)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

//patch request
export const updateRequest = async (url, _obj) => {
  try {
    const saved = window.localStorage.getItem('__xTFTGweTHDeRTT__%')
    const accesstoken = JSON.parse(saved)
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }
    const data = await axios.patch(baseUrl + url, _obj, header)
    return data
  } catch (error) {
    return error.response
  }
}



