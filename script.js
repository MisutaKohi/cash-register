const userInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceDisplay = document.getElementById('price-display');
const changeDisplay = document.getElementById('change-display');

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const denominations = [
  "Pennies",
  "Nickels",
  "Dimes",
  "Quarters",
  "Ones",
  "Fives",
  "Tens",
  "Twenties",
  "Hundreds"
];

const displayCashInDrawer = () => {
  changeDisplay.innerHTML = ``;
  
  let idx = 0;
  for (const denomination of denominations) {
    changeDisplay.innerHTML += `<li>${denomination}: $${cid[idx][1]}</li>`;
    idx++;
    console.log('here');
  }
}

const displayPrice = (price) => {
  priceDisplay.textContent = `$${price}`
}

displayPrice(price);
displayCashInDrawer();