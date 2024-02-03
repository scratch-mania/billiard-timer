let defaultTimeStart = 1800;
let baseShotClock = 30;
let leftWinScore = 5;
let rightWinScore = 5;
let lt;
let rt;
let isLeftStart = false;
let isRightStart = false;
let isLeftTimeFinish = false;
let isRightTimeFinish = false;
let leftShotClock = baseShotClock;
let rightShotClock = baseShotClock;
let leftScore = 0;
let rightScore = 0;
let leftName = 'Player1';
let rightName = 'Player2';
let leftSec = defaultTimeStart;
let rightSec = defaultTimeStart;
let isPlayFinish = false;

const countDownAudio = new Audio('assets/audio/countdown.mp3');
const endAudio = new Audio('assets/audio/end.mp3');
const changeAudio = new Audio('assets/audio/change.mp3');
countDownAudio.preload = 'auto';
endAudio.preload = 'auto';
changeAudio.preload = 'auto';

/**
 * Set player name
 */
const setPlayerName = () => {
    $('#left-player-name').text(leftName);
    $('#right-player-name').text(rightName);
}

/**
 * Set win score
 */
const setWinScore = () => {
    $('#left-player-win-score').text('(' + leftWinScore + ')');
    $('#right-player-win-score').text('(' + rightWinScore + ')');
}

/**
 * Set left timer
 */
const setLeftTimer = () => {
    if (! isLeftTimeFinish) {
        leftSec --;
        let leftTimeText = getTimerText(leftSec);
        $('#left-timer-text').text(leftTimeText);

        if (leftSec === 0) {
            isLeftTimeFinish = true;
            showTimerResetBtn('left');
        }
    } else {
        leftShotClock --;
        let leftShotClockText = getTimerText(leftShotClock);
        $('#left-timer-text').text(leftShotClockText);

        if (leftShotClock <= 10 && leftShotClock > 0) {
            countDownAudio.currentTime = 0;
            countDownAudio.play();
        }

        if (leftShotClock === 0) {
            endAudio.play();
            clearInterval(lt);
        }
    }
}

/**
 * Set right timer
 */
const setRightTimer = () => {
    if (! isRightTimeFinish) {
        rightSec --;
        let rightTimeText = getTimerText(rightSec);
        $('#right-timer-text').text(rightTimeText);

        if (rightSec === 0) {
            isRightTimeFinish = true;
            showTimerResetBtn('right');
        }
    } else {
        rightShotClock --;
        let rightShotClockText = getTimerText(rightShotClock);
        $('#right-timer-text').text(rightShotClockText);

        if (rightShotClock <= 10 && rightShotClock > 0) {
            countDownAudio.currentTime = 0;
            countDownAudio.play();
        }

        if (rightShotClock === 0) {
            endAudio.play();
            clearInterval(rt);
        }
    }
}

/**
 * Get timer text
 * @param s number
 * @returns {`${string}:${string}`}
 */
const getTimerText = (s) => {
    let min = Math.floor(s / 60);
    let sec = s - min * 60;
    let minText = ("0" + min).slice(-2);
    let secText = ("0" + sec).slice(-2);

    return `${minText}:${secText}`;
}

/**
 * Set class
 * @param t string
 */
const setClass = (t) => {
    const name = '#' + t + '-timer';
    $(name).addClass('bg-gray-600');
    $(name + '-start-btn').text('| |');
}

/**
 * Remove class
 * @param t string
 */
const removeClass = (t) => {
    const name = '#' + t + '-timer';
    $(name).removeClass('bg-gray-600');
    $(name + '-start-btn').text('▶');
}

/**
 * Set shot clock
 * @param t string
 */
const setShotClock = (t) => {
    eval(t + 'ShotClock = baseShotClock');
    let ShotClockText = getTimerText(baseShotClock);
    $('#' + t + '-timer-text').text(ShotClockText);
}

/**
 * Open and close modal
 */
const openModal = () => {
    $('#model-confirm').css('display', 'block')
    $('body').addClass('overflow-y-hidden');
}

/**
 * Close modal
 */
const closeModal = () => {
    $('#model-confirm').css('display', 'none')
    $('body').removeClass('overflow-y-hidden');
};

/**
 * Show timer reset button
 * @param t string
 */
const showTimerResetBtn = (t) => {
    const name = '#' + t + '-timer-reset-btn';
    $(name).removeClass('hidden');
}

/**
 * Hidden timer reset button
 * @param t string
 */
const hiddenTimerResetBtn = (t) => {
    const name = '#' + t + '-timer-reset-btn';
    $(name).addClass('hidden');
}

/**
 * init
 */
