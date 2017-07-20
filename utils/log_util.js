var log4js = require("log4js");
var log_config = require("../config/log_config");
var fs = require("fs");
var _ = require("underscore");

log4js.configure(log_config);

var logUtil = {};

var errorLogger = log4js.getLogger("errorLogger");

var responseLogger = log4js.getLogger("responseLogger");

console.error("responseLogger=====" + JSON.stringify(responseLogger));
/**
 *  封装错误日志
 */
logUtil.logError = function(ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
}

/**
 * 封装响应日志
 */
logUtil.logResponse = function(ctx, resTime) {
    console.error("resTime=====" + resTime + "\n");
    console.error(JSON.stringify(ctx));
    if (ctx) {
        responseLogger.info(formatResponse(ctx, resTime));
    }
}

/**
 * 格式化响应日志
 * @param {*} ctx 
 * @param {*} resTime 
 */
var formatResponse = function(ctx, resTime) {
    var logText = new String();
    logText += "\n" + "**************** Response Log Start *****************" + "\n";
    logText += formatReqLog(ctx.request, resTime);
    logText += "response status: " + ctx.status + "\n";
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";
    logText += "***************** Response Log End ******************" + "\n";
    console.error("logText======" + logText);
    return logText;
}

/**
 * 格式化错误日志
 * @param {*} ctx 
 * @param {*} error 
 * @param {*} resTime 
 */
var formatError = function(ctx, error, resTime) {
    var logText = new String();

    logText += "\n" + "****************** Error Log Start ******************" + "\n";
    logText += formatReqLog(ctx.request, resTime);
    logText += "error name: " + error.name + "\n";
    logText += "error message: " + error.message + "\n";
    logText += "error stack" + error.stack + "\n";
    logText += "******************Error Log End ********************" + "\n";
    return logText;
}

/**
 * 格式化请求信息
 * @param {*} req 
 * @param {*} resTime 
 */
var formatReqLog = function(req, resTime) {
    var logText = new String();
    var method = req.method;
    logText += "request method: " + method + "\n";
    logText += "request originalUrl: " + req.originalUrl + "\n";
    logText += "request client IP: " + req.ip + "\n ";

    var startTime;
    if (method === "GET") {
        logText += "request query: " + JSON.stringify(req.query) + "\n";
    } else {
        logText += "request body: " + JSON.stringify(req.body) + "\n";
    }
    logText += "response time: " + resTime + "\n";
    return logText;
}
var createLogPath = function(path) {
    //判断路径是否存在否则创建目录
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
var initLogPath = function() {
    if (log_config.logBasePath) {
        createLogPath(log_config.logBasePath);
        _.each(log_config.appenders, function(appender) {
            createLogPath(appender.path);
        });
    }
}
initLogPath();
module.exports = logUtil;