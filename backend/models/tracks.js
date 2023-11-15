const pool = require("../db/pool");

const tracks = {

    findByUserId: (uid) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
            'SELECT t.id, t.name FROM tracks t JOIN users_has_tracks uht ON t.id = uht.tracks_id WHERE uht.users_id = ?',
          uid,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
    findByTrackId: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
            'SELECT * FROM tracks WHERE id = ?',
          id,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
};

module.exports = tracks;
