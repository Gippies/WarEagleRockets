const $addRocketBtn = $('#addRocketBtn'),
    $removeRocketBtn = $('#removeRocketBtn'),
    $resetAllBtn = $('#resetAllBtn'),
    $rocketNumLbl = $('#rocketNumLbl'),
    $teamLbl = $('#teamLbl'),
    $scoreLbl = $('#scoreLbl'),
    $rocketsDiv = $('#rocketsDiv'),
    $buttonsDiv = $('#buttonsDiv'),
    $initialRocket = $('#initialRocket'),
    $initialFire = $('#initialFire'),
    $plusOneBtn = $('#plusOneBtn'),
    $minusOneBtn = $('#minusOneBtn'),
    $resetBtn = $('#resetBtn'),
    $rocket = $('.rocket'),
    rocketWidth = parseInt($rocket.css("width")),
    rocketHeight = parseInt($rocket.css("height")),
    firePositionOffset = 25,
    btnPositionOffset = 10,
    btnYStartPosition = 33,
    maxRocketPoints = 18,
    rocketHeightDifference = 1 / maxRocketPoints,
    windowHeightDifference = 1 / 35;

let rocketPoints = {},
    rocketYStartPosition = -1,
    numRockets = 4,
    clickingRocket = false,
    dragStartPosition = -1,
    $rocketToDrag = undefined;

/**
 * Clears the screen of rockets and their buttons and then re-creates them and places them in their appropriate
 * positions.
 */
function rebuildScreen() {
    const rocketSeparation = ($(window).width() * 10 / 12) / (numRockets - 1),
        plusOneBtnHeight = parseInt($('.btn-plus-one').css("height")),
        minusOneBtnWidth = parseInt($('.btn-minus-one').css("width")),
        resetBtnWidth = parseInt($('.btn-reset').css("width")),
        $lblTeam = $('.lbl-team'),
        teamLblWidth = parseInt($lblTeam.css("width")),
        teamLblHeight = parseInt($lblTeam.css("height"));

    $rocketsDiv.empty();
    $buttonsDiv.empty();

    for (let i = 0; i < numRockets; i++) {
        const $newRocket = $initialRocket.clone(),
            $newFire = $initialFire.clone(),
            $newPlusOneBtn = $plusOneBtn.clone(),
            $newMinusOneBtn = $minusOneBtn.clone(),
            $newResetBtn = $resetBtn.clone(),
            $newTeamLbl = $teamLbl.clone(),
            $newScoreLbl = $scoreLbl.clone();

        $newRocket.attr("id", "rocket" + i.toString());
        $newRocket.attr("data-rocket-number", i.toString());
        $newRocket.attr("data-fire-id", "#fire" + i.toString());
        $newRocket.attr("data-score-id", "#scoreLbl" + i.toString());
        $newRocket.css("left", (($(window).width() * (1 / 12) + rocketSeparation * i) - rocketWidth * i / (numRockets - 1)).toString() + "px");
        rocketYStartPosition = $(window).height() * btnYStartPosition * windowHeightDifference - 2 * plusOneBtnHeight - rocketHeight;
        if (rocketPoints[i] === undefined) {
            $newRocket.css("top", rocketYStartPosition.toString() + "px");
            rocketPoints[i] = 0;
        }
        else
            $newRocket.css("top", (rocketYStartPosition - rocketYStartPosition * rocketPoints[i] * rocketHeightDifference).toString() + "px");

        $newFire.attr("id", "fire" + i.toString());
        if (rocketPoints[i] === 0)
            $newFire.hide();
        else
            $newFire.show();
        const newFireX = parseInt($newRocket.css("left")) + rocketWidth / 4,
            newFireY = parseInt($newRocket.css("top")) + rocketHeight - firePositionOffset;
        $newFire.css({"left": newFireX.toString() + "px", "top": newFireY.toString() + "px"});

        $newPlusOneBtn.attr("id", "plusOneBtn" + i.toString());
        $newPlusOneBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newPlusOneBtn.attr("data-score-id", "#scoreLbl" + i.toString());
        $newPlusOneBtn.attr("data-fire-id", "#fire" + i.toString());
        $newPlusOneBtn.attr("data-rocket-number", i.toString());
        const newBtnX = parseInt($newRocket.css("left")) + rocketWidth / 2,
            newBtnY = $(window).height() * btnYStartPosition * windowHeightDifference,
            newPlusBtnY = newBtnY - plusOneBtnHeight - btnPositionOffset;
        $newPlusOneBtn.css({"left": newBtnX.toString() + "px", "top": newPlusBtnY.toString() + "px"});

        $newMinusOneBtn.attr("id", "minusOneBtn" + i.toString());
        $newMinusOneBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newMinusOneBtn.attr("data-score-id", "#scoreLbl" + i.toString());
        $newMinusOneBtn.attr("data-fire-id", "#fire" + i.toString());
        $newMinusOneBtn.attr("data-rocket-number", i.toString());
        const newMinusBtnX = newBtnX - minusOneBtnWidth - btnPositionOffset;
        $newMinusOneBtn.css({"left": newMinusBtnX.toString() + "px", "top": newPlusBtnY.toString() + "px"});

        $newResetBtn.attr("id", "resetBtn" + i.toString());
        $newResetBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newResetBtn.attr("data-score-id", "#scoreLbl" + i.toString());
        $newResetBtn.attr("data-fire-id", "#fire" + i.toString());
        $newResetBtn.attr("data-rocket-number", i.toString());
        const newResetBtnX = newMinusBtnX + minusOneBtnWidth + btnPositionOffset / 2 - resetBtnWidth / 2;
        $newResetBtn.css({"left": newResetBtnX.toString() + "px", "top": newBtnY.toString() + "px"});

        $newTeamLbl.attr("id", "teamLbl" + i.toString());
        $newTeamLbl.text("Team: " + (i + 1).toString());
        const newTeamLblX = newMinusBtnX - teamLblWidth + minusOneBtnWidth,
            newTeamLblY = newPlusBtnY - teamLblHeight - btnPositionOffset;
        $newTeamLbl.css({"left": newTeamLblX.toString() + "px", "top": newTeamLblY.toString() + "px"});

        $newScoreLbl.attr("id", "scoreLbl" + i.toString());
        $newScoreLbl.text("Score: " + rocketPoints[i].toString());
        $newScoreLbl.css({"left": newBtnX.toString() + "px", "top": newTeamLblY.toString() + "px"});

        $rocketsDiv.append($newFire);
        $rocketsDiv.append($newRocket);
        $buttonsDiv.append($newPlusOneBtn);
        $buttonsDiv.append($newMinusOneBtn);
        $buttonsDiv.append($newResetBtn);
        $buttonsDiv.append($newTeamLbl);
        $buttonsDiv.append($newScoreLbl);
    }

    const newBtnY = $(window).height() * btnYStartPosition * windowHeightDifference,
        newRemoveBtnY = newBtnY - parseInt($removeRocketBtn.css("height")) - btnPositionOffset,
        newAddBtnY = newRemoveBtnY - parseInt($addRocketBtn.css("height")) - btnPositionOffset;
    $addRocketBtn.css("top", newAddBtnY.toString() + "px");
    $removeRocketBtn.css("top", newRemoveBtnY.toString() + "px");
    $resetAllBtn.css("top", newBtnY.toString() + "px");
    $rocketNumLbl.css("top", (newAddBtnY - parseInt($rocketNumLbl.css("height")) - btnPositionOffset).toString() + "px");

    // This is for the buttons and labels beneath the rockets.
    $('.btn-points').on("click", function (e) {
        e.preventDefault();
        const $currentRocket = $($(this).data("rocket-id")),
            i = parseInt($(this).data("rocket-number"));
        if ($(this).hasClass("btn-plus-one") && rocketPoints[i] < maxRocketPoints)
            rocketPoints[i]++;
        else if ($(this).hasClass("btn-minus-one") && rocketPoints[i] > 0)
            rocketPoints[i]--;
        else if ($(this).hasClass("btn-reset"))
            rocketPoints[i] = 0;
        moveRocket($currentRocket);
    });
}

