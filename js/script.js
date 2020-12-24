let $canvas = $('#canvas'),
    $rect = $('#rect'),
    numRockets = 4,
    rocketSeparation = window.innerWidth / numRockets;
$canvas.attr("width", window.innerWidth.toString());
$canvas.attr("height", window.innerHeight.toString());
for (let i = 0; i < numRockets; i++) {
    let $newRect = $rect.clone();
    $newRect.attr("id", "rect" + i.toString());
    $newRect.attr("x", (rocketSeparation * i).toString());
    $newRect.attr("y", (window.innerHeight - $rect.attr("height")).toString());
    $canvas.append($newRect);
}
