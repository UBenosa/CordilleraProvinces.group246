r = document.querySelector(':root');

// Mouse drag handler
const track = document.getElementById("image-track");
const translateX = 8.5
r.style.setProperty('--translateX', `${-translateX}%`);
const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
};
const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};
const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    
    const delta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (delta / maxDelta) * -100;

    animateImages(percentage, delta, maxDelta);
};

// Scroll wheel handler
const handleOnScroll = e => {
    const delta = e.deltaY;
    const maxDelta = window.innerHeight / 2;
    const percentage = (delta / maxDelta) * -100;

    animateImages(percentage, delta, maxDelta);
};

function animateImages(percentage) {
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    track.dataset.prevPercentage = track.dataset.percentage || "0"; // Update prevPercentage when scrolling
    track.dataset.percentage = nextPercentage;

    // Container animation
    track.animate(
        {
            transform: `translate(${nextPercentage - translateX}%, -50%)`,
        },
        { duration: 1000, fill: "both", easing: "ease-out" }
    );

    // Scrollbar animation
    const scrollbar = document.getElementById("scrollbar-thumb");
    scrollbar.animate(
        {
            transform: `translate(${-nextPercentage*3}%)`,
        },
        {duration: 1000, fill: "forwards", easing: 'ease-out'}
    )

    // Images parallax animation
    const images = track.getElementsByClassName("image");
    for (const image of images) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1300, fill: "forwards", easing: "ease-out" }
        );
    }
}


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

function zoomImage(containerId) {
    const imageContainers = document.querySelectorAll(".image-container");
    const imageMap = {
        abra: "Images/Abra.jpg",
        apayao: "Images/Apayao.jpg",
        benguet: "Images/Benguet.jpg",
        ifugao: "Images/Ifugao.jpg",
        kalinga: "Images/Kalinga.jpg",
        "mountain-province": "Images/Mountain Province.jpg",
    };
    document.getElementsByTagName('h1')[0].classList.add("darken");

    imageContainers.forEach((container) => {
        const id = container.getAttribute("id");
        container.classList.add("darken");
        const text = container.querySelector(".text");
        text.classList.add("zoom");
        container.addEventListener("click", () => {
        window.location.href = imageMap[id];
        });
    });
    
    setTimeout(() => {
        window.location.href = imageMap[containerId];
    }, 1000);
}
