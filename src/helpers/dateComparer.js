const moment = require('moment')


export function actualDateEqualStoragedDate(storagedData){  
    if(!(storagedData == moment().format('MMMM Do YYYY, h a'))) return false
}

export function isLimitReached(storagedCount, type){  
    const typeOfLimit =  type==0 ? process.env.RATE_LIMIT_BY_TOKEN : process.env.RATE_LIMIT_BY_ID;
    if(storagedCount++ > typeOfLimit) return true
}