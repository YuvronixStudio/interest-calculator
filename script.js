// INPUT ELEMENTS
const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const timeInput = document.getElementById("time");
const timeUnitSelect = document.getElementById("timeUnit");
const typeSelect = document.getElementById("type");

// OUTPUT ELEMENTS
const interestOutput = document.getElementById("interest");
const totalOutput = document.getElementById("total");

// READ CURRENCY SYMBOL FROM CSS
const currencySymbol = getComputedStyle(document.documentElement)
  .getPropertyValue("--currency-symbol")
  .replace(/"/g, "");

// FORMAT NUMBER AS MONEY
function formatMoney(value) {
  return currencySymbol + value.toFixed(2);
}

// MAIN CALCULATION FUNCTION
function calculate() {
  const P = parseFloat(principalInput.value);
  const R = parseFloat(rateInput.value);
  let T = parseFloat(timeInput.value);

  // HANDLE EMPTY / INVALID INPUT
  if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || T <= 0) {
    interestOutput.textContent = formatMoney(0);
    totalOutput.textContent = formatMoney(0);
    return;
  }

  // CONVERT MONTHS TO YEARS
  if (timeUnitSelect.value === "months") {
    T = T / 12;
  }

  const rate = R / 100;
  let interest = 0;
  let total = 0;

  // SIMPLE vs COMPOUND
  if (typeSelect.value === "simple") {
    interest = P * rate * T;
    total = P + interest;
  } else {
    total = P * Math.pow(1 + rate, T);
    interest = total - P;
  }

  // UPDATE UI
  interestOutput.textContent = formatMoney(interest);
  totalOutput.textContent = formatMoney(total);
}

// AUTO-CALCULATE ON CHANGE
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", calculate);
});
