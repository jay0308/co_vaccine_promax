const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
const path = require('path');
let _auth = null;
let driveSmartCricketId = "11Z_nh8fGUdZIysh-xdt1Wb6hELQSRAzu";
const dbVars = require("../loaders/dbInitializer").dbVars;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, '../utils/token.json')

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    _auth = oAuth2Client;

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });
    await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                if (file.name === "SmartCricket") {
                    driveSmartCricketId = file.id;
                }
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    });
}

async function getDriveFiles(req, res) {
    // Load client secrets from a local file.
    fs.readFile(path.join(__dirname, '../utils/gDriveCredentials.json'), (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), listFiles);
    });
    let sr = new ServiceResponse(true, appConstants.USER_NOT_VALIDATED);
    return sr.getServiceResponse();
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
 function fileUploader(auth, dataObj) {
    return new Promise(async (resolve, reject) => {
        if (!dataObj) {
            let sr = new ServiceResponse(false, appConstants.IMAGE_NOT_UPLOADED_TO_DRIVE);
            resolve(sr.getServiceResponse());
        }
        const drive = google.drive({ version: 'v3', auth });
        // await listFiles(auth);
        let parentIds = [];
        parentIds.push(driveSmartCricketId);
        console.log("IIIIIDD", driveSmartCricketId)
        var fileMetadata = {
            'name': dataObj.fileName || 'photo.jpg',
            'parents': parentIds
        };
        var media = {
            mimeType: 'image/png',
            body: fs.createReadStream(path.join(__dirname, "../temp/" + dataObj.fileName))
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name, mimeType, webViewLink, webContentLink, iconLink, size, originalFilename'
        }, async function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
                let sr = new ServiceResponse(false, appConstants.IMAGE_NOT_UPLOADED_TO_DRIVE);
                resolve(sr.getServiceResponse());
            } else {
                const mongoDb = dbVars.db;
                console.log('File Id: ', file.data.id);
                let latest = await mongoDb.collection("posts").find({ _id: dataObj.postId }).toArray();
                if (latest && latest.length > 0) {
                    let imgArr = latest[0].images;
                    imgArr.push(`https://drive.google.com/uc?export=view&amp;id=${file.data.id}`)
                    let postData = {
                        postComment: dataObj.postComment,
                        images:imgArr    
                    }
                    let updated = await mongoDb.collection("posts").findOneAndUpdate({ _id: dataObj.postId }, { $set: postData });
                    let sr = new ServiceResponse(true, appConstants.IMAGE_UPLOADED_TO_DRIVE);
                    resolve(sr.getServiceResponse());
                }
                let sr = new ServiceResponse(false, appConstants.IMAGE_NOT_UPLOADED_TO_DRIVE);
                resolve(sr.getServiceResponse());
            }
        });

    })
}

async function uploadFilesToDrive(req, res, dataObj) {
    console.log("uploadFilesToDrive",dataObj)
    if (_auth) {
        let uploadRes = await fileUploader(_auth, dataObj);
        console.log("promise",uploadRes)
        return uploadRes;
    } else {
        // Load client secrets from a local file.
        fs.readFile(path.join(__dirname, '../utils/gDriveCredentials.json'), (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            authorize(JSON.parse(content), fileUploader);
        });
    }
    // let sr = new ServiceResponse(true, appConstants.USER_NOT_VALIDATED);
    // return sr.getServiceResponse();
}

// <img src="https://drive.google.com/uc?export=view&amp;id=162m9C-PIyPS7zh9Uy9G4xaxD7fbpOotf">

module.exports = {
    getDriveFiles: getDriveFiles,
    uploadFilesToDrive: uploadFilesToDrive
}