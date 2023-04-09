import axios from 'axios'
import { BASE_URL } from '../common/UrlConfig';
const axiosInstance = axios.create({
    baseURL:BASE_URL

})

export default axiosInstance;