import moment from 'moment'

export function responseWhenLimitReached(typeOfLimit){
    const limitByType = typeOfLimit=="TOKEN" ? process.env.RATE_LIMIT_BY_TOKEN : process.env.RATE_LIMIT_BY_IP;
    return {"error": 1,"message": `Limit by ${typeOfLimit} reached: ${limitByType} requests per hour. Wait till '${moment().add(1, 'hours').format('MMMM Do YYYY ha')}' to make a new request`} 
}
export function redisValueCreator (storagedData, typeOfLimit){
    if ((storagedData == null) || (isTheNextHour(storagedData.startTime))){
        return createInitialValue();
    }

    if(isLimitReached(storagedData.numberOfRequests, typeOfLimit)){
        storagedData.limitError = true;
    }else{
        storagedData.numberOfRequests++
    }
    return storagedData
}


function isTheNextHour(storagedTime){  
    if(!(storagedTime == moment().format('MMMM Do YYYY, h a'))) return true
}
function isLimitReached(storagedNumberOfRequests, typeOfLimit){ 
    const limitByType =  typeOfLimit=="TOKEN" ? process.env.RATE_LIMIT_BY_TOKEN : process.env.RATE_LIMIT_BY_IP;
    if(storagedNumberOfRequests >= limitByType) return true
}
function createInitialValue(){
    return {'numberOfRequests': 1, 'startTime': moment().format('MMMM Do YYYY, h a')}
}
