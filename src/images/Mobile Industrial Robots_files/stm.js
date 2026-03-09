/* 403 - acc err */
window.SvOptOut = function () {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            
            if(this.status == 200){
                alert('SalesViewer Tracking deactivated');
            }else{
                // todo
            }
        }
    });

    xhr.open("GET", "https://slsnlytcs.com/optOut?csrf=1e703b4e5c54eaced401e606eadaa116");
    xhr.send();
}