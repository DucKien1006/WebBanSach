import request from '../utils/request'

export function addItems(payload) {
    return request({
        url: '/cart',
        method: 'post',
        data: payload,
    });
}

export function getItems(userId) {
    return request({
        url: `/cart?userId=${userId}`,
        methods: 'get',
    });
}