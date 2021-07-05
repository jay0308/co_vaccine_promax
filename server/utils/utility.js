let jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

const getZeroAppendedStr = (number) => {
    let str = `${number < 10 ? "0" + number : number}`
    return str;
}

module.exports = {
    isOlderDate: (date, hr = 1) => {
        let now = new Date().getMilliseconds();
        let _date = new Date(date).getMilliseconds();
        let milliSec = hr * 60 * 60;
        let remainMilliSec = now - milliSec;
        if (_date > remainMilliSec) {
            return false
        } else {
            return true
        }
    },
    generateJWTTocken: async (username) => {
        let token = jwt.sign({ username: username },
            process.env.API_SECRET_KEY,
            {
                expiresIn: '365d' // expires in 24 hours
            });
        return token;
    },
    validateFields: (fieldArr) => {
        for (let index = 0; index < fieldArr.length; index++) {
            const element = fieldArr[index];
            for (let i = 0; i < element.validate.length; i++) {
                const ele = element.validate[i];
                switch (ele) {
                    case "notNull":
                        if (!element.value)
                            return false;
                        break;
                    case "isNumber":
                        if (!Number.isInteger(element.value))
                            return false
                        break;
                    case "isArray":
                        if (!Array.isArray(element.value))
                            return false
                        if(element.value.length === 0)
                            return false
                        break;
                    default:
                        break;
                }
            }

        }

        return true;
    },
    formatDate: (date, format) => {
        date = new Date(date);
        let month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Sep", "Oct", "Nov", "Dec"]
        switch (format) {
            case "dd/mm/yyyy":
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            case "dd month yyyy":
                return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
            default:
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
    },
    compareDates: (dateFirst, dateSecond) => {
        dateFirst.setHours(0, 0, 0, 0);
        dateSecond.setHours(0, 0, 0, 0);
        if (dateFirst.getTime() === dateSecond.getTime()) {
            return 0;
        } else if (dateFirst.getTime() < dateSecond.getTime()) {
            return -1;
        } else if (dateFirst.getTime() > dateSecond.getTime()) {
            return 1;
        }
    },
    convertToMMDDYY: (dateStr) => {
        let dtArr = dateStr.split("/");
        let rearrangeDate = `${dtArr[1]}/${dtArr[0]}/${dtArr[2]}`;
        return rearrangeDate;
    },
    getTimeInFormat: (timeObj, format) => {
        if (!timeObj) {
            return ""
        }
        let _dobj = new Date(timeObj)
        switch (format) {
            case "hh:mm:am/pm":
                return `${_dobj.getHours() < 12 ? getZeroAppendedStr(_dobj.getHours()) : getZeroAppendedStr(_dobj.getHours() - 12)}:${getZeroAppendedStr(_dobj.getMinutes())} ${_dobj.getHours() < 12 ? "Am" : "Pm"}`
            default:
                return `${getZeroAppendedStr(_dobj.getHours())}:${getZeroAppendedStr(_dobj.getMinutes())}`
        }
    },
    momentDate:() => {
        console.log("Moment zone",moment.tz.guess(),moment().tz("Asia/Calcutta").format('MM/DD/YYYY HH:mm'));
        return function(dateString){
            if(moment.tz.guess() === "Asia/Calcutta"){
                if (dateString)
                    return new Date(dateString)
                else
                    return new Date()
            }else{
                if (dateString)
                    return new Date(moment(dateString.toUTCString()).tz("Asia/Calcutta").format('MM/DD/YYYY HH:mm'))
                else
                    return new Date(moment().tz("Asia/Calcutta").format('MM/DD/YYYY HH:mm'))
            }
            
        }
       
    }
}