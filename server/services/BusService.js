const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const dbVars = require("../loaders/dbInitializer").dbVars;
const utility = require("../utils/utility");
const {ObjectId} = require('mongodb');
const _Date = utility.momentDate();
// const redisClient = require("../loaders/redisInitializer");


// const updateBusesInRedis = async () => {
//     try {
//         const mongoDb = dbVars.db;
//         let result =  await mongoDb.collection("busDetails").find({}).toArray()
//         // console.log("User List", result)
//         let res = await redisClient.set("busesList",result)
//         console.log("UDSSD",res)
//     } catch (err) {
//         console.log("Err", err);
//     }
// }

const createBus = async (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['auth'];
    const mongoDb = dbVars.db;
    if (token) {
        let result = await mongoDb.collection("users").find({ token: token }).toArray();
        if (result && result.length > 0) {
            let validateFields = [
                {
                    fieldName: "busNo",
                    value: req.body.busNo,
                    validate: ["notNull"]
                },
                {
                    fieldName: "fairPrice",
                    value: req.body.fairPrice,
                    validate: ["notNull"]
                }
            ]
            if (!utility.validateFields(validateFields)) {
                let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
                return sr.getServiceResponse();
            }
            let createBusObj = {
                userId: result[0]._id,
                createDate: new _Date(),
                updateDate: new _Date()
            }
            createBusObj = { ...req.body, ...createBusObj }
            let insertRes = await mongoDb.collection("busDetails").insertOne(createBusObj);
            if (insertRes && insertRes.insertedCount > 0) {
                // updateBusesInRedis()
                let sr = new ServiceResponse(true, appConstants.BUS_CREATED);
                return sr.getServiceResponse();
            }
            let sr = new ServiceResponse(false, appConstants.BUS_NOT_CREATED);
            return sr.getServiceResponse();

        } else {
            let sr = new ServiceResponse(false, appConstants.NOT_VALID_TOKEN);
            return sr.getServiceResponse();
        }
    } else {
        let sr = new ServiceResponse(false, appConstants.TOKEN_MISSING);
        return sr.getServiceResponse();
    }
}