function moveRocket($currentRocket) {
    const $currentFire = $($currentRocket.data("fire-id")),
        rocketNumber = parseInt($currentRocket.data("rocket-number"));
    $($currentRocket.data("score-id")).text("Score: " + rocketPoints[rocketNumber].toString());
    $currentRocket.css("top", (rocketYStartPosition - rocketYStartPosition * rocketPoints[rocketNumber] * rocketHeightDifference).toString() + "px");
    $currentFire.css("top", (parseInt($currentRocket.css("top")) + rocketHeight - firePositionOffset).toString() + "px");
    if (rocketPoints[rocketNumber] === 0)
        $currentFire.hide();
    else
        $currentFire.show();
}

$(window).on("load resize", function () {
    rebuildScreen();
});


// This section is for making the rockets draggable. From here...
$rocket.attr("draggable", false);
$('.fire').attr("draggable", false);

$rocketsDiv
    .on("mousedown", ".rocket", function (e) {
        e.preventDefault();
        clickingRocket = true;
        $rocketToDrag = $(e.target);
        dragStartPosition = e.pageY;
    });

$(document)
    .on("mouseup", function() {
        clickingRocket = false;
    })
    .on("mousemove", function (e) {
        if (clickingRocket === false) return;

        let rocketNumber = parseInt($rocketToDrag.data("rocket-number")),
            rocketMoved = false;
        if (dragStartPosition - e.pageY >= Math.round(rocketYStartPosition * rocketHeightDifference)) {
            rocketPoints[rocketNumber] += Math.round((dragStartPosition - e.pageY) / Math.round(rocketYStartPosition * rocketHeightDifference));
            if (rocketPoints[rocketNumber] > maxRocketPoints)
                rocketPoints[rocketNumber] = maxRocketPoints;
            dragStartPosition = e.pageY;
            rocketMoved = true;
        }
        else if (e.pageY - dragStartPosition >= Math.round(rocketYStartPosition * rocketHeightDifference)) {
            rocketPoints[rocketNumber] -= Math.round((e.pageY - dragStartPosition) / Math.round(rocketYStartPosition * rocketHeightDifference));
            if (rocketPoints[rocketNumber] < 0)
                rocketPoints[rocketNumber] = 0;
            dragStartPosition = e.pageY;
            rocketMoved = true;
        }

        if (rocketMoved)
            moveRocket($rocketToDrag);
    });
// ...to here

// This is for the "Add Rocket" and "Remove Rocket" buttons.
$('.btn-rockets').on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("btn-plus-one"))
        numRockets++;
    else if ($(this).hasClass("btn-minus-one") && numRockets > 2)
        numRockets--;
    $rocketNumLbl.text("Rockets: " + numRockets.toString());
    // This resets all the points for all the rockets.
    rocketPoints = {};
    rebuildScreen();
});

$resetAllBtn.on("click", function (e) {
    e.preventDefault();
    for (let i = 0; i < numRockets; i++) {
        rocketPoints[i] = 0;
        moveRocket($('#rocket' + i.toString()));
    }
});
