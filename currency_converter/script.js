const result = document.querySelector(".result");
const from_amount_element = document.querySelector(".from-amount");
const converted_amount_element = document.querySelector(".converted-amount");
const from_currency_element = document.querySelector(".from-currency");
const to_currency_element = document.querySelector(".to-currency");

// array to populate the select tags with these countries
const contries = [
  { code: "AUD", name: "Australian Dollar" },
  { code: "AED", name: "Utd. Arab Emir. Dirham" },
  { code: "AFN", name: "Afgan Afgani" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "DKK", name: "Danish Krone" },
  { code: "GBP", name: "Great British Pound" },
  { code: "INR", name: "Indian Rupee" },
  { code: "KRW", name: "Korean Won" },
  { code: "MVR", name: "Maldive Rufiyaa" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "OMR", name: "Omani Rial" },
  { code: "PKR", name: "Pakistan Rupee" },
  { code: "QAR", name: "Qatari Rial" },
  { code: "RUB", name: "Russian Roble" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "USD", name: "Amrican Dollar" },
];

// showing countries from array to select tag
contries.forEach((country) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = option2.value = country.code;
  option1.textContent =
    option2.textContent = `${country.code} (${country.name})`;

  from_currency_element.appendChild(option1);
  to_currency_element.appendChild(option2);

  // setting default value
  from_currency_element.value = "USD";
  to_currency_element.value = "BDT";
});

// fetching api exchange rate
async function getExchangeRate() {
  const amount = parseFloat(from_amount_element.value);
  const fromCurrency = from_currency_element.value;
  const toCurrency = to_currency_element.value;
  result.textContent = "Fetching exchange rates.....";

  // fetch data from api
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);

    converted_amount_element.value = convertedAmount;

    converted_amount_element.value = convertedAmount;
    result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (err) {
    console.log(err);
  }
}

// fetching exchange rate whent user input the amount
from_amount_element.addEventListener("input", getExchangeRate);

// fetching exchange rate whent user input the amount
from_currency_element.addEventListener("change", getExchangeRate);
to_currency_element.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);
