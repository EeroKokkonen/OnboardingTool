const tracks = require("../models/tracks");
const tasks = require("../models/tasks");



const getTasksByTrackId = async (req, res) => {
    const trackId = req.params.trackId;
    try {
        // TODO: Varmista, että käyttäjä joka hakee taskeja omistaa taskit
        const trackResponse = await tasks.findByTrackId(trackId);
        res.status(200).send(trackResponse);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

const getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await tasks.findTaskById(id);
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

const updateTask = async (req, res) => {
    const {id, isDone} = req.body;
    try {
        const response = await tasks.updateTaskIsDone(id, isDone);
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

module.exports = {
    getTasksByTrackId,
    getTaskById,
    updateTask
};