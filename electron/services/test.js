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

async function createNewTest(name) {

    // Get all connections from the app storage
    const tests = await database
        .get('tests')
        .value();

    // Remove one of them by name
    tests.push({
        id: tests.length + 1,
        name: name,
        created_at: new Date().getTime()
    });

    // & update connections after
    database.get('tests')
        .assign({ tests })
        .write();

    return tests;
}

async function updateTest(id, newName) {}

async function deleteTest(id) {}

async function findTestByID(id) {}

async function getAllTests() {}

// Export test methods
module.exports = {
    createNewTest,
    updateTest,
    deleteTest,
    findTestByID,
    getAllTests
};