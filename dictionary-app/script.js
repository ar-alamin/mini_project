const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
const inputBox = document.querySelector(".inputBox");

// show the word meaning
async function getWordInfo(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    // console.log(data);

    let definitions = data[0].meanings[0].definitions[0];
    let synonym = data[0].meanings[0].synonyms;

    resultDiv.innerHTML = `
      <h2><strong>Word: </strong>${data[0].word}</h2>
      <p class="part-of-spech">${data[0].meanings[0].partOfSpeech}</p>
      <p><strong>Meaning: </strong>${
        definitions.definition === undefined
          ? "Not Found"
          : definitions.definition
      }</p>
      <p><strong>Example: </strong>${
        definitions.example === undefined ? "Not Found" : definitions.example
      }</p>
      <p><strong>Antonyms: </strong></p>
  `;

    // featching antonyms
    if (definitions.antonyms.length === 0) {
      resultDiv.innerHTML += `<span>Not Found</span>`;
    } else {
      for (let i = 0; i < definitions.antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }

    resultDiv.innerHTML += `
      <p><strong>Synonyms: </strong></p>
    `;

    // featching synonyms
    if (synonym.length === 0) {
      resultDiv.innerHTML += `<span>Not Found</span`;
    } else {
      for (let i = 0; i < synonym.length; i++) {
        resultDiv.innerHTML += `<li>${synonym[i]}</li>`;
      }
    }

    // adding read more button
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (err) {
    resultDiv.innerHTML += `<p>Sorry, the word could not be found!</p>`;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  getWordInfo(inputBox.value);
});
