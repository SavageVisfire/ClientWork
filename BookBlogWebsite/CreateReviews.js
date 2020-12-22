var mydata = JSON.parse(data);
//alert(mydata[0].title);
//alert(mydata[0].rating);
//alert(mydata[0].review);
for(i=0;i<mydata.length;i++){
    var title = document.createElement("h4");
    title.innerText = mydata[i].title;
    document.getElementById("bookReviews").appendChild(title);
    var rating = mydata[i].rating;
    for(z=0;z<5;z++){
        ratz = document.createElement("span");
        if(z<=mydata[i].rating-1){
            ratz.className="fa fa-star checked"
        }else{
            ratz.className="fa fa-star"
        }
        document.getElementById("bookReviews").appendChild(ratz);
    }
    var review = document.createElement("blockquote")
    review.innerText = mydata[i].review;
    document.getElementById("bookReviews").appendChild(review);
}