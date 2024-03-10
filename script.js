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
  [0.01, 0, 'PENNY'],
  [0.05, 0, 'NICKEL'],
  [0.1, 0, 'DIME'],
  [0.25, 0, 'QUARTER'],
  [1, 0, 'ONE'],
  [5, 0, 'FIVE'],
  [10, 0, 'TEN'],
  [20, 0, 'TWENTY'],
  [100, 0, 'ONE HUNDRED']
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

const resetChangeArr = () => {
  for (const denomination of changeArr) {
    denomination[1] = 0;
  }
}

const displayCashInDrawer = () => {
  changeDisplay.innerHTML = ``;
  
  let idx = 0;
  for (const denomination of denominations) {
    cid[idx][1] = Math.round(cid[idx][1] * 100) / 100;
    changeDisplay.innerHTML += `<li>${denomination}: $${cid[idx][1]}</li>`;
    idx++;
    console.log('here');
  }
}

const displayPrice = (price) => {
  priceDisplay.textContent = `$${price}`
}

const displayChangeDue = () => {
  changeDueDisplay.classList.remove('hidden');

  let totalChangeInDrawer = 0;
  for (const denomination of cid) {
    totalChangeInDrawer += denomination[1];
  }

  let status = (totalChangeInDrawer > 0) ? 'OPEN' : 'CLOSED';

  changeDueDisplay.innerHTML = `<p>Status: ${status}</p>`;

  for (const changeDenomination of changeArr) {
    if (changeDenomination[1] !== 0) {
      changeDenomination[1] = (Math.round(changeDenomination[1] * 100) / 100).toFixed(2);
      changeDueDisplay.innerHTML += `<p>${changeDenomination[2]}: $${changeDenomination[1]}</p>`;
    }
  }
  resetChangeArr();
}

const makePurchase = () => {
  let customerFunds = parseFloat(userInput.value);
  userInput.value = "";
  
  if (customerFunds === price) {
    changeDueDisplay.classList.remove('hidden');
    changeDueDisplay.innerHTML = "No change due - customer paid with exact cash";
  } else if (customerFunds < price) {
    alert("Customer does not have enough money to purchase the item");
  } else {
    let changeAmount = customerFunds - price;
    changeAmount = Math.round(changeAmount * 100) / 100; // removes floating point oddities
    const purchaseSuccess = calculateChangeDue(changeAmount);
    
    if (purchaseSuccess) {
      displayCashInDrawer();
      displayChangeDue();
    } else {
      returnCashToDrawer();
    }
  }
}

const returnCashToDrawer = () => {
  changeDueDisplay.classList.remove('hidden');
  changeDueDisplay.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;

  for (let i = 0; i < cid.length; i++) {
    cid[i][1] += changeArr[i][1];
    cid[i][1] = Math.round(cid[i][1] * 100) / 100;
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
  return changeAmount === 0;
};

purchaseBtn.addEventListener('click', makePurchase);

displayPrice(price);
displayCashInDrawer();