function download() {
    filename = "data.json"
    var mydata = JSON.parse(data);
    mydata.push({"title" : document.getElementById("titleOfBook").value, "rating" : parseInt(document.getElementById("ratingOfBook").value),"review":document.getElementById("reviewOfBook").value})
    text ="data = `"+ JSON.stringify(mydata) + "`"
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }