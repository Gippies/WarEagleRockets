let $rocketsDiv = $('#rocketsDiv'),
    $buttonsDiv = $('#buttonsDiv'),
    $initialRocket = $('#initialRocket'),
    $plusOneBtn = $('#plusOneBtn'),
    $minusOneBtn = $('#minusOneBtn'),
    rocketYPositions = {},
    numRockets = 4,
    rocketWidth = 200,  // Be sure to synchronize this in the css file!!
    btnPointsWidth = 45,  // Be sure this remains consistent with the width of the buttons!!
    btnYStartPosition = 18,
    rocketYStartPosition = 11,
    windowHeightDifference = 1 / 20;

$(window).on("load resize", function () {
    let rocketSeparation = ($(window).width() * 10 / 12) / (numRockets - 1);
    $rocketsDiv.empty();
    $buttonsDiv.empty();
    for (let i = 0; i < numRockets; i++) {
        let $newRocket = $initialRocket.clone(),
            $newPlusOneBtn = $plusOneBtn.clone(),
            $newMinusOneBtn = $minusOneBtn.clone();
        $newRocket.attr("id", "rocket" + i.toString());
        $newRocket.css("left", (($(window).width() * (1 / 12) + rocketSeparation * i) - rocketWidth * i / (numRockets - 1)).toString() + "px");
        if (rocketYPositions[i] === undefined) {
            $newRocket.css("top", ($(window).height() * rocketYStartPosition * windowHeightDifference).toString() + "px");
            rocketYPositions[i] = rocketYStartPosition;
        }
        else {
            $newRocket.css("top", ($(window).height() * rocketYPositions[i] * windowHeightDifference).toString() + "px");
        }

        $newPlusOneBtn.attr("id", "plusOneBtn" + i.toString());
        $newPlusOneBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newPlusOneBtn.attr("data-rocket-number", i.toString());
        let newBtnX = parseInt($newRocket.css("left")) + rocketWidth / 2,
            newBtnY = $(window).height() * btnYStartPosition * windowHeightDifference;
        $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $newMinusOneBtn.attr("id", "minusOneBtn" + i.toString());
        $newMinusOneBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newMinusOneBtn.attr("data-rocket-number", i.toString());
        let newMinusBtnX = newBtnX - btnPointsWidth - 10;
        $newMinusOneBtn.css({"left": newMinusBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $rocketsDiv.append($newRocket);
        $buttonsDiv.append($newPlusOneBtn);
        $buttonsDiv.append($newMinusOneBtn);
    }

    $('.btn-points').on("click", function (e) {
        e.preventDefault();
        let $currentRocket = $($(this).data("rocket-id")),
            i = parseInt($(this).data("rocket-number"));
        if ($(this).hasClass("btn-plus-one")) {
            rocketYPositions[i]--;
        }
        else if ($(this).hasClass("btn-minus-one")) {
            rocketYPositions[i]++;
        }
        $currentRocket.css("top", ($(window).height() * rocketYPositions[i] * windowHeightDifference).toString() + "px");
    });
});
