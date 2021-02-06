const express = require("express");
const router = express.Router();

// Import burger model to use its database functions
const burger = require("../models/burger");

// ROUTES:

// GET
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log("hbsObject", hbsObject);
    res.render("index", hbsObject);
  });
});

// POST
router.post("/api/burgers", (req, res) => {
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    // Respond with the ID of the new burger
    (result) => res.json({ id: result.insertId })
  );
});

// PUT
router.put("/api/burgers/:id", (req, res) => {
  const condition = `id=${req.params.id}`;
  console.log("condition", condition);
  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// Export router for server.js to use
module.exports = router;