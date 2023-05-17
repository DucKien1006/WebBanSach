import request from '../utils/request'

export function getAllUser() {
    return request({
        url: '/Admin',
        methods: 'get'
    });
}

export function getAllUserByName(param) {
    return request({
        url: `/Admin/search/${param}`,
        method: 'post'
    });
}


export function insertNewUser(param) {
    return request({
        url: '/admin/insert',
        method:'post',
        data: param
    })
}

export function deleteUser(param) {
    return request({
        url: `/admin/${param}`,
        method: 'delete'
    })
}

export function getAllOrder() {
    return request({
        url: `/admin/getAllOrder`,
        methods: 'get'
    })
}

export function updateOrder(idorder, paymentSatus){
    return request({
        url: `/Admin/updateOrder?idorder=${idorder}&paymentSatus=${paymentSatus}`,
        method: 'post'
    })
}

export function filterOrder(param) {
    return request({
        url: `/admin/filterOrder?filter=${param}`,
        methods: 'get'
    })
}

export function dashboardAdmin() {
    return request({
        url: `/admin/dashboard`,
        methods: 'get'
    })
}

export function getAllPromotion() {
    return request({
        url:  `/admin/getALlPromotion`,
        methods: 'get'
    })
}

export function createNewPromotion(param) {
    return request({
        url:  `/admin/createNewPromotion/${param}`,
        method: 'post'
    })
}

export function deletePrmotion(param) {
    return request ({
        url:  `admin/deletePrmotion/${param}`,
        method: 'delete'
    })
}

export function deleteProduct(param) {
    return request ({
        url:  `admin/deleteProduct/${param}`,
        method: 'delete'
    })
}

export function createNewCategory(param) {
    return request({
        url:  `/admin/createNewCategory/${param}`,
        method: 'post'
    })
}

export function deleteCategory(param) {
    return request({
        url:  `/admin/deleteCategory/${param}`,
        method: 'delete'
    })
}