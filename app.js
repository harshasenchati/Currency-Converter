let btn = document.querySelector("form button");
let apiKey = "e2896a2cd15985af1af407cd";
let msgContainer1 = document.querySelector(".msg1");
let msgContainer2 = document.querySelector(".msg2");
const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let optionEle = document.createElement("option");
    optionEle.innerText = currCode;
    optionEle.value = currCode;
    select.append(optionEle);
    if (select.name === "from" && currCode === "USD") {
      optionEle.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      optionEle.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let fromCurr = document.querySelector(".from select");
  let toCurr = document.querySelector(".to select");
  let fromCurrVal = fromCurr.value;
  let toCurrVal = toCurr.value;
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrVal}/${toCurrVal}/${amtVal}
  `;
  let response = await fetch(BASE_URL);
  let data = await response.json();
  const conversionRate = data.conversion_rate;
  let totalAmount = data.conversion_result;
  console.log(totalAmount);
  msgContainer1.innerHTML = `1 ${fromCurrVal}=${conversionRate} ${toCurrVal}`;
  msgContainer2.innerHTML = `${amtVal} ${fromCurrVal}=${totalAmount} ${toCurrVal}`;
});
