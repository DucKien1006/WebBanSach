import request from '../utils/request'

export function getAllProduct() {
    return request({
        url: '/product',
        methods: 'get'
    });
}

export function getProductDetail(id) {
    return request({
        url: `/product/detail?id=${id}`,
        methods: 'get'
    });
}

export function getCountProduct() {
    return request({
        url: '/product/count',
        methods: 'get'
    });
}

export function getCategory() {
    return request({
        url: '/product/getcategory',
        methods: 'get'
    });
}

export function getProductFilter(pageNumber, pageSize, filter) {
    return request({
        url: `/product/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'post',
        data: filter
    });
}

export function insertProduct(param) {
    return request({
        url: '/product/insert',
        method:'post',
        data: param
    })
}

export function updateProduct(param) {
    return request({
        url: '/product/update',
        method:'post',
        data: param
    })
}
export function getProductFilterByCategory(pageNumber, pageSize, filter, idCategory) {
    return request({
        url: `/product/filterbycategory?IdCategory=${idCategory}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        method: 'post',
        data: filter
    });
}