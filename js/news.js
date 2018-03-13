var NEWS_API = "https://newsapi.org/v2/top-headlines?country=us&apiKey=38f90da811ac4deb8486698e997fe0c6"

// fetch News
var req = new Request(NEWS_API);
fetch(req)
  .then(data => data.json())
  .then(data => {
    //console.log(data);
    var newsElem = document.querySelector('.news');
    for (var i = 0; i < 15; i += 3) {
      if (data.articles[i].urlToImage != null) {
        newsElem.innerHTML = newsElem.innerHTML +
          "<div class=\"flexcolumn\" >" +
          getCard(data.articles[i]) +
          getCard(data.articles[i + 1]) +
          getCard(data.articles[i + 2])  +
          "</div>";
      }
    }
  })

  function getCard(article){
    var author, imgUrl, desc, domCard;
    imgUrl = article.urlToImage;
    
    if(!(article.urlToImage.substring(0, 8) == "https://" || article.urlToImage.substring(0, 7) == "http://")){
      imgUrl = "https://" + article.urlToImage;
    }
    if (article.author == null) {
      author = article.source.name;
    } 
    else {
      author = article.author;
    }

    if (article.description == null) {
      desc = "-";
    }
    else{
      desc = article.description;
    }

    domCard = "<div class=\"card\">" +
      "<img src=" + imgUrl + ">" +
      "<div class=\"title\"><a href=" + article.url + "><span style=\"font-size:2vh\">" + article.title + "</span></a></div>" +
      "<div class=\"newsDesc\"><p>" + desc + ".. </p><span>" + article.publishedAt + "</span></div>" +
      "<div class=\"author\"><p>" + author + "</p></div>" +
    "</div>";
    return domCard;
  }

// Show/Hide News
document.getElementById("toggleDiv").addEventListener("click", displayNews);
document.getElementById("collapseNews").addEventListener("click", hideNews);

function displayNews() {
  document.getElementById("newsContainer").style.transition = "width 0.5s";
  //document.getElementById("newsContainer").style.transitionTimingFunction = "ease-out"

  document.getElementById("newsContainerParent").style.width = "100vw";
  document.getElementById("newsContainer").style.width = "100vw";

  document.getElementById("newsContainer").style.boxShadow = "box-shadow: 1px 1px 5px #555";
}

function hideNews() {
  document.getElementById("newsContainer").style.transition = "width 0.25s";
  //document.getElementById("newsContainer").style.transitionTimingFunction = "ease-in"

  document.getElementById("newsContainerParent").style.width = "0vw";
  document.getElementById("newsContainer").style.width = "0vw";

  document.getElementById("newsContainer").style.boxShadow = "box-shadow: 0px 0px 0px transparent";

}