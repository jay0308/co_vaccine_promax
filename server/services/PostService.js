const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const dbVars = require("../loaders/dbInitializer").dbVars;
const multer = require('multer');
const path = require('path');
const googleDrive = require("./GoogleDrive");
const {ObjectId} = require('mongodb');
const utility = require("../utils/utility");
const _Date = utility.momentDate();


const uploadPromise = (req, res) => {
    console.log("Upload", req.body);
    let postId = req.body.postId;
    let uploadFiles = req.body.uploadFiles;
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, "../temp"));
        },
        filename: function (req, file, callback) {
            let fileName = postId + '-' + Date.now() + ".jpg";
            // let arr = req.body.uploadFiles;
            uploadFiles.push(fileName)
            // req.body.uploadFiles = arr;
            callback(null, fileName);
        }
    });
    var upload = multer({ storage: storage }).array('postImages', 5);
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
            if (err) {
                console.log("Upload Err", err)
                resolve({ status: true, postComment: req.body.postComment, postId, uploadFiles });
            }
            resolve({ status: true, postComment: req.body.postComment, postId, uploadFiles })
        });
    })
}

const driveImageWrapper = async (req, res, postObj) => {
    console.log("driveImageWrapper", postObj)
    return new Promise(async (resolve, reject) => {
        let driveRes = await googleDrive.uploadFilesToDrive(req, res, postObj);
        if (driveRes.status) {
            resolve(driveRes)
        } else {
            reject(driveRes)
        }
    })
}

const createPost = async (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['auth'];
    const mongoDb = dbVars.db;
    if (token) {
        let result = await mongoDb.collection("users").find({ token: token }).toArray();
        if (result && result.length > 0) {
            let createPostObj = {
                userId: result[0]._id,
                postComment: null,
                images: [],
                likers: [],
                createDate: new _Date(),
                updateDate: new _Date()
            }
            let insertRes = await mongoDb.collection("posts").insertOne(createPostObj);
            if (insertRes && insertRes.insertedCount > 0) {
                req.body.postId = insertRes.ops[0]._id;
                req.body.uploadFiles = [];
                let uploadRes = await uploadPromise(req, res);
                if (uploadRes.status) {
                    let imgWrapper = [];
                    uploadRes.uploadFiles &&
                        uploadRes.uploadFiles.map((ele) => {
                            let obj = {
                                postId: uploadRes.postId,
                                postComment: uploadRes.postComment,
                                fileName: ele
                            }
                            imgWrapper.push(driveImageWrapper(req, res, obj))
                        })
                    if (uploadRes.uploadFiles && uploadRes.uploadFiles.length > 0) {
                        let imgDriveRes = await Promise.all(imgWrapper);
                        let sr = new ServiceResponse(true, appConstants.POST_CREATED);
                        return sr.getServiceResponse();

                    } else {
                        let postData = {
                            postComment: uploadRes.postComment
                        }
                        let updated = await mongoDb.collection("posts").findOneAndUpdate({ _id: uploadRes.postId }, { $set: postData });
                        let sr = new ServiceResponse(true, appConstants.POST_CREATED);
                        return sr.getServiceResponse();
                    }

                }
                let sr = new ServiceResponse(false, appConstants.POST_NOT_CREATED);
                return sr.getServiceResponse();
            }
            let sr = new ServiceResponse(false, appConstants.POST_NOT_CREATED);
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

const getPost = async (req, res) => {
    try {
        const mongoDb = dbVars.db;
        let latest = await mongoDb.collection("posts").aggregate([
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $project: {
                    postComment: 1,
                    images: 1,
                    updateDate: 1,
                    likers:1,
                    // email:1,
                    // dont include password here
                    //list all fields u need here
                    //now Probably show only "vehicles_name" from mapping.
                    "userDetails.name": 1 //if need full mapping then mapping:1
                }
            }
        ]).sort({ "updateDate": -1 }).toArray()
        // let latest = await mongoDb.collection("posts").find().sort({ "updateDate": -1 }).toArray();
        if (latest) {
            let sr = new ServiceResponse(true, latest);
            return sr.getServiceResponse();
        }
        let sr = new ServiceResponse(false, null);
        return sr.getServiceResponse();
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString);
        return sr.getServiceResponse();
    }
}

const likePost = async (req, res) => {
    try {
        let token = req.headers['x-access-token'] || req.headers['auth'];
        const mongoDb = dbVars.db;
        if (token) {
            let result = await mongoDb.collection("users").find({ token: token }).toArray();
            if (result && result.length > 0) {
                let postId = ObjectId(req.body.postId);
                let latest = await mongoDb.collection("posts").find({ _id: postId }).toArray();
                console.log("postid",postId,latest)
                if (latest && latest.length > 0) {
                    let likeArr = latest[0].likers;
                    likeArr.push(result[0]._id)
                    let postData = {
                        likers: likeArr,
                    }
                    let updated = await mongoDb.collection("posts").findOneAndUpdate({ _id: postId }, { $set: postData });
                    let sr = new ServiceResponse(true, appConstants.POST_LIKED);
                    return sr.getServiceResponse();
                }else{
                    let sr = new ServiceResponse(false, appConstants.POST_NOT_FOUND);
                    return sr.getServiceResponse();
                }

            } else {
                let sr = new ServiceResponse(false, appConstants.NOT_VALID_TOKEN);
                return sr.getServiceResponse();
            }
        } else {
            let sr = new ServiceResponse(false, appConstants.TOKEN_MISSING);
            return sr.getServiceResponse();
        }
    } catch (err) {
        console.log("Err", err);
        let sr = new ServiceResponse(false, err.toString);
        return sr.getServiceResponse();
    }
}

module.exports = {
    createPost: createPost,
    getPost: getPost,
    likePost:likePost
}

