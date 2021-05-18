// const redis = require("redis");
// const client = redis.createClient();

// client.on("error", function (error) {
//     console.error("\x1b[31m", "Error in connecting to redis server");
//     console.log(error)
//     console.log("\x1b[0m")
// });

// client.on("connect", function (connect) {
//     console.error("\x1b[32m", 'Connected to redis server successfully');
//     console.log("\x1b[0m")
// });

// const set = (key, value) => {
//     return new Promise((resolve, reject) => {
//         client.set(key, JSON.stringify(value), function (err, reply) {
//             if (err)
//                 reject(err)
//             resolve(reply)
//         })
//     })
// }

// const get = (key) => {
//     return new Promise((resolve, reject) => {
//         client.get(key, function (err, reply) {
//             if (err)
//                 reject(err)

//             let result;
//             try {
//                 result = JSON.parse(reply);
//             } catch (e) {
//                 result = "";
//             }
//             resolve(result)
//         })
//     })
// }



// module.exports = {
//     redisClient: client,
//     set,
//     get
// }