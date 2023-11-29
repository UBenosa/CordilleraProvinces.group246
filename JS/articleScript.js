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
            links[i].style.fontSize = '1.7rem';
        } else {
            links[i].style.fontSize = '1.5rem';
        }
    }
    article.style.display = 'block';
}

// Scrollbar
const scrollbar = document.getElementById('scrollbar');
let prevPercentage;
let scrollPercentage;

const handleOnScroll = e => {
    const scrollDelta = e.deltaY;
    const maxDelta = window.innerHeight / 2;
    prevPercentage = scrollPercentage || "0";
    const percentage = (scrollDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    scrollPercentage = nextPercentage;

    scrollbar.animate(
        {
            transform: `translateY(${-nextPercentage}%`,
        },
        { duration: 900, fill: "both", easing: "ease-out" }
    );
};

window.onwheel = e => handleOnScroll(e);

