const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const appDataDirPath = getAppDataPath();
const adapter = new FileSync(path.join(appDataDirPath, 'crash_test_db.json'));
const database = low(adapter);

function getAppDataPath() {
    switch (process.platform) {
        case "darwin": {
            return path.join(process.env.HOME, "Library", "Application\ Support", "CrashTest");
        }
        case "win32": {
            return path.join(process.env.APPDATA, "CrashTest");
        }
        case "linux": {
            return path.join(process.env.HOME, ".CrashTest");
        }
        default: {
            console.log("Unsupported platform!");
            process.exit(1);
        }
    }
}

// Set some defaults (required if your JSON file is empty)
async function createDefaultDatabase() {
    await database.defaults({
        "tests": [
            {
                "name": "default",
                "created_at": new Date().getTime(),
                "body": { }
            }
        ]
    }).write();
}

async function getDataFromDatabase() {
    const databaseData = await database.read().value();

    if (Object.keys(databaseData).length > 0) {
        return databaseData;
    } else {
        await createDefaultDatabase();
        return await database.read().value();
    }

}

// Export database's methods
module.exports = {
    createDefaultDatabase,
    getDataFromDatabase
};
