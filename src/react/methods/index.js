const { channels } = require('../../../src/shared/constants');
const { ipcRenderer } = window;

// Export API methods
export const

    authLogin = async (email, password) => {
        return new Promise(resolve => {
            ipcRenderer.send(channels.AUTH_LOGIN, email, password);
            ipcRenderer.on(channels.AUTH_LOGIN, (event, result) => {
                resolve(result.data);
            });
        });
    },

    authVerifyToken = async (id, token) => {
        return new Promise(resolve => {
            ipcRenderer.send(channels.AUTH_VERIFY_TOKEN, id, token);
            ipcRenderer.on(channels.AUTH_VERIFY_TOKEN, (event, result) => {
                resolve(result.data);
            });
        });
    },

    getAllDatabase = async () => {
        console.log(ipcRenderer);
        return new Promise(resolve => {
            ipcRenderer.send(channels.GET_DATABASE);
            ipcRenderer.on(channels.GET_DATABASE, (event, result) => {
                resolve(result.data);
            });
        });
    }

    createTest = async (name) => {
        return new Promise(resolve => {
            ipcRenderer.send(channels.CREATE_TEST, name);
            ipcRenderer.on(channels.CREATE_TEST, (event, result) => {
                resolve(result.data);
            });
        });
    }

    updateTest = async (id, newName) => {
        return new Promise(resolve => {
            ipcRenderer.send(channels.UPDATE_TEST, id, newName);
            ipcRenderer.on(channels.UPDATE_TEST, (event, result) => {
                resolve(result.data);
            });
        });
    }

    deleteTest = async (id) => {
        return new Promise(resolve => {
            ipcRenderer.send(channels.DELETE_TEST, id);
            ipcRenderer.on(channels.DELETE_TEST, (event, result) => {
                resolve(result.data);
            });
        });
    }

    findByID = async (id) => {
        return new Promise(resolve => {
            ipcRenderer.send(channels.FIND_ID_TEST, id);
            ipcRenderer.on(channels.FIND_ID_TEST, (event, result) => {
                resolve(result.data);
            });
        });
    }

    getAllTests = async () => {
        return new Promise(resolve => {
            ipcRenderer.send(channels.GET_ALL_TESTS);
            ipcRenderer.on(channels.GET_ALL_TESTS, (event, result) => {
                resolve(result.data);
            });
        });
    }

; //END
