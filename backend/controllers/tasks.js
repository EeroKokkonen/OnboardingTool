const tracks = require("../models/tracks");
const tasks = require("../models/tasks");



const getTasksByTrackId = async (req, res) => {
    const trackId = req.params.trackId;

    try {
    
        // TODO: Varmista, että käyttäjä joka hakee taskeja omistaa taskit
        const trackResponse = await tasks.findByTrackId(trackId);
        console.log(trackResponse);
        res.status(200).send(trackResponse);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};


module.exports = {
    getTasksByTrackId
};