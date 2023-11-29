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
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('href') == `#${articleId}`) {
            links[i].style.fontSize = '1.9rem';
        } else {
            links[i].style.fontSize = '1.5rem';
        }
    }
    article.style.display = 'block';
}

// Navigation bar animation with delay
var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].style.animation = `fade 0.75s ease ${0.9+(0.3*i)}s forwards`;
    }

// Carousel Script
let slider = document.querySelector('.js-carousel');

        lory(slider, {
            infinite: 1,
            enableMouseEvents: true,
            classNameFrame: 'js-carousel__frame',
            classNameSlideContainer: 'js-carousel__slides',
            classNamePrevCtrl: 'js-carousel__prev',
            classNameNextCtrl: 'js-carousel__next',
        });