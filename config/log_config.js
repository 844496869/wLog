var path = require("path");
//通过path.join(__dirname,'/')方法获取项目根目录
var logBasePath = path.resolve(path.join(__dirname, "/") + "../logs");
var errorPath = "/error";
var errorFileName = "error";
var errorLogPath = logBasePath + errorPath + "/" + errorFileName;

var responsePath = "/response";
var responseFileName = "response";
var responseLogPath = logBasePath + responsePath + "/" + responseFileName;

module.exports = {
    appenders: {
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "alwaysIncludePattern": true,
            "pattern": "-yyy-MM-dd.log",
            "level": 'error',
            "path": errorPath
        },
        "responseLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern": true,
            "pattern": '-yyyy-MM-dd.log',
            "level": "debug",
            "path": responsePath
        }
    },
    "categories": {
        "default": {
            "appenders": ["errorLogger", "responseLogger"],
            "level": "trace"
        }
    }
};