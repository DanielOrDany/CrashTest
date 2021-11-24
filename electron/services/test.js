const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');
const appDataDirPath = getAppDataPath();
const adapter = new FileSync(path.join(appDataDirPath, 'crash_test_db.json'));
const database = low(adapter);
const { generateRandomIdByPattern } = require("../helpers");

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
    const existedTestWithSameName = await findTestByName(name);
    console.log(existedTestWithSameName);
    if (existedTestWithSameName) {
        throw "Test with such name already exists!";
    } else {
        // Get all connections from the app storage
        const tests = await getAllTests();

        // Remove one of them by name
        tests.push({
            id: generateRandomIdByPattern('xxx-xxx'),
            name: name,
            created_at: new Date().getTime()
        });

        console.log("new tests:", tests);

        // & update connections after
        database.get('tests')
            .assign({ tests })
            .write();

        return tests;
    }
}

async function updateTest(id, newName) {
    await database.get('tests')
        .find({id: id})
        .read()
        .assign({'name': newName})
        .write();

    return await findTestByID(id);
}

async function deleteTest(id) {
    await database.get('tests')
        .read()
        .find({id: id})
        .unset('tests')
        .write();

    return await getAllTests();
}    

async function findTestByID(id) {
    const test = await database.read().get('tests')
        .find({id: id})
        .value();

    return test;
}

async function findTestByName(name) {
    const test = await database.read().get('tests')
        .find({name: name})
        .value();

    return test;
}

async function getAllTests() {
    const tests = await database.read().get('tests').value();
    console.log("tests:", tests);
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