let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let allNumbers = "0123456789";
let allSymbols = "!@#$%^&*-+_*/";

const inputSlider = document.querySelector("#inputSlider");
const sliderValue = document.querySelector("#sliderValue");
const passBox = document.querySelector("#passBox");
const lowercase = document.querySelector("#lowercase");
const uppercase = document.querySelector("#uppercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const submit = document.querySelector("#genBtn");
const copy = document.querySelector("#copyIcon");

// showing input slider
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", function () {
  sliderValue.textContent = inputSlider.value;
});

// click submit button
submit.addEventListener("click", function () {
  passBox.value = generatePassword();
});

// password generate function
function generatePassword() {
  let initialPass = "";
  let allChars = "";

  allChars += lowercase.checked ? lowerChars : "";
  allChars += uppercase.checked ? upperChars : "";
  allChars += numbers.checked ? allNumbers : "";
  allChars += symbols.checked ? allSymbols : "";

  for (let i = 0; i < inputSlider.value; i++) {
    initialPass += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return initialPass;
}

// copy the password
copy.addEventListener("click", function () {
  if (passBox.value != "" || passBox.value.length >= 1) {
    navigator.clipboard.writeText(passBox.value);
    copy.innerText = "check";
  }
});
