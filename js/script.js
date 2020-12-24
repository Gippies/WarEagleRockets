let $canvas = $('#canvas'),
    $buttonsDiv = $('#buttonsDiv'),
    $rect = $('#rect'),
    $plusOneBtn = $('#plusOneBtn'),
    rocketPositions = {},
    btnPositions = {},
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
        if (rocketPositions[i] === undefined) {
            $newRect.attr("y", (($canvas.attr("height") - $canvas.attr("height") * (1 / 5)) - $rect.attr("height")).toString());
            rocketPositions[i] = parseInt($newRect.attr("y"));
        }
        else {
            $newRect.attr("y", rocketPositions[i].toString());
        }

        let newBtnX = parseInt($newRect.attr("x")) + parseInt($newRect.attr("width")) / 2,
            newBtnY = parseInt($newRect.attr("y")) + parseInt($newRect.attr("height")) + btnHeightOffset;
        $newPlusOneBtn.attr("id", "plusOneBtn" + i.toString());
        $newPlusOneBtn.attr("data-rocket-id", "#rect" + i.toString());
        $newPlusOneBtn.attr("data-rocket-number", i.toString());
        if (btnPositions[i] === undefined) {
            $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": newBtnY.toString() + "px"});
            btnPositions[i] = newBtnY;
        }
        else {
            $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": btnPositions[i].toString() + "px"});
        }

        $canvas.append($newRect);
        $buttonsDiv.append($newPlusOneBtn);
    }

    $('.btn').on("click", function (event) {
        event.preventDefault();
        let $currentRocket = $($(this).data("rocket-id"));
        $currentRocket.attr("y", (parseInt($currentRocket.attr("y")) - rocketSpeed).toString());
        rocketPositions[parseInt($(this).data("rocket-number"))] = parseInt($currentRocket.attr("y"));
    });
});
