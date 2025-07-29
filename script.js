import {
  format,
  getUnixTime,
  fromUnixTime,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePickerPopup = document.querySelector(".date-picker");
const currentMonthLabel = document.querySelector(".current-month");
const nextMonthBtn = document.querySelector(".next-month-button");
const prevMonthBtn = document.querySelector(".prev-month-button");
let datePickerGrid = document.querySelector(".date-picker-grid-dates");
let currentDate = new Date();

//when date button is picked modal is opened and current month and dates are set up.
datePickerButton.addEventListener("click", () => {
  datePickerPopup.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerButton.dataset.dateDigits);
  setupDatePicker(selectedDate);
  currentDate = selectedDate;
});

//moves to next month on calendar
nextMonthBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.dateDigits);
  currentDate = addMonths(currentDate, 1);
  setupDatePicker(selectedDate);
});

//moves to previous month on calendar
prevMonthBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.dateDigits);
  currentDate = subMonths(currentDate, 1);
  setupDatePicker(selectedDate);
});

//sets buttons date
function setDate(date) {
  datePickerButton.innerText = format(date, "PPP");
  datePickerButton.dataset.dateDigits = getUnixTime(date);
  const selectedDate = fromUnixTime(datePickerButton.dataset.dateDigits);
  setupDatePicker(selectedDate);
}

setDate(currentDate);
//sets up modal with current month and dates
function setupDatePicker(selectedDate) {
  currentMonthLabel.innerText = format(currentDate, "LLLL - u");
  setupDates(selectedDate);
}

//sets up dates for current month
function setupDates(selectedDate) {
  const firstOfWeek = startOfWeek(startOfMonth(currentDate));
  const lastOfWeek = endOfWeek(endOfMonth(currentDate));
  const dates = eachDayOfInterval({ start: firstOfWeek, end: lastOfWeek });
  datePickerGrid.innerHTML = "";
  dates.forEach((date) => {
    const dataElement = document.createElement("button");
    dataElement.classList.add("date");
    if (!isSameMonth(date, currentDate)) {
      dataElement.classList.add("date-picker-other-month-date");
    }
    if (isSameDay(date, selectedDate)) {
      dataElement.classList.add("selected");
    }
    dataElement.innerText = date.getDate();

    dataElement.addEventListener("click", () => {
      setDate(date);
      datePickerPopup.classList.remove("show");
    });
    datePickerGrid.appendChild(dataElement);
  });
}
