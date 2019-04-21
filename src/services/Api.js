import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `insert ur base url`
  })
}