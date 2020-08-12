document.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) {
        quitApplication();
    } else if(e.keyCode === 112) {
        openFile();
    }
});

document.querySelector("#mainForm").addEventListener("submit", function(e){
    const val = document.getElementById("noteTextBox").value;
    console.log(typeof val);
    if(val) {
        writeToFile(val);
    } else {
        e.preventDefault();
    }
});