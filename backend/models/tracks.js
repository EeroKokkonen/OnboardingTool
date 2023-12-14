const pool = require("../db/pool");

const tracks = {
  findByUserId: (uid) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          "SELECT t.id, t.name FROM tracks t JOIN users_has_tracks uht ON t.id = uht.tracks_id WHERE uht.users_id = ?",
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
          "SELECT * FROM tracks WHERE id = ?",
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
  addNewTrackAndTasks: (uid, trackName, taskData) =>
    new Promise((resolve, reject) => {
      pool.getConnection((getConnectionErr, connection) => {
        if (getConnectionErr) {
          return reject(getConnectionErr);
        }

        connection.beginTransaction((beginErr) => {
          if (beginErr) {
            connection.release();
            return reject(beginErr);
          }

          // Insert a new track for a user
          connection.query(
            "INSERT INTO tracks (name) VALUES (?)",
            [trackName],
            (trackErr, trackResult) => {
              if (trackErr) {
                return connection.rollback(() => {
                  connection.release();
                  reject(trackErr);
                });
              }

              const newTrackID = trackResult.insertId;

              // Update the users_has_tracks table
              const updateUserTrackQuery =
                "INSERT INTO users_has_tracks (users_id, tracks_id) VALUES (?, ?)";
              connection.query(
                updateUserTrackQuery,
                [uid, newTrackID],
                (updateErr) => {
                  if (updateErr) {
                    return connection.rollback(() => {
                      connection.release();
                      reject(updateErr);
                    });
                  }

                  // Insert new tasks for the newly created track
                  const tasksInsertQuery =
                    "INSERT INTO tasks (name, description, media_link, is_done, tracks_id) VALUES ?";
                  const tasksDataValues = taskData.map((task) => [
                    task.name,
                    task.description,
                    task.media_link ?? "",
                    "0",
                    newTrackID,
                  ]);

                  connection.query(
                    tasksInsertQuery,
                    [tasksDataValues],
                    (tasksErr) => {
                      if (tasksErr) {
                        return connection.rollback(() => {
                          connection.release();
                          reject(tasksErr);
                        });
                      }

                      // Commit the transaction
                      connection.commit((commitErr) => {
                        if (commitErr) {
                          return connection.rollback(() => {
                            connection.release();
                            reject(commitErr);
                          });
                        }

                        connection.release();
                        resolve("New track and tasks added successfully");
                      });
                    }
                  );
                }
              );
            }
          );
        });
      });
    }),
};

module.exports = tracks;
