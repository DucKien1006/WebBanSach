import request from '../utils/request'

export function getCountUser() {
    return request({
        url: '/account/count',
        methods: 'get'
    });
}

export function loginAuth(email, password) {
    return request({
        url: `/account?email=${email}&pass=${password}`,
        methods: 'get'
    });
} 


export function updateUser(param) {
    return request({
        url: '/account/update',
        method:'put',
        data: param
    })
}

export function checkPermission() {
    return request({
        url: '/account/checkPermission',
        methods: 'get'
    })
}

export function register(param) {
    return request({
        url: '/account/register',
        method: 'post',
        data: param
    })
}

export function recoverPassword(param) {
    return request({
        url: `/account/recoverPassword/${param}`,
        method: 'get',
    })
}