const init = () => {
    leftScore = 0;
    rightScore = 0;

    isRightTimeFinish = false;
    isLeftTimeFinish = false;
    isPlayFinish = false;

    setPlayerName();
    setWinScore();
    $('#left-timer').removeClass('bg-gray-600');
    $('#right-timer').removeClass('bg-gray-600');
    $('#left-timer-text').text(getTimerText(leftSec));
    $('#right-timer-text').text(getTimerText(rightSec));
    $('#left-score').text(leftScore);
    $('#right-score').text(rightScore);

    hiddenTimerResetBtn('left');
    hiddenTimerResetBtn('right');
}

init();

$('#left-timer-start-btn').click(function () {
    if (isLeftStart) {
        clearInterval(lt);
        isLeftStart = false;
        $(this).text('▶');
    } else {
        lt = setInterval(setLeftTimer, 1000);
        clearInterval(rt);
        setClass('left');
        removeClass('right');
        isLeftStart = true;
        isRightStart = false;

        changeAudio.play();

        if (isRightTimeFinish) {
            setShotClock('right');
        }
    }
});

$('#right-timer-start-btn').click(function () {
    if (isRightStart) {
        clearInterval(rt);
        isRightStart = false;
        $(this).text('▶');
    } else {
        rt = setInterval(setRightTimer, 1000);
        clearInterval(lt);
        setClass('right');
        removeClass('left');
        isRightStart = true;
        isLeftStart = false;

        changeAudio.play();

        if (isLeftTimeFinish) {
            setShotClock('left');
        }
    }
});

$('#left-timer-reset-btn').click(function() {
    clearInterval(lt);
    isLeftStart = false;
    $('#left-timer-start-btn').text('▶');

    setShotClock('left');
});

$('#right-timer-reset-btn').click(function() {
    clearInterval(rt);
    isRightStart = false;
    $('#right-timer-start-btn').text('▶');

    setShotClock('right');
});


$('#left-score-plus-btn').click(function() {
    if (isPlayFinish) {
        return;
    }
    leftScore ++;
    if (leftScore === leftWinScore) {
        alert(leftName + ' wins!');
        leftScore = 'W';
        isPlayFinish = true;
    }
    $('#left-score').text(leftScore);
});

$('#left-score-minus-btn').click(function() {
    if (isPlayFinish) {
        return;
    }
    leftScore --;
    if (leftScore < 0) {
        leftScore = 0;
    }
    $('#left-score').text(leftScore);
});

$('#right-score-plus-btn').click(function() {
    if (isPlayFinish) {
        return;
    }
    rightScore ++;
    if (rightScore === rightWinScore) {
        alert(rightName + ' wins!');
        rightScore = 'W';
        isPlayFinish = true;
    }
    $('#right-score').text(rightScore);
});

$('#right-score-minus-btn').click(function() {
    if (isPlayFinish) {
        return;
    }
    rightScore --;
    if (rightScore < 0) {
        rightScore = 0;
    }
    $('#right-score').text(rightScore);
});

$('#setting-options').click(function() {
    openModal();

    $('#set-default-time').val(defaultTimeStart);
    $('#set-shot-time').val(baseShotClock);
    $('#set-left-player-name').val(leftName);
    $('#set-right-player-name').val(rightName);
    $('#set-left-player-win-score').val(leftWinScore);
    $('#set-right-player-win-score').val(rightWinScore);
});

$('#save-setting').click(function() {
    closeModal();

    let time = $('#set-default-time').val();
    let shotTime = $('#set-shot-time').val();
    let leftPlayerName = $('#set-left-player-name').val();
    let rightPlayerName = $('#set-right-player-name').val();
    let leftPlayerWinScore = $('#set-left-player-win-score').val();
    let rightPlayerWinScore = $('#set-right-player-win-score').val();

    baseShotClock = parseInt(shotTime);
    defaultTimeStart = parseInt(time);
    leftSec = parseInt(time);
    rightSec = parseInt(time);
    leftShotClock = parseInt(shotTime);
    rightShotClock = parseInt(shotTime);
    leftName = leftPlayerName;
    rightName = rightPlayerName;
    leftWinScore = parseInt(leftPlayerWinScore);
    rightWinScore = parseInt(rightPlayerWinScore);

    init();
});

$('#modal-cancel-btn').click(function() {
    closeModal();
});

$('#modal-close-btn').click(function() {
    closeModal();
});

// Close all modals when press ESC
document.onkeydown = function(event) {
    event = event || window.event;
    if (event.keyCode === 27) {
        document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
        let modals = document.getElementsByClassName('modal');
        Array.prototype.slice.call(modals).forEach(i => {
            i.style.display = 'none'
        })
    }
};
