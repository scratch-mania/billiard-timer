let defaultTimeStart = 20;
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

const countDownAudio = new Audio('assets/audio/countdown.mp3');
countDownAudio.preload = 'auto';

const setPlayerName = () => {
    $('#left-player-name').text(leftName);
    $('#right-player-name').text(rightName);
}

const setWinScore = () => {
    $('#left-player-win-score').text('(' + leftWinScore + ')');
    $('#right-player-win-score').text('(' + rightWinScore + ')');
}

const setLeftTimer = () => {
    if (! isLeftTimeFinish) {
        leftSec --;
        let leftTimeText = getTimerText(leftSec);
        $('#left-timer-text').text(leftTimeText);

        if (leftSec <= 10) {
            countDownAudio.play();
        }

        if (leftSec === 0) {
            isLeftTimeFinish = true;
            alert('時間いっぱいとなりましたので、' + baseShotClock + '秒のショットクロックに切り替わります。');
        }
    } else {
        leftShotClock --;
        let leftShotClockText = getTimerText(leftShotClock);
        $('#left-timer-text').text(leftShotClockText);

        if (leftShotClock <= 10) {
            countDownAudio.play();
        }

        if (leftShotClock === 0) {
            alert('Finish!');
            clearInterval(lt);
        }
    }
}

const setRightTimer = () => {
    if (! isRightTimeFinish) {
        rightSec --;
        let rightTimeText = getTimerText(rightSec);
        $('#right-timer-text').text(rightTimeText);

        if (rightSec <= 10) {
            countDownAudio.play();
        }

        if (rightSec === 0) {
            isRightTimeFinish = true;
            alert('時間いっぱいとなりましたので、' + baseShotClock + '秒のショットクロックに切り替わります。');
        }
    } else {
        rightShotClock --;
        let rightShotClockText = getTimerText(rightShotClock);
        $('#right-timer-text').text(rightShotClockText);

        if (rightShotClock <= 10) {
            countDownAudio.play();
        }

        if (rightShotClock === 0) {
            alert('Finish!');
            clearInterval(rt);
        }
    }
}

const getTimerText = (s) => {
    let min = Math.floor(s / 60);
    let sec = s - min * 60;
    let minText = ("0" + min).slice(-2);
    let secText = ("0" + sec).slice(-2);

    return `${minText}:${secText}`;
}

const setLeftClass = () => {
    $('#left-timer').addClass('bg-orange-100');
    $('#left-timer-text').removeClass('text-gray-400');
}

const setRightClass = () => {
    $('#right-timer').addClass('bg-orange-100');
    $('#right-timer-text').removeClass('text-gray-400');
}

const removeLeftClass = () => {
    $('#left-timer').removeClass('bg-orange-100');
    $('#left-timer-text').addClass('text-gray-400');
}

const removeRightClass = () => {
    $('#right-timer').removeClass('bg-orange-100');
    $('#right-timer-text').addClass('text-gray-400');
}

const init = () => {
    setPlayerName();
    setWinScore();
    $('#left-timer-text').text(getTimerText(leftSec));
    $('#right-timer-text').text(getTimerText(rightSec));
    $('#left-score').text(leftScore);
    $('#right-score').text(rightScore);
}

init();

$('#left-timer').click(function () {
    if (isLeftStart) {
        clearInterval(lt);
        isLeftStart = false;
    } else {
        lt = setInterval(setLeftTimer, 1000);
        clearInterval(rt);
        setLeftClass();
        removeRightClass();
        isLeftStart = true;
        isRightStart = false;

        if (isRightTimeFinish) {
            rightShotClock = baseShotClock;
            let rightShotClockText = getTimerText(rightShotClock);
            $('#right-timer-text').text(rightShotClockText);
        }
    }
});

$('#right-timer').click(function () {
    if (isRightStart) {
        clearInterval(rt);
        isRightStart = false;
    } else {
        rt = setInterval(setRightTimer, 1000);
        clearInterval(lt);
        setRightClass();
        removeLeftClass();
        isRightStart = true;
        isLeftStart = false;

        if (isLeftTimeFinish) {
            leftShotClock = baseShotClock;
            let leftShotClockText = getTimerText(leftShotClock);
            $('#left-timer-text').text(leftShotClockText);
        }
    }
});

$('#left-score-plus-btn').click(function() {
    leftScore ++;
    if (leftScore === leftWinScore) {
        alert(leftName + ' wins!');
        leftScore = 'W';
    }
    $('#left-score').text(leftScore);
});

$('#left-score-minus-btn').click(function() {
    leftScore --;
    if (leftScore < 0) {
        leftScore = 0;
    }
    $('#left-score').text(leftScore);
});

$('#right-score-plus-btn').click(function() {
    rightScore ++;
    if (rightScore === rightWinScore) {
        alert(rightName + ' wins!');
        rightScore = 'W';
    }
    $('#right-score').text(rightScore);
});

$('#right-score-minus-btn').click(function() {
    rightScore --;
    if (rightScore < 0) {
        rightScore = 0;
    }
    $('#right-score').text(rightScore);
});
