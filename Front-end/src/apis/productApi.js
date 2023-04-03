import request from '../utils/request'

export function getAllProduct() {
    return request({
        url: '/product',
        methods: 'get'
    });
}