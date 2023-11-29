// Hide all articles except the first one on page load
window.addEventListener("load", function () {
    var articles = document.getElementsByClassName("article");
    for (var i = 1; i < articles.length; i++) {
        articles[i].style.display = "none";
    }
});

function toggleArticle(articleId) {
    // Hide all articles
    var articles = document.getElementsByClassName("article");
    for (var i = 0; i < articles.length; i++) {
        articles[i].style.display = "none";
    }

    // Show the selected article
    var article = document.getElementById(articleId);
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") == `#${articleId}`) {
            links[i].style.fontSize = "1.7rem";
        } else {
            links[i].style.fontSize = "1.5rem";
        }
    }
    article.style.display = "block";
}

// Scrollbar
window.addEventListener("scroll", function (event) {
    let scrollY = this.scrollY;
    let maxScrollY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scroll_percentage = (scrollY / maxScrollY) * 100
    console.log(scroll_percentage)
    
    document.getElementById('scrollbar').style.top = `${scroll_percentage}%`;
});

