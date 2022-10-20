import {client, redlock} from "../databases/redis.db"
import {actualDateEqualStoragedDate, isLimitReached} from "../helpers/dateComparer" 
const moment = require('moment')

export const checkLimit = async (req, res, next) =>{
    client.exists(req.userId,(err,reply) => {
        if(err) {
            console.log("Redis not working...")
            system.exit(0)
        }
        // if(reply != 1)
        if(reply === 1) {
            client.get(req.userId,async (err,reply) => {
                let data = JSON.parse(reply)
                //BLOQUEO DEL RECURSO
                await redlock.using(req.userId, 2000, async (signal) => {
                    if (actualDateEqualStoragedDate(data.startTime)){
                        data.startTime = moment().format('MMMM Do YYYY, h a');
                        data.count = 1;
                    }
                    if(isLimitReached(data.count, 0)){
                        data.count++;
                        return res.status(429).json({
                            "error": 1, 
                            "message": "Limit reached, wait till '" + moment().add(1, 'hours').format('MMMM Do YYYY, ha') + "' to make a new request."
                        })
                    }else{
                        data.count++
                    }
                    await client.set(req.userId, JSON.stringify(data))
                    next();
                    if (signal.aborted) {
                      throw signal.error;
                    }

                });
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