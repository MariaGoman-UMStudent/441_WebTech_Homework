function getSafePosition(elementWidth, elementHeight) {
    let margin = 100;

    let maxX = $(window).width() - elementWidth - margin;
    let maxY = $(window).height() - elementHeight - margin;

    let minX = margin;
    let minY = margin;

    let x = Math.random() * (maxX - minX) + minX;
    let y = Math.random() * (maxY - minY) + minY;

    return { x, y };
}

$(document).ready(function () {


    // Text system
    let texts = [
        "Only in my dreams...",
        "As real as it may seem...",
        "I'm dreaming of you...",
        "Memories not yet lived...",
        "Reality bends here..."
    ];

    let textIndex = 0;

    $("#dreamText").text(texts[0]);

    let startPos = getSafePosition(200, 50);
    $("#dreamText").css({
        left: startPos.x,
        top: startPos.y
    });

    function cycleText() {
        textIndex = (textIndex + 1) % texts.length;

        $("#dreamText").fadeOut(1000, function () {
            $(this).text(texts[textIndex]).fadeIn(1000);
        });
    }

    setInterval(cycleText, 4000);


    // image system
    let images = [
        "imgs/dreams1.jpg",
        "imgs/dreams2.jpg",
        "imgs/dreams3.jpg"
    ];

    let imgIndex = 0;

    function cycleImages() {
        $("#dreamImage").fadeOut(2000, function () {

            imgIndex = (imgIndex + 1) % images.length;
            $(this).attr("src", images[imgIndex]);

            let pos = getSafePosition(250, 250);

            $(this).css({ top: pos.y, left: pos.x });

            $(this).fadeIn(2000);
        });
    }

    setInterval(cycleImages, 6000);


    // shape system
    let colors = ["#6a0dad", "#4b0082", "#8a2be2", "#0000ff"];
    let sizes = [50, 100, 150, 200];

    let shapeIndex = 0;

    function cycleShape() {
        shapeIndex = (shapeIndex + 1) % colors.length;

        let newSize = sizes[Math.floor(Math.random() * sizes.length)];

        $("#shape").css({
            backgroundColor: colors[shapeIndex],
            width: newSize,
            height: newSize,
            borderRadius: Math.random() > 0.5 ? "50%" : "10%"
        });

        let pos = getSafePosition(newSize, newSize);

        $("#shape").animate({
            left: pos.x,
            top: pos.y
        }, 3000);
    }

    setInterval(cycleShape, 3000);

    // Floating shapes (smooth motion)
    function floatShape() {
        let shape = $("#shape");

        let size = shape.width();

        let pos = getSafePosition(size, size);

        shape.animate({
            left: pos.x,
            top: pos.y
        }, 5000, "swing", function () {
            floatShape();
        });
    }

    floatShape();

});