const cron = require('node-cron');
const express = require('express');
const app = express()
require('dotenv').config();
const port = process.env.CRON1_PORT || 8080;
const statesMapping = require("../utils/statesMapping.json");
const properties = require("../utils/properties.json");
const appConstants = require("../utils/constants");
const request = require("request");
const bodyParser = require('body-parser');
const moment = require("moment");
const { DateRange } = require('@material-ui/icons');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


cron.schedule('0-59/5 * * * * *', async function () {
    console.log('---------------------');
    console.log('Running Update Centers Cron Job');
    let districs = await getDistricts();
    let centerList = await getCenters(districs)
    console.log(centerList)
});

const getDistricts = async () => {
    let states = properties.states;
    let districtList = {};
    for (let i = 0; i < states.length; i++) {

        const element = states[i];
        let stateId = statesMapping.states.filter((ele) => {
            if (ele.state_name === element) {
                return ele
            }
        })
        try{
            let disRes = await getDistrictsCall(stateId[0].state_id)
            list = JSON.parse(disRes.body)
            list = list.districts;
            districtList[element] = list
            // districtList = [...districtList, ...list]

        }catch(e){
            console.log("Error",e)
        }
    }
    return districtList

}

const getDistrictsCall = async (id) => {
    return new Promise((resolve, reject) => {
        request(appConstants.APIS.getDistricts(id), function (error, response, body) {
            if(error || response.statusCode !== 200){
                reject("Status is not 200")
            }
            resolve(response)
        });
    })
}

const getCenters = async (districtIds) => {
    let centerList = {};
    for (let k = 0; k < Object.keys(districtIds).length; k++) {
        const e = Object.keys(districtIds)[k];
        centerList[e] = [];
        for (let j = 0; j < districtIds[e].length; j++) {
            const dist = districtIds[e][j];
            for (let i = 0; i < 15; i++) {
                let date = moment.tz("Asia/Kolkata").add('days',i).format("DD-MM-YYYY");
                try{
                    let centerRes = await getCentersCall(dist.district_id,date);
                    console.log("<<<<",centerRes)
                    centerList[e].push(centerRes);

                }catch(e){
                    console.log("ERROR",e)
                }
            }
        }
    }
    return centerList
}

const getCentersCall = async (districtId,date) => {
    return new Promise((resolve, reject) => {
        request(appConstants.APIS.getCentersByDisctric(districtId,date), function (error, response, body) {
            if(error || response.statusCode !== 200){
                reject(error)
            }
            resolve(body)
        });
    })
}



app.listen(port, () => console.log(`Update Centers Cron on port ${port}!`))