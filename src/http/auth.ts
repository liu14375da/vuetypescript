import { Request } from './reauest';
 
 
export function sendEmail (parameter: any)  {
    return Request.axiosInstance({
        url: '/login/sendEmail',
        method: 'post',
        data: parameter
    })
}

export function userRegister (parameter: any)  {
    return Request.axiosInstance({
        url: '/login/register',
        method: 'post',
        data: parameter
    })
}

export function updateUser (parameter: any)  {
    return Request.axiosInstance({
        url: '/user/update',
        method: 'post',
        data: parameter
    })
}

export function userLogin (parameter: any)  {
    return Request.axiosInstance({
        url: '/login/user',
        method: 'get',
        params: parameter
    })
}

export function searchEmail (parameter: any)  {
    return Request.axiosInstance({
        url: '/user/searchEmail',
        method: 'get',
        params: parameter
    })
}

export function userList ()  {
    return Request.axiosInstance({
        url: '/user/list',
        method: 'get',
    })
}
