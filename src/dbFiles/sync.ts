import sequelize from "./db";
import '../models'

async function sync(){
    await sequelize.sync({ alter : true })
    .then(() => console.log("Successfully Synced DB"))
    .catch(err => console.error('DB Syncing Failed:', err));
}

sync();

