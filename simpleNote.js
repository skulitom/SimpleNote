document.addEventListener('keyup', (e) => {
    if (e.keyCode == 27) {
        quitApplication();
    } else if(e.keyCode == 112) {
        openFile();
    }
});

document.querySelector("#mainForm").addEventListener("submit", function(e){
    if(e.target.value) {

    } else {
        e.preventDefault();
    }
});