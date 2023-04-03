import axios from 'axios'

const service = axios.create({
    baseURL: 'https://localhost:7101/api', // uri = baseURL + apiFunction truyền tới
    timeout: 5000,
    headers: { // Request Headers
        'content-type': 'application/json'
    }
})

export default service