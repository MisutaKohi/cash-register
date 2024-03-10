const userInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceDisplay = document.getElementById('price-display');
const changeDisplay = document.getElementById('change-display');
const changeDueDisplay = document.getElementById('change-due');

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

let changeArr = [
  [0.01, 0],
  [0.05, 0],
  [0.1, 0],
  [0.25, 0],
  [1, 0],
  [5, 0],
  [10, 0],
  [20, 0],
  [100, 0]
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

const displayChangeDue = () => {
  
}

displayPrice(price);
displayCashInDrawer();

const makePurchase = () => {
  let customerFunds = parseFloat(userInput.value);
  userInput.value = "";
  
  if (customerFunds === price) {
    changeDueDisplay.classList.remove('hidden');
    changeDisplay.innerHTML = `No change due - customer paid with exact cash`;
  } else if (customerFunds < price) {
    alert("Customer does not have enough money to purchase the item");
  } else {
    let changeAmount = customerFunds - price;
    changeAmount = Math.round(changeAmount * 100) / 100; // removes floating point oddities
    const purchaseSuccess = calculateChangeDue(changeAmount);
    
    if (purchaseSuccess) {
      displayCashInDrawer();
    }
  }
}

const calculateChangeDue = (changeAmount) => {
  
  for (let i = changeArr.length - 1; i >= 0; i--) {
    while (changeArr[i][0] <= changeAmount && cid[i][1] > 0) {
      cid[i][1] -= changeArr[i][0];
      changeAmount -= changeArr[i][0];
      changeArr[i][1] += changeArr[i][0];
      changeAmount = Math.round(changeAmount * 100) / 100; // removes floating point oddities
    }
    
  }
  
  console.log(changeAmount);
  return changeAmount === 0;
};

purchaseBtn.addEventListener('click', makePurchase);