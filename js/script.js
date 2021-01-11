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

const storageRocketPoints = localStorage.rocketPoints;
if (storageRocketPoints !== "" && storageRocketPoints !== undefined) {
    rocketPoints = JSON.parse(storageRocketPoints);
}

const storageNumRockets = localStorage.numRockets;
if (storageNumRockets !== "" && storageNumRockets !== undefined) {
    numRockets = JSON.parse(storageNumRockets);
    $rocketNumLbl.text("Rockets: " + numRockets.toString());
}
localStorage.numRockets = JSON.stringify(numRockets);

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
        teamLblHeight = parseInt($lblTeam.css("height")),
        newBtnY = $(window).height() * btnYStartPosition * windowHeightDifference;

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
        rocketYStartPosition = newBtnY - 2 * plusOneBtnHeight - rocketHeight;

        $newFire.attr("id", "fire" + i.toString());
        $newFire.css("left", (parseInt($newRocket.css("left")) + rocketWidth / 4).toString() + "px");

        $newPlusOneBtn.attr("id", "plusOneBtn" + i.toString());
        $newPlusOneBtn.attr("data-rocket-id", "#rocket" + i.toString());
        $newPlusOneBtn.attr("data-score-id", "#scoreLbl" + i.toString());
        $newPlusOneBtn.attr("data-fire-id", "#fire" + i.toString());
        $newPlusOneBtn.attr("data-rocket-number", i.toString());
        const newBtnX = parseInt($newRocket.css("left")) + rocketWidth / 2,
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
        $newScoreLbl.css({"left": newBtnX.toString() + "px", "top": newTeamLblY.toString() + "px"});

        $rocketsDiv.append($newFire);
        $rocketsDiv.append($newRocket);
        $buttonsDiv.append($newPlusOneBtn);
        $buttonsDiv.append($newMinusOneBtn);
        $buttonsDiv.append($newResetBtn);
        $buttonsDiv.append($newTeamLbl);
        $buttonsDiv.append($newScoreLbl);

        moveRocket($newRocket, false);
    }

    const newRemoveBtnY = newBtnY - parseInt($removeRocketBtn.css("height")) - btnPositionOffset,
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
        moveRocket($currentRocket, true);
    });
}

function moveRocket($currentRocket, isAnimate) {
    const $currentFire = $($currentRocket.data("fire-id")),
        rocketNumber = parseInt($currentRocket.data("rocket-number"));

    if (rocketPoints[rocketNumber] === undefined)
        rocketPoints[rocketNumber] = 0;

    localStorage.rocketPoints = JSON.stringify(rocketPoints);

    $($currentRocket.data("score-id")).text("Score: " + rocketPoints[rocketNumber].toString());
    if (isAnimate) {
        $currentRocket.animate({"top": (rocketYStartPosition - rocketYStartPosition * rocketPoints[rocketNumber] * rocketHeightDifference).toString() + "px"}, {
            duration: 100,
            easing: "linear",
            step: function(now) {
                $currentFire.css("top", now + rocketHeight - firePositionOffset);
            }
        });
    }
    else {
        $currentRocket.css("top", (rocketYStartPosition - rocketYStartPosition * rocketPoints[rocketNumber] * rocketHeightDifference).toString() + "px");
        $currentFire.css("top", (parseInt($currentRocket.css("top")) + rocketHeight - firePositionOffset).toString() + "px");
    }

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
            moveRocket($rocketToDrag, false);
    });
// ...to here

// This is for the "Add Rocket" and "Remove Rocket" buttons.
$('.btn-rockets').on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("btn-plus-one"))
        numRockets++;
    else if ($(this).hasClass("btn-minus-one") && numRockets > 2)
        numRockets--;

    localStorage.numRockets = JSON.stringify(numRockets);
    $rocketNumLbl.text("Rockets: " + numRockets.toString());
    rebuildScreen();
});

$resetAllBtn.on("click", function (e) {
    e.preventDefault();
    rocketPoints = {};
    for (let i = 0; i < numRockets; i++) {
        moveRocket($('#rocket' + i.toString()), true);
    }
});
