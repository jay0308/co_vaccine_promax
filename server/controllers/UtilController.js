const express = require('express');
const router = express.Router({mergeParams: true});
// const googleDriveService = require("../services/GoogleDrive");
const responseBaseClass = require("../BaseClasses/GenericResponse");
const utilService = require("../services/UtilityService");
const bookingService = require("../services/BookingService");

router.get("/playerStyles",async function(req,res){
    try{
        let result = await utilService.getPlayerStyles(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})


router.post("/postPayment/:bookingId",async function(req,res){
    try{
        let result = await bookingService.razorpayResponse(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

module.exports = router;