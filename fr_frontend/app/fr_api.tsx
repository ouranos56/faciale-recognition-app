import axios from "axios"

const fr_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FR_API_URL + "api/",
})
export default fr_api