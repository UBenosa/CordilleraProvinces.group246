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
    article.style.display = "block";
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") == `#${articleId}`) {
            links[i].style.fontSize = "1.7rem";
        } else {
            links[i].style.fontSize = "1.5rem";
        }
    }
}

// Scrollbar
window.addEventListener("scroll", function (event) {
    let scrollY = this.scrollY;
    let maxScrollY =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    scroll_percentage = (scrollY / maxScrollY) * 100;
    document.getElementById("scrollbar").style.top = `${scroll_percentage}%`;
});

is_shown = true;
// Eye Image Show Icon
function triggerOpacity() {
    container = document.getElementsByClassName("parallax-container")[0];
    eye = container.querySelectorAll("img")[1];
    not_eye = container.querySelectorAll("*:not(img)");

    if (is_shown) {
        console.log(is_shown, 'yes')
        eye.src = "../Images/Icons/hide.png";
        not_eye.forEach((current_not_eye) => {
            current_not_eye.animate(
                {
                    opacity: '0',
                },
                { duration: 600, fill: "both", easing: "ease" }
            );
        });
        is_shown = false
        
    } else {
        console.log(is_shown, 'no')
        eye.src = "../Images/Icons/view.png";
        not_eye.forEach((current_not_eye) => {
            current_not_eye.animate(
                {
                    opacity: '1',
                },
                { duration: 600, fill: "both", easing: "ease" }
            );
        });
        is_shown = true      
    }
}
