// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { remote, ipcRenderer } = require('electron');
fs = require('fs');

quitApplication = () => {
    ipcRenderer.send('QUIT_APPLICATION', 'quiting')
};

openFile = () => {
    ipcRenderer.send('OPEN_FILE', 'opening')
};

checkForFile = (fileName,callback) => {
    if(fs.existsSync(fileName)) {
        callback();
    } else {
        fs.writeFile(fileName, '', (err, data) => {
            callback();
        })
    }
};

writeToFile = (text) => {
    checkForFile(remote.getGlobal('simpleFile'),() => {
        fs.appendFile(remote.getGlobal('simpleFile'), text+'\r\n\r\n', (err,data) => {
            if (err) {
                return console.log(err);
            }
            console.log(data);
        });
    });
};
