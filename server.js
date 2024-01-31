const express = require("express");
const fruits = require("./fruits");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/ping", (req, res) => {
  res.json("pong");
});

app.get("/someroute", (req, res) => {
  const numbersArray = [1, 2, 3, 4, 5];
  res.send(numbersArray);
});

app.get("/greet/:name", (req, res) => {
  res.send(`Why hello ${req.params.name}`);
});

app.get("/five", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});

app.get("/evens/:n", (req, res) => {
  // this is yeilding 10 times the expected results, this was because I didn't parseInt on line 27 for the parameter.
  const parameter = req.params.n;
  const number = isNaN(parseInt(parameter)) ? "Not a number" : parseInt(parameter);
  const numbersArray = [];
  if(!isNaN(number)) {
    for(let i = number; i > 0; i--) {
      i % 2 ? false : numbersArray.push(i);      
    }
    res.send(numbersArray);
  } else {
    res.send(number);
  }
});

app.get("/namelength/:name", (req, res) => {
  const name = req.params.name;
  res.json(name.length);
});

app.get("/fruits/sort", (req, res) => {
  const sortedFruits = fruits;
  sortedFruits.sort((firstValue, secondValue) => {
    if(firstValue.name < secondValue.name) {
      return -1;
    }
    if(firstValue.name > secondValue.name) {
      return 1;
    }
    return 0;
  });
  res.send(sortedFruits);
});

app.get("/fruits/:name", (req, res) => {
  const fruit = req.params.name;
  const found = fruits.find(value => value.name.toLocaleLowerCase() === fruit.toLowerCase());
  res.send(found);
});

app.get("/fruits", (req, res) => {
  res.send(fruits);
});

app.get('*', (req, res) => {
  res.send('404 Not Found')
})

app.listen(PORT, () => {
  console.log(`Serving up delicious fruits on port ${PORT}`);
});

