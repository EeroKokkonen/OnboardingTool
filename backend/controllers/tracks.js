const tracks = require("../models/tracks");

const getTracksByUserId = async (req, res) => {
  const { userId, isAdmin } = req.userData;
  const uid = req.params.uid;

  if (uid !== userId && !isAdmin) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const response = await tracks.findByUserId(uid);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  getTracksByUserId,
};
