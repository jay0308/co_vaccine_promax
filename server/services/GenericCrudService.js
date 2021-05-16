const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const dbVars = require("../loaders/dbInitializer").dbVars;
const utility = require("../utils/utility");
const {ObjectId} = require('mongodb');
const _Date = utility.momentDate();

class GenericCrudService{
    constructor(collectionName){
        this.collectionName = collectionName;
    }

    insert = async (req, res) => {
        try {
            let allRoutes = req.body;
            allRoutes.createDate = new _Date();
            allRoutes.updateDate = new _Date();
            const mongoDb = dbVars.db;
            let result = await mongoDb.collection(this.collectionName).insertOne(allRoutes);
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

    insertMany = async (req, res) => {
        try {
            let allRoutes = req.body;
            allRoutes = allRoutes.map((e)=>{
                e.createDate = new _Date();
                e.updateDate = new _Date();
                return e
            })
            const mongoDb = dbVars.db;
            let result = await mongoDb.collection(this.collectionName).insertMany(allRoutes);
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
    
    get = async (req, res) => {
        try {
            let busId = req.params.id ? ObjectId(req.params.id) : null;
            const mongoDb = dbVars.db;
            let result = busId ? await mongoDb.collection(this.collectionName).find({_id:busId}).project({ createDate: 0, updateDate: 0}).toArray()
            : await mongoDb.collection(this.collectionName).find({}).project({ createDate: 0, updateDate: 0}).toArray()
            // console.log("User List", result)
            let sr = new ServiceResponse(true, { [`${this.collectionName}List`]: result });
            return sr.getServiceResponse();
        } catch (err) {
            console.log("Err", err);
            let sr = new ServiceResponse(false, err.toString());
            return sr.getServiceResponse();
        }
    }
    
    delete = async (req, res) => {
        try {
            if(!req.params.id){
                let sr = new ServiceResponse(false, appConstants.FIELD_PARAM_MISSING);
                return sr.getServiceResponse();
            }
    
            let routeId = ObjectId(req.params.id);
            const mongoDb = dbVars.db;
            let result = await mongoDb.collection(this.collectionName).deleteOne({ _id: routeId });
            let sr = new ServiceResponse(true, appConstants.RECORD_DELETED);
            return sr.getServiceResponse();
        } catch (err) {
            console.log("Err", err);
            let sr = new ServiceResponse(false, err.toString());
            return sr.getServiceResponse();
        }
    }

    edit = async (req, res) => {
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
            let result = await mongoDb.collection(this.collectionName).findOneAndUpdate({ _id: busId }, { $set: createBusObj });
            let sr = new ServiceResponse(true, appConstants.RECORD_UPDATED);
            return sr.getServiceResponse();
        } catch (err) {
            console.log("Err", err);
            let sr = new ServiceResponse(false, err.toString());
            return sr.getServiceResponse();
        }
    }

}

module.exports = {
    GenericCrudService:GenericCrudService
}