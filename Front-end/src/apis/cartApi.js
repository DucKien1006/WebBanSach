import request from '../utils/request'

export function addItems(payload) {
    return request({
        url: '/cart',
        method: 'post',
        data: payload,
    });
}

export function getItems() {
    return request({
        url: '/cart',
        methods: 'get',
    });
}

export function checkoutApi(payload) {
    return request({
        url: '/cart/checkout',
        method: 'post',
        data: payload,
    });
}

export function getHistory() {
    return request({
        url: '/cart/history',
        method: 'get',
    });
}

export function applyPromotionCode(payload) {
    return request({
        url: `/cart/applypromotion?code=${payload}`,
        method: 'post',
    });
}

export function updateQuantity(idOrder, type) {
    return request({
        url: `/Cart/updateQuantity/${idOrder}?type=${type}`,
        method: 'put'
    })
}