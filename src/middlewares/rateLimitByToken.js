import {client, redlock} from "../databases/redis.db"
import {dataCreator} from "../helpers/limitsHelper" 
const moment = require('moment')

export const checkLimit = async (req, res, next) =>{
    client.get(req.userId,async (err,reply) => {
        if(err) {
            console.log("Redis not working...")
            system.exit(0)
        }
        let data = JSON.parse(reply)
        await redlock.using(req.userId, 2000, async (signal) => {
            const newData = dataCreator(data, 0)
            if (newData.limitError){
                return res.status(429).json({
                    "error": 1, 
                    "message": "Limit reached, wait till '" + moment().add(1, 'hours').format('MMMM Do YYYY, ha') + "' to make a new request."})
            }

            await client.set(req.userId, JSON.stringify(newData))
            next();
        });
    })
}