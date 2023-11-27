// Hide all articles except the first one on page load
window.addEventListener('load', function() {
    var articles = document.getElementsByClassName('article');
    for (var i = 1; i < articles.length; i++) {
        articles[i].style.display = 'none';
    }
});

function toggleArticle(articleId) {
    // Hide all articles
    var articles = document.getElementsByClassName('article');
    for (var i = 0; i < articles.length; i++) {
        articles[i].style.display = 'none';
    }
    
    // Show the selected article
    var article = document.getElementById(articleId);
    article.style.display = 'block';
}
