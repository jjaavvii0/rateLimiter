import {client, redlock} from "../databases/redis.db"
import {dataCreator} from "../helpers/limitsHelper" 
import moment from 'moment'
import requestIp from 'request-ip'


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
                        const limitByType = typeOfLimit=="TOKEN" ? process.env.RATE_LIMIT_BY_TOKEN : process.env.RATE_LIMIT_BY_IP;
                        return res.status(429).json({
                            "error": 1, 
                            "message": `Limit by ${typeOfLimit} reached: ${limitByType} requests per hour. Wait till '${moment().add(1, 'hours').format('MMMM Do YYYY ha')}' to make a new request`
                            })
                    }

                    await client.set(nameOfRedisField, JSON.stringify(newData))
                    next();
                });
            })
        }catch(e){
            return res.status(404).json(e);
        }
    }
}