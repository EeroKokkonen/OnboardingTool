export const getTracksByUserId = async (token, userId) => {
  const res = await fetch(`http://localhost:3001/api/tracks/${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await res.json();
};
