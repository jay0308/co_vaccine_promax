 
const express = require('express');
const router = express.Router({mergeParams: true});
const userController = require("./userController");
const postController = require("./postController");
const TokenValidator = require("../utils/validateTokenMiddleware");
const UtilController = require("../controllers/UtilController");
const busController = require("./BusController");
const bookingController = require("./BookingController");

router.use("/v3",TokenValidator.validate)

router.use("/user",userController);

router.use("/util",UtilController);

router.use("/post",TokenValidator.validate,postController);

router.use("/bus",TokenValidator.validate,busController);

router.use("/booking",TokenValidator.validate,bookingController);



router.get('/', function (req, res) {
    res.send({ "welcome": "It's running" });
});

router.get('/v3/', function (req, res) {
    res.send({ "welcome": "It's authorized running" });
});

router.get('/sendSms', function (req, res) {
    let result = require("../services/SMSService").sendSms("8383881390","Hello buddy","busDetailTemplate");
    res.send({ "message":result ? "SMS Sent" : "Not sent" });
});

module.exports = router;