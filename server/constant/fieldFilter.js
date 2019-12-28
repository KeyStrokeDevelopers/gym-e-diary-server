import {  STAFF_LOGIN_INFO_FIELD } from './index'

export const loginStaffInfo = (data) => {
    let userInfo = {};
    STAFF_LOGIN_INFO_FIELD.map((key) => {
        if (data[key]) {
            userInfo[key] = data[key];
        }
    })
    return userInfo;
}

export const dataFilter= (data, field) => {
    let filterData = {};
    field.map((key) => {
        if (data.hasOwnProperty(key)) {
            filterData[key] = data[key];
        }
    })
    return filterData;  
}