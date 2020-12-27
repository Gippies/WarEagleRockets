let $addRocketBtn = $('#addRocketBtn'),
    $removeRocketBtn = $('#removeRocketBtn'),
    $resetAllBtn = $('#resetAllBtn'),
    $rocketNumLbl = $('#rocketNumLbl'),
    $teamLbl = $('#teamLbl'),
    $scoreLbl = $('#scoreLbl'),
    $rocketsDiv = $('#rocketsDiv'),
    $buttonsDiv = $('#buttonsDiv'),
    $initialRocket = $('#initialRocket'),
    $plusOneBtn = $('#plusOneBtn'),
    $minusOneBtn = $('#minusOneBtn'),
    $resetBtn = $('#resetBtn'),
    rocketYPositions = {},
    numRockets = 4,
    btnPositionOffset = 10,
    btnYStartPosition = 25,
    rocketYStartPosition = 15,
    windowHeightDifference = 1 / 28;

function rebuildScreen() {
    let rocketSeparation = ($(window).width() * 10 / 12) / (numRockets - 1),
        rocketWidth = parseInt($('.rocket').css("width")),
        minusOneBtnWidth = parseInt($('.btn-minus-one').css("width")),
        resetBtnHeight = parseInt($('.btn-reset').css("height")),
        $lblTeam = $('.lbl-team'),
        teamLblWidth = parseInt($lblTeam.css("width")),
        teamLblHeight = parseInt($lblTeam.css("height"));

    $rocketsDiv.empty();
    $buttonsDiv.empty();

    for (let i = 0; i < numRockets; i++) {
        let $newRocket = $initialRocket.clone(),
            $newPlusOneBtn = $plusOneBtn.clone(),
            $newMinusOneBtn = $minusOneBtn.clone(),
            $newResetBtn = $resetBtn.clone(),
            $newTeamLbl = $teamLbl.clone(),
            $newScoreLbl = $scoreLbl.clone();
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
        $newPlusOneBtn.attr("data-score-id", "#scoreLbl" + i.toString());
        $newPlusOneBtn.attr("data-rocket-number", i.toString());
        let newBtnX = parseInt($newRocket.css("left")) + rocketWidth / 2,
            newBtnY = $(window).height() * btnYStartPosition * windowHeightDifference;
        $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $newMinusOneBtn.attr("id", "minusOneBtn" + i.toString());
        $newMinusOneBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newMinusOneBtn.attr("data-score-id", "#scoreLbl" + i.toString());
        $newMinusOneBtn.attr("data-rocket-number", i.toString());
        let newMinusBtnX = newBtnX - minusOneBtnWidth - btnPositionOffset;
        $newMinusOneBtn.css({"left": newMinusBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $newResetBtn.attr("id", "resetBtn" + i.toString());
        $newResetBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newResetBtn.attr("data-score-id", "#scoreLbl" + i.toString());
        $newResetBtn.attr("data-rocket-number", i.toString());
        let newResetBtnX = newMinusBtnX + minusOneBtnWidth / 2,
            newResetBtnY = newBtnY + resetBtnHeight + btnPositionOffset;
        $newResetBtn.css({"left": newResetBtnX.toString() + "px", "top": newResetBtnY.toString() + "px"});

        $newTeamLbl.attr("id", "teamLbl" + i.toString());
        $newTeamLbl.text("Team: " + (i + 1).toString());
        let newTeamLblX = newMinusBtnX - teamLblWidth + minusOneBtnWidth,
            newTeamLblY = newBtnY - teamLblHeight - btnPositionOffset;
        $newTeamLbl.css({"left": newTeamLblX.toString() + "px", "top": newTeamLblY.toString() + "px"});

        $newScoreLbl.attr("id", "scoreLbl" + i.toString());
        $newScoreLbl.text("Score: " + (rocketYStartPosition - rocketYPositions[i]));
        $newScoreLbl.css({"left": newBtnX.toString() + "px", "top": newTeamLblY.toString() + "px"});

        $rocketsDiv.append($newRocket);
        $buttonsDiv.append($newPlusOneBtn);
        $buttonsDiv.append($newMinusOneBtn);
        $buttonsDiv.append($newResetBtn);
        $buttonsDiv.append($newTeamLbl);
        $buttonsDiv.append($newScoreLbl);
    }

    let newBtnY = $(window).height() * btnYStartPosition * windowHeightDifference;
    $addRocketBtn.css("top", (newBtnY - parseInt($removeRocketBtn.css("height")) - btnPositionOffset).toString() + "px");
    $removeRocketBtn.css("top", newBtnY.toString() + "px");
    $resetAllBtn.css("top", (newBtnY + parseInt($removeRocketBtn.css("height")) + btnPositionOffset).toString() + "px");
    $rocketNumLbl.css("top", (newBtnY - 2 * (parseInt($rocketNumLbl.css("height")) + 1.5 * btnPositionOffset)).toString() + "px");

    $('.btn-points').on("click", function (e) {
        e.preventDefault();
        let $currentRocket = $($(this).data("rocket-id")),
            $currentScoreLbl = $($(this).data("score-id")),
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
        $currentScoreLbl.text("Score: " + (rocketYStartPosition - rocketYPositions[i]));
        $currentRocket.css("top", ($(window).height() * rocketYPositions[i] * windowHeightDifference).toString() + "px");
    });
}

$(window).on("load resize", function () {
    rebuildScreen();
});

$('.btn-rockets').on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("btn-plus-one")) {
        numRockets++;
    }
    else if ($(this).hasClass("btn-minus-one") && numRockets > 2) {
        numRockets--;
    }
    $rocketNumLbl.text("Rockets: " + numRockets.toString());
    rocketYPositions = {};
    rebuildScreen();
});

$resetAllBtn.on("click", function (e) {
    e.preventDefault();
    for (let i = 0; i < numRockets; i++) {
        rocketYPositions[i] = rocketYStartPosition;
        $('#scoreLbl' + i.toString()).text("Score: " + (rocketYStartPosition - rocketYPositions[i]));
        $('#rocket' + i.toString()).css("top", ($(window).height() * rocketYPositions[i] * windowHeightDifference).toString() + "px");
    }
});
