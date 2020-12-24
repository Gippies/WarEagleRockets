let $canvas = $('#canvas'),
    $buttonsDiv = $('#buttonsDiv'),
    $rect = $('#rect'),
    $plusOneBtn = $('#plusOneBtn'),
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
        $newRect.attr("y", (($canvas.attr("height") - $canvas.attr("height") * (1 / 5)) - $rect.attr("height")).toString());

        let newBtnX = parseInt($newRect.attr("x")) + parseInt($newRect.attr("width")) / 2,
            newBtnY = parseInt($newRect.attr("y")) + parseInt($newRect.attr("height")) + btnHeightOffset;
        $newPlusOneBtn.attr("id", "plusOneBtn" + i.toString());
        $newPlusOneBtn.attr("data-rocket", "#rect" + i.toString());
        $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $canvas.append($newRect);
        $buttonsDiv.append($newPlusOneBtn);
    }

    $('.btn').on("click", function (event) {
        event.preventDefault();
        let $currentRocket = $($(this).data("rocket"));
        $currentRocket.attr("y", (parseInt($currentRocket.attr("y")) - rocketSpeed).toString());
    });
});
