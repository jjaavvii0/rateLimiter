const requestIp = require('request-ip');

export const getIpOfRequest = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req); 
    console.log(clientIp)
    next();
};