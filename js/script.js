let $addRocketBtn = $('#addRocketBtn'),
    $removeRocketBtn = $('#removeRocketBtn'),
    $rocketNumLbl = $('#rocketNumLbl'),
    $rocketsDiv = $('#rocketsDiv'),
    $buttonsDiv = $('#buttonsDiv'),
    $initialRocket = $('#initialRocket'),
    $plusOneBtn = $('#plusOneBtn'),
    $minusOneBtn = $('#minusOneBtn'),
    $resetBtn = $('#resetBtn'),
    rocketYPositions = {},
    numRockets = 4,
    btnYStartPosition = 18,
    rocketYStartPosition = 11,
    windowHeightDifference = 1 / 20;

function rebuildScreen() {
    let rocketSeparation = ($(window).width() * 10 / 12) / (numRockets - 1),
        rocketWidth = parseInt($('.rocket').css("width")),
        minusOneBtnWidth = parseInt($('.btn-minus-one').css("width")),
        resetBtnHeight = parseInt($('.btn-reset').css("height"));

    $rocketsDiv.empty();
    $buttonsDiv.empty();

    for (let i = 0; i < numRockets; i++) {
        let $newRocket = $initialRocket.clone(),
            $newPlusOneBtn = $plusOneBtn.clone(),
            $newMinusOneBtn = $minusOneBtn.clone(),
            $newResetBtn = $resetBtn.clone();
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
        let newMinusBtnX = newBtnX - minusOneBtnWidth - 10;
        $newMinusOneBtn.css({"left": newMinusBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $newResetBtn.attr("id", "resetBtn" + i.toString());
        $newResetBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newResetBtn.attr("data-rocket-number", i.toString());
        let newResetBtnX = newMinusBtnX + minusOneBtnWidth / 2,
            newResetBtnY = newBtnY + resetBtnHeight + 10;
        $newResetBtn.css({"left": newResetBtnX.toString() + "px", "top": newResetBtnY.toString() + "px"});

        $rocketsDiv.append($newRocket);
        $buttonsDiv.append($newPlusOneBtn);
        $buttonsDiv.append($newMinusOneBtn);
        $buttonsDiv.append($newResetBtn);
    }

    let newBtnY = $(window).height() * btnYStartPosition * windowHeightDifference;
    $addRocketBtn.css("top", newBtnY.toString() + "px");
    $removeRocketBtn.css("top", (newBtnY + parseInt($addRocketBtn.css("height")) + 10).toString() + "px");
    $rocketNumLbl.css("top", (newBtnY - parseInt($rocketNumLbl.css("height")) - 10).toString() + "px");

    $('.btn-points').on("click", function (e) {
        e.preventDefault();
        let $currentRocket = $($(this).data("rocket-id")),
            i = parseInt($(this).data("rocket-number"));
        if ($(this).hasClass("btn-plus-one") && rocketYPositions[i] > 0) {
            rocketYPositions[i]--;
        }
        else if ($(this).hasClass("btn-minus-one") && rocketYPositions[i] < rocketYStartPosition) {
            rocketYPositions[i]++;
        }
        else if ($(this).hasClass("btn-reset")) {
            rocketYPositions[i] = rocketYStartPosition;
        }
        $currentRocket.css("top", ($(window).height() * rocketYPositions[i] * windowHeightDifference).toString() + "px");
    });
}

$(window).on("load resize", function () {
    rebuildScreen();
});

$('.btn-rockets').on("click", function (e) {
    if ($(this).hasClass("btn-plus-one")) {
        numRockets++;
    }
    else if ($(this).hasClass("btn-minus-one")) {
        numRockets--;
    }
    $rocketNumLbl.text("Rockets: " + numRockets.toString());
    rocketYPositions = {};
    rebuildScreen();
})
