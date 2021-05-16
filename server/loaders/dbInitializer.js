

const {MongoClient} = require('mongodb');
let client;
const dbVars = {

}

async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb://${process.env.DB_URL}/${process.env.DB}?retryWrites=true&w=majority`;
 

    client = new MongoClient(uri);
    dbVars.client = client
 
    try {
        // Connect to the MongoDB cluster
        let mongoConnect = await client.connect();
        dbVars.db = mongoConnect.db(`${process.env.DB}`);
        // Make the appropriate DB calls
        await  listDatabases(client);
        return client;
 
    } catch (e) {
        console.error(e);
    } 
    // finally {
    //     await client.close();
    // }
}

module.exports = {
    initialize:main,
    dbVars:dbVars
}