const express = require('express');
const router = express.Router({mergeParams: true});
// const googleDriveService = require("../services/GoogleDrive");
const responseBaseClass = require("../BaseClasses/GenericResponse");
const busService = require("../services/BusService");
const genericCrudService = require("../services/GenericCrudService");





router.post("/create",async function(req,res){
    try{
        let result = await busService.createBus(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.post("/edit",async function(req,res){
    try{
        let result = await busService.editBus(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.get("/delete/:id",async function(req,res){
    try{
        let result = await busService.deleteBus(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.post("/routes/add",async function(req,res){
    try{
        let result = await busService.addRoutes(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.post("/routes/edit",async function(req,res){
    try{
        let result = await busService.editRoutes(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.get("/routes",async function(req,res){
    try{
        let result = await busService.getRoutes(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.get("/routes/delete/:id",async function(req,res){
    try{
        let result = await busService.deleteRoutes(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})


// bus type routes
router.post("/types/add",async function(req,res){
    try{
        let crudService = new genericCrudService.GenericCrudService("busType");
        let result = await crudService.insert(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.post("/types/add/all",async function(req,res){
    try{
        let crudService = new genericCrudService.GenericCrudService("busType");
        let result = await crudService.insertMany(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.get("/types/delete/:id",async function(req,res){
    try{
        let crudService = new genericCrudService.GenericCrudService("busType");
        let result = await crudService.delete(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.post("/types/edit",async function(req,res){
    try{
        let crudService = new genericCrudService.GenericCrudService("busType");
        let result = await crudService.edit(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.get("/types/:id",async function(req,res){
    try{
        let crudService = new genericCrudService.GenericCrudService("busType");
        let result = await crudService.get(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.get("/types",async function(req,res){
    try{
        let crudService = new genericCrudService.GenericCrudService("busType");
        let result = await crudService.get(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})
// end of bus type routes

router.get("/search",async function(req,res){
    try{
        let result = await busService.search(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.get("/",async function(req,res){
    try{
        let result = await busService.getBus(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})


router.get("/:id",async function(req,res){
    try{
        let result = await busService.getBus(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

module.exports = router;