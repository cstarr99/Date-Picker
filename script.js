import {
  format,
  getUnixTime,
  fromUnixTime,
  addMonths,
  subMonths,
} from "date-fns";

const datePickerButton = document.querySelector(".date-picker-button");
const datePickerPopup = document.querySelector(".date-picker");
const currentMonthLabel = document.querySelector(".current-month");
const nextMonthBtn = document.querySelector(".next-month-button");
const prevMonthBtn = document.querySelector(".prev-month-button");
let currentDate = new Date();

datePickerButton.addEventListener("click", () => {
  datePickerPopup.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerButton.dataset.dateDigits);
  setupDatePicker(selectedDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1);
  setupDatePicker();
});

prevMonthBtn.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1);
  setupDatePicker();
});

function setDate(date) {
  datePickerButton.innerText = format(date, "PPP");
  datePickerButton.dataset.dateDigits = getUnixTime(date);
}

setDate(currentDate);

function setupDatePicker() {
  currentMonthLabel.innerText = format(currentDate, "LLLL - u");
}
