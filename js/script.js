let $canvas = $('#canvas'),
    $buttonsDiv = $('#buttonsDiv'),
    $rect = $('#rect'),
    $plusOneBtn = $('#plusOneBtn'),
    rocketYPositions = {},
    numRockets = 4,
    btnYStartPosition = 18,
    rocketYStartPosition = 16,
    canvasHeightDifference = 1 / 20;

$(window).on("load resize", function () {
    let rocketSeparation = ($(window).width() * 10 / 12) / (numRockets - 1);
    $canvas.attr("width", $(window).width().toString());
    $canvas.attr("height", $(window).height().toString());
    $canvas.empty();
    $buttonsDiv.empty();
    for (let i = 0; i < numRockets; i++) {
        let $newRect = $rect.clone(),
            $newPlusOneBtn = $plusOneBtn.clone();
        $newRect.attr("id", "rect" + i.toString());
        $newRect.attr("x", (($(window).width() * (1 / 12) + rocketSeparation * i) - parseInt($newRect.attr("width")) * i / (numRockets - 1)).toString());
        if (rocketYPositions[i] === undefined) {
            $newRect.attr("y", (parseInt($canvas.attr("height")) * rocketYStartPosition * canvasHeightDifference).toString());
            rocketYPositions[i] = rocketYStartPosition;
        }
        else {
            $newRect.attr("y", (parseInt($canvas.attr("height")) * rocketYPositions[i] * canvasHeightDifference).toString());
        }

        $newPlusOneBtn.attr("id", "plusOneBtn" + i.toString());
        $newPlusOneBtn.attr("data-rocket-id", "#rect" + i.toString());
        $newPlusOneBtn.attr("data-rocket-number", i.toString());
        let newBtnX = parseInt($newRect.attr("x")) + parseInt($newRect.attr("width")) / 2,
            newBtnY = parseInt($canvas.attr("height")) * btnYStartPosition * canvasHeightDifference;
        $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $canvas.append($newRect);
        $buttonsDiv.append($newPlusOneBtn);
    }

    $('.btn').on("click", function (e) {
        e.preventDefault();
        let $currentRocket = $($(this).data("rocket-id")),
            i = parseInt($(this).data("rocket-number"));
        rocketYPositions[i]--;
        $currentRocket.attr("y", (parseInt($canvas.attr("height")) * rocketYPositions[i] * canvasHeightDifference).toString());
    });
});
