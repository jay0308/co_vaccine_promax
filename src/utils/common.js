const getZeroAppendedStr = (number) => {
    let str = `${number < 10 ? "0" + number : number}`
    return str;
}
const global = {

    validate: values => {
        const errors = {}
        const requiredFields = [
            'otp',
            'email',
            'mobileNo'
        ]
        requiredFields.forEach(field => {
            if (!values[field]) {
                errors[field] = 'Required'
            }
        })
        if (
            values.email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address'
        }
        if(values.mobileNo){
            let phoneno = /^\d{10}$/;
            if(!values.mobileNo.match(phoneno)){
                errors.mobileNo = "Invalid Mobile No"
            }
        }
        return errors
    },
    debounce: (func, delay) => {
        let debounceTimer
        return function () {
            const context = this
            const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer
                = setTimeout(() => func.apply(context, args), delay)
        }
    },
    isMobile: () => {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile
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
    getDateInFormat: (dateObj, format) => {
        let month = ["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"]
        if (!dateObj) {
            return ""
        }
        let _dobj = new Date(dateObj)
        switch (format) {
            case "dd month yyyy":
                return `${_dobj.getDate()} ${month[_dobj.getMonth()]} ${_dobj.getFullYear()}`
            default:
                return `${_dobj.getDate()}/${_dobj.getMonth()+1}/${_dobj.getFullYear()}`
        }
    },
    getHours: (time1, time2) => {
        let time1Hr = new Date(time1).getHours();
        let time2Hr = new Date(time2).getHours();
        let time1Min = new Date(time1).getMinutes();
        let time2Min = new Date(time2).getMinutes();
        return `${Math.abs(time1Hr - time2Hr)}:${Math.abs(time1Min - time2Min)} hours`
    },
    getUrlParams: (sq) => {
        sq = sq || window.location.search;
        let urlParms = new URLSearchParams(sq);
        return urlParms;
    },
    checkTimestampsValidity : (older, newer, hrs) => {
        let difference = Math.abs(newer - older);
        if (difference >= hrs * 60 * 60 * 1000) {
            return false
        }
        return true
    }
}

export default global;