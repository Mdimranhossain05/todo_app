const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const todoSchema = require("./todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//Get all the todos
router.get("/", async(req, res) => {
    await Todo.find({status: "active"},{_id: 0, __v: 0})
    .then((data) => {res.status(200).json(data)})
    .catch(err => res.status(500).json({"error" : err.message}));
});

//Get one of the todos
router.get("/:id", async(req, res) => {
    await Todo.findById({_id: req.params.id}, {_id: 0, __v: 0})
    .then((data) => {res.status(200).json(data)})
    .catch(err => res.status(500).json({"error" : err.message}));
});

//Post one todo
router.post("/", async(req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save()
    .then(() => {res.status(200).json({"message" : "Successfully data inserted to databse"})})
    .catch(err => res.status(500).json({"error" : err.message}));
});

//Post many todos
router.post("/all", async(req, res) => {
    await Todo.insertMany(req.body)
    .then(() => {res.status(200).json({"message" : "Todos were successfully inserted to databse"})})
    .catch(err => res.status(500).json({"error" : err.message}));
});

//Update one todos
router.put("/:id", async(req, res) => {
    const updates = req.body
    const oldData = await Todo.findById({_id: req.params.id}, {_id: 0, __v: 0});
    const updatedData = {...{...oldData}._doc , ...updates};

    await Todo.findByIdAndUpdate({_id: req.params.id}, {$set: {
        ...updatedData
    }}, {new: true})
    .then((data) => {console.log(data);res.status(200).json({"message" : "Todo was successfully updated"})})
    .catch(err => res.status(500).json({"error" : err.message}));
}
);

//Delete one todos
router.delete("/:id", async(req, res) => {
    await Todo.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: "Item deleted successfully"})})
    .catch(err => res.status(500).json({"error" : err.message}));
});

//Delete one todos
router.delete("/", async(req, res) => {
    await Todo.deleteMany()
    .then(() => {res.status(200).json({message: "All items deleted successfully"})})
    .catch(err => res.status(500).json({"error" : err.message}));
});

module.exports = router