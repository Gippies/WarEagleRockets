let $canvas = $('#canvas'),
    $rect = $('#rect'),
    numRockets = 4;

$(window).on("load resize", function () {
    let rocketSeparation = $(window).width() / (numRockets - 1);
    $canvas.attr("width", $(window).width().toString());
    $canvas.attr("height", $(window).height().toString());
    $canvas.empty();
    for (let i = 0; i < numRockets; i++) {
        let $newRect = $rect.clone();
        $newRect.attr("id", "rect" + i.toString());
        $newRect.attr("x", (rocketSeparation * i - parseInt($newRect.attr("width")) * i / (numRockets - 1)).toString());
        $newRect.attr("y", ($canvas.attr("height") - $rect.attr("height")).toString());
        $canvas.append($newRect);
    }
});
