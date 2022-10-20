const moment = require('moment')



function actualDateEqualStoragedDate(storagedData){  
    if(!(storagedData == moment().format('MMMM Do YYYY, h a'))) return false
}

function isLimitReached(storagedCount, type){ 
    const typeOfLimit =  type==0 ? process.env.RATE_LIMIT_BY_TOKEN : process.env.RATE_LIMIT_BY_ID;
    if(storagedCount >= typeOfLimit) return true
}

export function dataCreator (storagedData, typeOfLimit){
    if (storagedData == null){
        let newUserData = {
            'count': 1,
            'startTime': moment().format('MMMM Do YYYY, h a')
        }
        return newUserData;
    }
    if (actualDateEqualStoragedDate(storagedData.startTime)){
        storagedData.startTime = moment().format('MMMM Do YYYY, h a');
        storagedData.count = 1;
    }

    if(isLimitReached(storagedData.count, typeOfLimit)){
        storagedData.limitError = true;
    }else{
        storagedData.count++
    }
    return storagedData
}