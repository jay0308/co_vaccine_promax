const express = require('express');
const router = express.Router({mergeParams: true});
const app = express();
const coVaccineService = require("../services/coVaccineService");
const responseBaseClass = require("../BaseClasses/GenericResponse");

router.post("/userScope",async function(req,res){
    try{
        let result = await coVaccineService.userScope(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

module.exports = router;