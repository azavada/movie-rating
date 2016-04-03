function ajax(url, callback) {

    function handleStateChange() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange; // Implemented elsewhere.
    xhr.open("GET", url, true);
    xhr.send();
}
