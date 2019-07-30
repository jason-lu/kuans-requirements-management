'use strict'
const {commonConfigs,productionConfig,devConfig} = require("./configs");
function getConfig(type){
    let finalConfig;
    finalConfig = type === "prod"? {...commonConfigs, ...productionConfig}: {...commonConfigs, ...devConfig}
    finalConfig.dbConfig.finalUrl = `mongodb://${finalConfig.dbConfig.url}${finalConfig.dbConfig.db}`
    return finalConfig
    
}

module.exports = {
    getConfig
}