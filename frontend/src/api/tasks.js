export const getTasksByTrackId = async (token, trackId) => {
  const res = await fetch(`http://localhost:3001/api/tasks/${trackId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await res.json();
};

export const getTaskById = async (token, id) => {
  const res = await fetch(`http://localhost:3001/api/tasks/task/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await res.json();
};

export const updateTask = async (token, id, isDone) => {
  console.log(id, isDone);
  const res = await fetch(`http://localhost:3001/api/tasks`, {
    method: "PUT",
    body: JSON.stringify({ id: id, isDone: isDone }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return await res.json();
};
