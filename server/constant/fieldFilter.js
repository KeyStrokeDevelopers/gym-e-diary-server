const { STAFF_LOGIN_INFO_FIELD } = require('./index')
var ObjectId = require('mongoose').Types.ObjectId;

const loginStaffInfo = (data) => {
    let userInfo = {};
    STAFF_LOGIN_INFO_FIELD.map((key) => {
        if (data[key]) {
            userInfo[key] = data[key];
        }
    })
    return userInfo;
}

const GetObjectData = (data, field) => {
    let filterData = {};
    field.map((key) => {
        filterData[key] = data[key];
    })
    return filterData;
}

const dataFilter = (data, field) => {
    let filterData = {};
    field.map((key) => {
        if (data.hasOwnProperty(key)) {
            filterData[key] = data[key];
        }
    })
    return filterData;
}

const arrayDataFilter = (data, field) => {
    let filterArrayData = [];
    data.forEach((item, index) => {
        let filterData = {};
        field.map((key) => {
            if (item.hasOwnProperty(key)) {
                filterData[key] = item[key];
            }
        })
        filterArrayData.push(filterData);
    })
    return filterArrayData;
}

const fileDataFilter = (data, field) => {
    let filterData = {};
    field.map((key) => {
        if (data[key]) {
            if (key === 'accessLevel') {
                if (ObjectId.isValid(data[key])) {
                    filterData[key] = data[key];
                } else {
                    return null;
                }
            } else {
                filterData[key] = data[key];
            }
        }
    })
    return filterData;
}

module.exports = {
    loginStaffInfo,
    dataFilter,
    arrayDataFilter,
    fileDataFilter,
    GetObjectData
};