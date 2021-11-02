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

; //END
