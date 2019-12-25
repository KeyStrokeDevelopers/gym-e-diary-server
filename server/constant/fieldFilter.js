import { GYM_INFO_FIELD, STAFF_INFO_FIELD, SUBSCRIPTION_FIELD, ACCESS_LEVEL_FIELD, SMS_SUBSCRIPTION_FIELD } from './index'

export const gymInfoField = (data) => {
    let gymInfo = {};
    GYM_INFO_FIELD.map((key) => {
        if (data.hasOwnProperty(key)) {
            gymInfo[key] = data[key]
        }
    })
    return gymInfo;
}

export const staffInfoField = (data) => {
    let staffInfo = {};
    STAFF_INFO_FIELD.map((key) => {
        if (data.hasOwnProperty(key)) {
            staffInfo[key] = data[key]
        }
    })
    return staffInfo;
}

export const accessLevelField = (data) => {
    let accessLevel = {};
    ACCESS_LEVEL_FIELD.map((key) => {
        if (data.hasOwnProperty(key)) {
            accessLevel[key] = data[key]
        }
    })
    return accessLevel;
}

export const subscriptionField = (data) => {
    let subscription = {};
    SUBSCRIPTION_FIELD.map((key) => {
        if (data.hasOwnProperty(key)) {
            subscription[key] = data[key]
        }
    })
    return subscription;
}


export const smsSubscriptionField = (data) => {
    let subscription = {};
    SMS_SUBSCRIPTION_FIELD.map((key) => {
        if (data.hasOwnProperty(key)) {
            subscription[key] = data[key]
        }
    })
    return subscription;
}

export const masterInfoField = (data) => {
    let subscription = {};
    SMS_SUBSCRIPTION_FIELD.map((key) => {
        if (data.hasOwnProperty(key)) {
            subscription[key] = data[key]
        }
    })
    return subscription;
}