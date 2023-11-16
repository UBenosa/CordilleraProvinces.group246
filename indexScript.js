// Mouse dragging handler
const track = document.getElementById("image-track");
const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
    track.dataset.prevPercentage = track.dataset.percentage || "0"; // Initialize prevPercentage if it doesn't exist
};
const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};
const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 800, fill: "both", easing: "ease-out" }
    );

    const images = track.getElementsByClassName("image");
    for (const image of images) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 800, fill: "forwards", easing: "ease-out" }
        );
    }
};

// Scroll wheel handler
const handleOnScroll = e => {
    const scrollDelta = e.deltaY;
    const maxDelta = window.innerHeight / 2;
    track.dataset.prevPercentage = track.dataset.percentage || "0"; // Update prevPercentage when scrolling

    const percentage = (scrollDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "both", easing: "ease-out" }
    );

    const images = track.getElementsByClassName("image");
    for (const image of images) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1500, fill: "forwards", easing: "ease-out" }
        );
    }
};

// Mouse Drag Event listeners
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
window.onwheel = e => handleOnScroll(e);

// For cursor animation
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = "white";
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    cursor.style.top = x;
    cursor.style.left = y;
    
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

// Zoom In
function zoomImage(id) {
    body = document.getElementsByTagName("BODY")[0];
    imageTrack = document.getElementById("image-track");
    imageContainer = document.getElementById(id);
    image = imageContainer.querySelector('img');

    

    // Removes hover effect
    imageContainer.classList.remove('hover-effect')

    // Initiates animations
    console.log(imageContainer)
    console.log(imageTrack.firstElementChild)
    if (imageContainer === imageTrack.firstElementChild) {
        imageTrack.style.animation = 'track-zoom-1st 1s ease forwards';
    }
    else {
        imageTrack.style.animation = 'track-zoom 1s ease forwards';
    }

    imageContainer.style.animation = 'container-zoom 1s ease forwards';
    image.style.animation = 'image-zoom 1s ease forwards';
    
    // body.append(imageContainer);
}
