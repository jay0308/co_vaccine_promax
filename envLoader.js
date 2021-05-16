var fs = require('fs');
let envString = process.env.NODE_ENV;
let envJson = require(`./src/utils/${envString}.json`);

function generateContent(){
    let str = "";
    for (const key in envJson) {
       str += `${key} = ${envJson[key]}`
       str += '\n';
    }

    return str;

}

fs.writeFile('.env', generateContent(), function (err) {
    if (err){
        console.log("ERROR: Can't able to read environment file, please check "+process.env.NODE_ENV+".json file exist")
        throw err;
    }
    console.log(".env file successfully generated!")
});