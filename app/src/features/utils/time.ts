const moment = require('moment');

export const dateToUnix = (date: any) => {
    return moment(date).unix();
}

export const dateStrToDate = (dateStr: any) => {
    return moment.utc(dateStr).toDate();
}

export const dateToStr = (date: any) => {
    return moment(date).format();
}
