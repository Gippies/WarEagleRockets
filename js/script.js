let $canvas = $('#canvas'),
    $rect = $('#rect'),
    numRockets = 4,
    screenWidth = $(window).width(),
    screenHeight = $(window).height(),
    rocketSeparation = screenWidth / (numRockets - 1);
$canvas.attr("width", screenWidth.toString());
$canvas.attr("height", screenHeight.toString());
for (let i = 0; i < numRockets; i++) {
    let $newRect = $rect.clone();
    $newRect.attr("id", "rect" + i.toString());
    $newRect.attr("x", (rocketSeparation * i).toString());
    $newRect.attr("y", (screenHeight - $rect.attr("height")).toString());
    $canvas.append($newRect);
}
