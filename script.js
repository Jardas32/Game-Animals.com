const cardAll = document.querySelectorAll('.card_inner');
const nameCounts = document.querySelector('.nameCounts');
const inputName = document.querySelector('.inputName');
const btnStart = document.querySelector('.btn');
const field = document.querySelector('.field');
const cardInner = document.querySelectorAll('.card_inner');
const count = document.querySelector('.count');
const bgwiner = document.querySelector('.bg-winer');
const btnClosed = document.querySelector('.btnClosed');
const textWiner = document.querySelector('.textWiner');
const numbup = document.querySelectorAll('.numbup');
const numbdown = document.querySelectorAll('.numbdown');
const audioFon = document.querySelector('.audioFon');
const container = document.querySelector('.container');


function generateRandomNumbers() {
    const uniqueNumbers = new Set();

    // Генерируем 5 уникальных чисел от 0 до 9
    while (uniqueNumbers.size < 5) {
        const num = Math.floor(Math.random() * 10);
        uniqueNumbers.add(num);
    }

    // Дублируем каждое число
    const numbers = [];
    uniqueNumbers.forEach(num => {
        numbers.push(num, num);
    });

    // Перемешиваем массив Фишером-Йетсом
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Назначаем числа карточкам
    const backs = document.querySelectorAll('.back');
    backs.forEach((back, index) => {
        back.textContent = numbers[index];
    });
}

generateRandomNumbers();

function startGame() {
    let firstClick = null;
    let secondClick = null;
    let lockBoard = false;

    cardInner.forEach(card => {
        card.addEventListener('click', () => {
            if (lockBoard) return;
            if (card.classList.contains('rotates')) return;

            const cardBack = card.querySelector('.back').textContent;

            card.classList.add('rotates');

            if (!firstClick) {
                firstClick = { element: card, value: cardBack };
            } else if (!secondClick && card !== firstClick.element) {
                secondClick = { element: card, value: cardBack };

                const number1 = Number(firstClick.value);
                const number2 = Number(secondClick.value);

                if (number1 === number2) {
                    count.textContent++;
                    firstClick = null;
                    secondClick = null;
                } else {
                    lockBoard = true;

                    setTimeout(() => {
                        if (firstClick && secondClick) {
                            firstClick.element.classList.remove('rotates');
                            secondClick.element.classList.remove('rotates');
                        }
                        firstClick = null;
                        secondClick = null;
                        lockBoard = false;
                    }, 1000);
                }
                
                const countNumber = Number(count.textContent);
                if(countNumber === 5) {
                    //setTimeout(() => {
                        bgwiner.classList.add('active');
                        textWiner.textContent = `${nameCounts.textContent} победил-а!`;
                    //}, 1000);
                    
                };

            }
        });
    });
}

startGame();


document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnClosed')) {
        bgwiner.classList.remove('active');
        location.reload();
    };
});


btnStart.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = inputName.value;

    if(!nameCounts.textContent == '') {
        field.classList.add('active');
    }

    
    if(inputName.value === 'Введите имя игрока!') {
        inputName.value = '';
        return;
    }
    if(inputValue === '') {
        inputName.value = 'Введите имя игрока!';
        return;
    }

    nameCounts.textContent = `${inputValue}:`;
    audioFon.play();
});


const setImg = [
    {
        img: 'img/img1.png'
    },
    {
        img: 'img/img2.png'
    },
    {
        img: 'img/img3.png'
    },
    {
        img: 'img/img4.png'
    },
    {
        img: 'img/img5.png'
    },
    {
        img: 'img/img6.jpg'
    },
    {
        img: 'img/img6.png'
    },
    {
        img: 'img/img7.png'
    },
    {
        img: 'img/img10.png'
    },
    {
        img: 'img/img12.png'
    },

]

let currentIndex = 0;

function changeBackground() {
container.style.backgroundImage = `url(${setImg[currentIndex].img})`;
currentIndex = (currentIndex + 1) % setImg.length;
};

changeBackground();

setInterval(changeBackground, 5000);





