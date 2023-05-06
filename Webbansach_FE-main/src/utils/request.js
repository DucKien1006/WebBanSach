import axios from 'axios'

const service = axios.create({
    // baseURL: 'https://test-book-store-api.herokuapp.com/api', // uri = baseURL + apiFunction truyền tới
    // localhost
    baseURL: 'https://localhost:7175/api', // uri = baseURL + apiFunction truyền tới
    timeout: 20000,
    headers: { // Request Headers
        'content-type': 'application/json'
    }
})

// config token khi gửi request
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Beare ' + token;
        }
        return config
    },
    error => {
        console.log('error', error)
    }
)

// chỉ lấy data từ response trả về
service.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service