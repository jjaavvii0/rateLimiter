import {client, redlock} from "../databases/redis.db"
import {dataCreator} from "../helpers/limitsHelper" 
const moment = require('moment')
const requestIp = require('request-ip');


export const checkLimit = (typeOfLimit) => {
    return async (req, res, next) =>{
        try{
            const nameOfRedisField =  typeOfLimit=="TOKEN" ? req.userId : requestIp.getClientIp(req);
            client.get(nameOfRedisField,async (err,reply) => {
                if(err) {
                    console.log("Redis not working...")
                    system.exit(0)
                }
                let data = JSON.parse(reply)
                await redlock.using(nameOfRedisField, 1000, async (signal) => {
                    if (signal.aborted) {
                        throw signal.error;
                    }
                    const newData = dataCreator(data, typeOfLimit)
                    if (newData.limitError){
                        return res.status(429).json({
                            "error": 1, 
                            "message": "Limit by " + typeOfLimit + " reached, wait till '" 
                                        + moment().add(1, 'hours').format('MMMM Do YYYY, ha') + "' to make a new request."})
                    }

                    await client.set(nameOfRedisField, JSON.stringify(newData))
                    next();
                });
            })
        }catch(e){
            res.status(404).json(e);
        }
    }
}