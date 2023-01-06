const express = require("express");
// const fs = require("fs");
const tracts = express();
const tractsArray = require("../models/tracts.js");
const { v4: uuidv4 } = require("uuid");

const val = (req, res, next) => {
  console.log("body", req.body);
  if (req.body.amount === 300) {
    next();
  } else {
    res.redirect("https://budget-app-server-1vwp.onrender.com/error");
  }
};

//function to write to the text file
// function updatePersistingData() {
//   let stream = fs.createWriteStream("tracts.txt");
//   stream.write(JSON.stringify(tractsArray));
//   stream.end();
// }
// INDEX
tracts.get("/", (req, res) => {
  console.log("hit get route");
  res.status(200).json(tractsArray);
  // function readData(err, data) {
  //   const pData = JSON.parse(data);
  //   if (data && pData.length > 0) res.status(200).json(pData);
  //   else {
  //     updatePersistingData();
  //     res.status(200).json(tractsArray);
  //   }
  // }
  // const stream = fs.readFile("tracts.txt", "utf8", readData);
});

// SHOW
tracts.get("/:index", (req, res) => {
  const found = tractsArray.find((item) => item.id === req.params.index);

  if (found) {
    const i = tractsArray.indexOf(found);
    res.json(tractsArray[i]);
  } else {
    res.status(404).redirect("/404");
  }
});

// UPDATE
tracts.put("/:index", async (req, res) => {
  const found = await tractsArray.find((item) => item.id === req.params.index);

  if (found) {
    const i = await tractsArray.indexOf(found);
    tractsArray[i] = { id: req.params.index, ...req.body };
    // updatePersistingData();

    res.status(200).json(tractsArray[i]);
  } else {
    res.status(404).redirect("/404");
  }
});

// CREATE
tracts.post("/", val, (req, res) => {
  let newBody = { id: uuidv4(), ...req.body };
  tractsArray.push(newBody);
  // updatePersistingData();

  res.status(200).json(tractsArray[tractsArray.length - 1]);
});

// DELETE
tracts.delete("/:index", async (req, res) => {
  const found = await tractsArray.find((item) => item.id === req.params.index);
  if (found) {
    const i = tractsArray.indexOf(found);
    await tractsArray.splice(i, 1);
    // await updatePersistingData();
    res.status(200).json({ message: "success" });
  } else {
    res.status(404).redirect("/404");
  }
});

module.exports = tracts;
