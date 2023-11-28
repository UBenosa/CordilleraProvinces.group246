r = document.querySelector(':root').style;

// Mouse drag handler
const track = document.getElementById("image-track");
const translateX = 8.5
r.setProperty('--translateX', `${-translateX}%`);
const handleOnDown = e => {
    track.dataset.mouseDownAt = e.clientX;
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

    animateImages(nextPercentage);
};

// Scroll wheel handler
const handleOnScroll = e => {
    const scrollDelta = e.deltaY;
    const maxDelta = window.innerHeight / 2;
    track.dataset.prevPercentage = track.dataset.percentage || "0";
    const percentage = (scrollDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;
    animateImages(nextPercentage);
};

function animateImages(nextPercentage) {
    // Container animation
    track.animate(
        {
            transform: `translate(${nextPercentage - translateX}%, -50%)`,
        },
        { duration: 900, fill: "both", easing: "ease-out" }
    );

    // Scrollbar animation
    const scrollbar = document.getElementById("scrollbar-thumb");
    scrollbar.animate(
        {
            transform: `translate(${-nextPercentage*3}%)`,
        },
        {duration: 900, fill: "forwards", easing: 'ease-out'}
    )

    // Images parallax animation
    const images = track.getElementsByClassName("image");
    for (const image of images) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 900, fill: "forwards", easing: "ease-out" }
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


// Transition
function zoomImage(containerId) {
    const imageContainers = document.querySelectorAll(".image-container");
    const imageMap = {
        abra: "HTML/abra.html",
        apayao: "Images/Apayao.jpg",
        benguet: "Images/Benguet.jpg",
        ifugao: "Images/Ifugao.jpg",
        kalinga: "Images/Kalinga.jpg",
        "mountain-province": "Images/Mountain Province.jpg",
    };

    document.getElementById('overlay').classList.add('fade');

    imageContainers.forEach((container) => {
        const id = container.getAttribute("id");
        // r.setProperty('--image', imageMap[id]);
        container.addEventListener("click", () => {
        window.location.href = imageMap[id];
        });
    });
    
    setTimeout(() => {
        window.location.href = imageMap[containerId];
    }, 300);
}
