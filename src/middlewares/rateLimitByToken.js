import client from "../databases/redis.db"
const moment = require('moment')

export const checkLimit = async (req, res, next) =>{
    client.exists(req.userId,(err,reply) => {
        if(err) {
            console.log("Redis not working...")
            system.exit(0)
        }
        if(reply === 1) {
            client.get(req.userId,(err,reply) => {
                let data = JSON.parse(reply)
                if (data.startTime != moment().format('MMMM Do YYYY, h a')){
                    data.startTime = moment().format('MMMM Do YYYY, h a');
                    data.count = 1;
                }
                ////////////////////////////////////TODO
                // checkHour(data.startTime);
                // checkNumberOfRequests(data.startTime);
                if ((data.count++) >= process.env.RATE_LIMIT_BY_TOKEN){
                    data.count++;
                    return res.status(429).json({
                        "error": 1, 
                        "message": "Limit reached, wait till '" + moment().add(1, 'hours').format('MMMM Do YYYY, ha') + "' to make a new request."
                    })
                }
                console.log(data)
                client.set(req.userId,JSON.stringify(data))
                next()
                })
        }else{
            let data = {
                'count': 1,
                'startTime': moment().format('MMMM Do YYYY, h a')
              }
            client.set(req.userId,JSON.stringify(data))
            next()
        }
    })
}

// function checkHour(startTime){
//     if (startTime != moment().minute()){
//         return false
//     }
//     return true
// }

// function checkNumberOfRequests(countOfRequests){
    
// }