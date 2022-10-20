import {client, redlock} from "../databases/redis.db"
import {dataCreator} from "../helpers/limitsHelper" 
const moment = require('moment')
const requestIp = require('request-ip');


export const checkLimit = async (req, res, next) =>{
    req.requestIp = requestIp.getClientIp(req); 
    console.log(req.requestIp)
    client.get(req.requestIp,async (err,reply) => {
        if(err) {
            console.log("Redis not working...")
            system.exit(0)
        }
        let data = JSON.parse(reply)
        await redlock.using(req.requestIp, 2000, async (signal) => {
            const newData = dataCreator(data, 1)
            if (newData.limitError){
                return res.status(429).json({
                    "error": 1, 
                    "message": "Limit reached, wait till '" + moment().add(1, 'hours').format('MMMM Do YYYY, ha') + "' to make a new request."})
            }

            await client.set(req.requestIp, JSON.stringify(newData))
            next();
        });
    })
}