const getBus = async (req, res) => {
    try {
        let busId = req.params.id ? ObjectId(req.params.id) : null;
        const mongoDb = dbVars.db;
        let result = busId ? await mongoDb.collection("busDetails").find({_id:busId}).project({ createDate: 0, updateDate: 0, userId: 0 }).toArray()
        : await mongoDb.collection("busDetails").find({}).project({createDate: 0, updateDate: 0, userId: 0}).toArray()
        // console.log("User List", result)
        let sr = new ServiceResponse(true, { busList: result });
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const editBus = async (req, res) => {
    try {
        if(!req.body._id){
            let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
            return sr.getServiceResponse();
        }

        let busId = ObjectId(req.body._id);
        let createBusObj = {
            updateDate: new _Date()
        }
        createBusObj = { ...req.body, ...createBusObj }
        delete createBusObj._id;
        const mongoDb = dbVars.db;
        let result = await mongoDb.collection("busDetails").findOneAndUpdate({ _id: busId }, { $set: createBusObj });
        // updateBusesInRedis();
        let sr = new ServiceResponse(true, appConstants.BUS_UPDATED);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const deleteBus = async (req, res) => {
    try {
        if(!req.params.id){
            let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
            return sr.getServiceResponse();
        }

        let busId = ObjectId(req.params.id);
        const mongoDb = dbVars.db;
        let result = await mongoDb.collection("busDetails").deleteOne({ _id: busId });
        // updateBusesInRedis()
        let sr = new ServiceResponse(true, appConstants.BUS_DELETED);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}


const addRoutes = async (req, res) => {
    try {
        let allRoutes = req.body;
        const mongoDb = dbVars.db;
        let result = await mongoDb.collection("busRoutes").insertMany(allRoutes);
        if(result && result.insertedCount > 0){
            let sr = new ServiceResponse(true, appConstants.RECORD_SAVED);
            return sr.getServiceResponse();
        }
        let sr = new ServiceResponse(false, appConstants.RECORD_NOT_SAVED);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const getRoutes = async (req, res) => {
    try {
        const mongoDb = dbVars.db;
        let result = await mongoDb.collection("busRoutes").find({}).collation({ locale: "en" }).sort({ "routeName": 1 }).toArray();
        // console.log(result)
        let sr = new ServiceResponse(true, {routes:result});
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const editRoutes = async (req, res) => {
    try {
        if(!req.body._id){
            let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
            return sr.getServiceResponse();
        }

        let routeId = ObjectId(req.body._id);
        let createBusObj = {
            updateDate: new _Date()
        }
        createBusObj = { ...req.body, ...createBusObj }
        delete createBusObj._id;
        const mongoDb = dbVars.db;
        let result = await mongoDb.collection("busRoutes").findOneAndUpdate({ _id: routeId }, { $set: createBusObj });
        // updateBusesInRedis();
        let sr = new ServiceResponse(true, appConstants.RECORD_UPDATED);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const deleteRoutes = async (req, res) => {
    try {
        if(!req.params.id){
            let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
            return sr.getServiceResponse();
        }

        let routeId = ObjectId(req.params.id);
        const mongoDb = dbVars.db;
        let result = await mongoDb.collection("busRoutes").deleteOne({ _id: routeId });
        let sr = new ServiceResponse(true, appConstants.RECORD_DELETED);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const search = async (req, res) => {
    try {
        let sourceId = req.query.sId;
        let destId = req.query.dId;
        let journeyDate = req.query.date;
        if(!sourceId || !destId || !journeyDate){
            let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
            return sr.getServiceResponse();
        }
        // let redisRes =  await redisClient.get("busesList");
        // if(!redisRes){
        //     console.log("update Redis")
        //     // updateBusesInRedis();
        //     const mongoDb = dbVars.db;
        //     redisRes = await mongoDb.collection("busDetails").find({}).toArray()
        // }
        const mongoDb = dbVars.db;
        let busRes = await mongoDb.collection("busDetails").find({}).toArray()
        let sr = new ServiceResponse(true, getSearchResult(busRes,sourceId,destId,journeyDate));
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString());
        return sr.getServiceResponse();
    }
}

const checkIfDateExistsInList = (dateList,date) => {
    if(dateList && dateList.length > 0){
        for (let i = 0; i < dateList.length; i++) {
            const element = dateList[i];
            if(utility.compareDates(new Date(element),new Date(date)) === 0){
                return true;
            }
            
        }
    }
    return false;
}
const getSearchResult = (busesList,sourceId,destId,journeyDate) => {
    let result = []
    busesList && busesList.map((e)=>{
        let src = -1 , dest = -1, _rSrc = -1,_rDest = -1;
        if(e.runningDays === "daily" || (e.runningDays === "odd" && new Date(journeyDate).getDate() % 2 === 1 ) || (e.runningDays === "even" && new Date(journeyDate).getDate() % 2 === 0 ) || checkIfDateExistsInList(e.journeyDates,journeyDate)){
            for (let index = 0; index < e.routes.up.length; index++) {
                const element = e.routes.up[index];
                if(!checkValidTimeofBus(element.time,journeyDate)){
                    break;
                }
                if(element.routeId === sourceId){                    
                    src = index
                }
    
                if(element.routeId === destId){
                    dest = index
                }
                
            }
            for (let index = 0; index < e.routes.down.length; index++) {
                const element = e.routes.down[index];
                if(!checkValidTimeofBus(element.time,journeyDate)){
                    break;
                }
                if(element.routeId === sourceId){
                    _rSrc = index
                }
    
                if(element.routeId === destId){
                    _rDest = index
                }
                
            }
            if(src > -1 && dest > -1 && src < dest ){
                let obj = {...e} /*{
                    busName:e.busName,
                    busNo:e.busNo,
                    busType:e.busType,
                    fairPrice:e.fairPrice,
                    source:e.routes.up[src],
                    destination:e.routes.up[dest],
                    _id:e._id
                }*/
                obj.source = e.routes.up[src];
                obj.destination = e.routes.up[dest];
                result.push(obj)
            }
            if(_rSrc > -1 && _rDest > -1 && _rSrc < _rDest ){
                let obj = {...e} /*{
                    busName:e.busName,
                    busNo:e.busNo,
                    busType:e.busType,
                    fairPrice:e.fairPrice,
                    source:e.routes.down[_rSrc],
                    destination:e.routes.down[_rDest],
                    _id:e._id
                }*/
                obj.source = e.routes.down[_rSrc];
                obj.destination = e.routes.down[_rDest];
                result.push(obj)
            }
        }
        
    })

    return result
}

const checkValidTimeofBus = (time,journeyDate) => {
    // console.log("Time Check",new _Date().getHours(),new _Date(time).getHours(),new _Date(time))
    if(utility.compareDates(new _Date(journeyDate),new _Date()) === 0 && new _Date().getHours() >= new _Date(time).getHours()){
        return false;
    }
    return true;
}
module.exports = {
    createBus: createBus,
    getBus: getBus,
    editBus:editBus,
    deleteBus:deleteBus,
    addRoutes:addRoutes,
    getRoutes:getRoutes,
    editRoutes:editRoutes,
    deleteRoutes:deleteRoutes,
    search:search
}

