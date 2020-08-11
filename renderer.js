// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require('electron');
const openExplorer = require('open-file-explorer');
fs = require('fs');

quitApplication = () => {
    ipcRenderer.send('QUIT_APPLICATION', 'quiting')
};

checkForFile = (fileName,callback) => {
    if(fs.existsSync(fileName)) {
        callback();
    } else {
        fs.writeFile(fileName, {flag: 'rwx'}, (err, data) => {
            callback();
        })
    }
};

writeToFile = (text) => {
    checkForFile("myNote.txt",() => {
        fs.appendFile("myNote.txt", text+'\r\n', (err,data) => {
            if (err) {
                return console.log(err);
            }
            console.log(data);
        });
    });
};

openFile = () => {
    openExplorer('', err => {
        if(err) {
            console.log(err);
        }
        else {
            //Do Something
        }
    });
};
