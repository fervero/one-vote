const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const baseUrl = 'https://wybory2007.pkw.gov.pl/SJM/PL/WYN/W';
const districts = [1, 2, 3, 4, 5, 6, 7, 8];
const districtUrls = districts.map(district => `${baseUrl}/${district}.htm`);

const parseHTML = response => {
  const dom = new JSDOM(response);
  const document = dom.window.document;
  const relevantTable = document.querySelectorAll('#s0 tbody');
  const tmp = document.createElement('div');
  tmp.appendChild(relevantTable[1]);
  console.log(tmp.innerHTML);
};

districtUrls.forEach(url =>
  fetch(url)
    .then(response => response.text())
    .then(parseHTML)
);
