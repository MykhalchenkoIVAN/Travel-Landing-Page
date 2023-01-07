'use strict'

// calendar implementation start 

const inputDate = document.getElementById('input_date');

let calendar = document.querySelector('.calendar');
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

let calendarDays;
let todayShowDatesArr

// open the calendar by clicking
inputDate.addEventListener('click', function (e) {
    calendar.classList.remove('hidden')
    calendarDays.addEventListener('click', function (e) {
        inputDate.textContent = `${e.target.textContent} ${month_picker.textContent}, ${currentYear.value}`
        calendar.classList.add('hidden')
    })

})

// create calendar start
const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    );
};
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
};

const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];


month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
};

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendarDays = calendar_days;
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    let currentDate = new Date();

    month_picker.innerHTML = month_names[month];

    calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {

        let day = document.createElement('div');

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;

            if (i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }
};

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;

    month_list.append(month);
    month.onclick = () => {
        currentMonth.value = index;
        generateCalendar(currentMonth.value, currentYear.value);
        month_list.classList.replace('show', 'hide');
        dayTextFormate.classList.remove('hideTime');
        dayTextFormate.classList.add('showtime');
        timeFormate.classList.remove('hideTime');
        timeFormate.classList.add('showtime');
        dateFormate.classList.remove('hideTime');
        dateFormate.classList.add('showtime');
    };
});

(function () {
    month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
};

const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
).format(currshowDate);

todayShowDate.textContent = currentDateFormate;
todayShowDatesArr = todayShowDate
setInterval(() => {
    const timer = new Date();
    const option = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
    )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
}, 1000);

// create calendar end
// calendar implementation end


// setting the current date in "inputDate" on every reload of the web page
// let e = [todayShowDatesArr.textContent]
const stringDay = currentDate.getDay();
const day = `${currentDate.getDay() + 1}`.padStart(2, '0')

const monthSelectionFromArray = function () {
    return month_names[currentDate.getMonth()]
}

const currentMonth1 = monthSelectionFromArray()

inputDate.textContent = `${day} ${currentMonth1}, ${currentDate.getFullYear()}`

// // smooth appearance of site sections when scrolling
const allSections = document.querySelectorAll('.section');

const appearanceSection = function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
    root: null,
    threshold: 0.3,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
});

// slider
const btnDectSection = document.querySelectorAll('.top__destinations-btn');
const slides = document.querySelectorAll('.collage');

let currentSlide = 0;
const slidesNumber = slides.length;

const moveToSlide = function (slide) {
    slides.forEach(
        (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
    );
};
moveToSlide(0);

for (let i = 0; i < btnDectSection.length; i++) {
    btnDectSection[i].addEventListener('click', function () {
        moveToSlide(i);
    })
}
const nextSlide = function () {
    if (currentSlide === slidesNumber - 1) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    moveToSlide(currentSlide);
    console.log(currentSlide);

};

const previousSlide = function () {
    if (currentSlide === 0) {
        moveToSlide(0);
        currentSlide = slidesNumber - 1;
    } else {
        currentSlide--;
    }

    moveToSlide(currentSlide);
};
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
});

// email validation
const inputEmail = document.querySelector('.newsletter__input');
const buttonNews = document.querySelector('.newsletter__btn');

inputEmail.addEventListener("input", inputHandler)
buttonNews.addEventListener("click", function () {
    console.log("vcxk");
})

function inputHandler({ target }) {
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
        el.setAttribute("is-valid", "1");
        el.style.border = "0.2rem solid rgb(0, 196, 0)";
    } else {
        el.setAttribute("is-valid", "0");
        el.style.border = "0.2rem solid rgb(255, 0, 0)";
    }
}