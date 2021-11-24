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

async function createTest(name) {

    // Get all connections from the app storage
    const tests = await database
        .get('tests')
        .value();

    function randomAlphaNumeric () {
        return Math.random().toString(36).charAt(2);
    };
    
    function idRandomPattern (pattern) {
        pattern = pattern.split('');
        return pattern.map(x => x.replace('x', randomAlphaNumeric())).join('');
    };
    
    // Remove one of them by name
    tests.push({
        id: idRandomPattern('xxx-xxx'),
        name: name,
        created_at: new Date().getTime()
    });

    // & update connections after
    database.get('tests')
        .assign({ tests })
        .write();

    return tests;
}

async function updateTest(id, newName) {
    tests.id = id;
    database.get('tests')
        .find({id: id})
        .assign({'name': newName})
        .write();
}

async function deleteTest(id) {
    tests.id = id;
    database.get('tests')
        .find({id: id})
        .unset('tests')
        .write();
}    

async function findTestByID(id) {
    tests.id = id;
    database.get('tests')
        .find({id: id})
        .write();
}

async function getAllTests() {
    return tests;
}

// Export test methods
module.exports = {
    createTest,
    updateTest,
    deleteTest,
    findTestByID,
    getAllTests
};