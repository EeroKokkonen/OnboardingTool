const pool = require("../db/pool");

const tasks = {
  findByTrackId: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          "SELECT * FROM tasks WHERE tracks_id = ?",
          [id],
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            console.log(id);
            resolve(result);
          }
        );
      });
    }),
  findTaskById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          "SELECT * FROM tasks WHERE id = ?",
          [id],
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            console.log(id);
            resolve(result);
          }
        );
      });
    }),
  updateTaskIsDone: (taskId, isDone) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query(
          "UPDATE tasks SET is_done = ? WHERE id = ?",
          [isDone, taskId],
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

module.exports = tasks;
