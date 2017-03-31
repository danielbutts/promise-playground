const rp = require('request-promise')

const BASE_URL = 'http://service.dice.com/api/rest/jobsearch/v1/simple.json'

let query = "text=angular&city=seattle,%20wa&pgcnt=7"

function constructURL (query) {
  return `${BASE_URL}?${query}`
}

let url = constructURL (query);
console.log(url);

rp({
  uri: url,
  method: 'GET',
  json: true
})
.then(function(result) {
  let promises = [];
  for (let item of result.resultItemList) {

    let options = {
      uri: 'item.detailUrl',
      method: 'GET',
      json: true
    };
    let p = rp(item.detailUrl);
    promises.push(p);
  }
  Promise.all(promises).then(values => {
    let newArr = values.map(val => val.substring(0,50))
    console.log(newArr);
  });
})
.catch(function(error) {
  console.error(error);
})
