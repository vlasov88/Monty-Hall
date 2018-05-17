console.log('script!');


var selectedClass = 'selected';
var goodClass = 'good';
var badClass = 'bad';
var winClass = 'win';
var loseClass = 'lose';

var playground = document.getElementById('wrapper-inner');
var rounds = document.getElementById('rounds');
var wins = document.getElementById('wins');
var c0 = document.getElementById('c0');
var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var cells = [c0, c1, c2];

c0.addEventListener('click', function (event) {clickHandler(0, event);});
c1.addEventListener('click', function (event) {clickHandler(1, event);});
c2.addEventListener('click', function (event) {clickHandler(2, event);});
playground.addEventListener('click', function () {resetHandler();})

var roundCounter = 0;
var winsCounter = 0;
var game = rand();
var choise;
var opened;
var step = 0;
var end = false;

function resetHandler() {
    debugger;
    // Сбрасываем параметры если игра закончена
    if (end) {
        resetGame();
    }
}

function clickHandler(ch, event) {
    // Не засчитываем шаг, если клик по открытой ячейке
    if (opened === ch) {
        return;
    }
    choise = ch;
    selectButton(choise);
    // Откроем ячейку на первом шаге
    if (step === 0) {
        while(true) {
            var i = rand();
            if (i !== choise && i !== game) {
                open(i);
                opened = i;
                step++;
                return;
            }
        }
    } else if (step === 1){
        // На втором шаге вскрываем
        open(0);
        open(1);
        open(2);
        playground.classList.add(ch === game ? winClass : loseClass);
        roundCounter++;
        if (game === choise) {
            winsCounter++
        }
        rounds.innerText = roundCounter;
        wins.innerText = winsCounter;
        end = true;
        event.stopPropagation();
        step++;
    }
}


function open(i) {
    cells[i].innerText = i === game ? 'V' : 'X';
    cells[i].classList.add(i === game ? goodClass : badClass);
}

function closeAll() {
    for (var i = 0; i < 3; i++) {
        cells[i].innerText = '?';
        cells[i].classList.remove(goodClass, badClass);
    }
}

/**
 * Возвращает случайное число от 0 до 2
 */
function rand() {
    return Math.floor(Math.random() * 3);
}

function selectButton(button) {
    cleanSelection();
    cells[button].classList.add(selectedClass);

}

/**
 * Убрать все выделения
 */
function cleanSelection() {
    c0.classList.remove(selectedClass);
    c1.classList.remove(selectedClass);
    c2.classList.remove(selectedClass);
}

/**
 * Подготовить всё к новому раунду
 */
function resetGame() {
    step = 0;
    opened = null;
    choise = null;
    closeAll();
    cleanSelection();
    playground.classList.remove(winClass, loseClass);
    game = rand();
    end = false;
}