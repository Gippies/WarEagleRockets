let $canvas = $('#canvas'),
    $buttonsDiv = $('#buttonsDiv'),
    $rect = $('#rect'),
    $plusOneBtn = $('#plusOneBtn'),
    rocketYPositions = {},
    btnYPosition = -1,
    numRockets = 4,
    btnHeightOffset = 50,
    rocketSpeed = 50;

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
            $newRect.attr("y", (($canvas.attr("height") - $canvas.attr("height") * (1 / 5)) - $newRect.attr("height")).toString());
            rocketYPositions[i] = parseInt($newRect.attr("y"));
        }
        else {
            $newRect.attr("y", rocketYPositions[i].toString());
        }

        $newPlusOneBtn.attr("id", "plusOneBtn" + i.toString());
        $newPlusOneBtn.attr("data-rocket-id", "#rect" + i.toString());
        $newPlusOneBtn.attr("data-rocket-number", i.toString());
        let newBtnX = parseInt($newRect.attr("x")) + parseInt($newRect.attr("width")) / 2;
        if (btnYPosition === -1) {
            let newBtnY = parseInt($newRect.attr("y")) + parseInt($newRect.attr("height")) + btnHeightOffset;
            $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": newBtnY.toString() + "px"});
            btnYPosition = newBtnY;
        }
        else {
            $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": btnYPosition.toString() + "px"});
        }

        $canvas.append($newRect);
        $buttonsDiv.append($newPlusOneBtn);
    }

    $('.btn').on("click", function (e) {
        e.preventDefault();
        let $currentRocket = $($(this).data("rocket-id"));
        $currentRocket.attr("y", (parseInt($currentRocket.attr("y")) - rocketSpeed).toString());
        rocketYPositions[parseInt($(this).data("rocket-number"))] = parseInt($currentRocket.attr("y"));
    });
});
