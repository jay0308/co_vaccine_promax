const express = require('express');
const router = express.Router({mergeParams: true});
// const googleDriveService = require("../services/GoogleDrive");
const responseBaseClass = require("../BaseClasses/GenericResponse");
const postService = require("../services/PostService");

router.get("/",async function(req,res){
    try{
        let result = await postService.getPost(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.post("/create",async function(req,res){
    try{
        let result = await postService.createPost(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})

router.post("/like",async function(req,res){
    try{
        let result = await postService.likePost(req,res);
        let gr = new responseBaseClass.GenericResponse(`${result.status ? "success" : "error"}`,result.res);
        res.send(gr.response())
    }
    catch(err){
        let gr = new responseBaseClass.GenericResponse("error",err.toString())
        res.send(gr.response())
    }
})


module.exports = router;