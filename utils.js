export const getMongoURL = (host, dbName, user, password) => {
    let mongourl = "mongodb://"
    if(user!=''){
        mongourl+=user+":"+password+"@" // create url with un/pwd
    }
    mongourl+=host
    mongourl+="/"+dbName
    return mongourl
}