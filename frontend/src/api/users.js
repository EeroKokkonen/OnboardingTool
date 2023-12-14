export const signUpUser = async ({ name, email, password, jobRole }) => {
  const res = await fetch(`http://localhost:3001/api/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      jobRole,
      password,
    }),
  });

  return await res.json();
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`http://localhost:3001/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return await res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`http://localhost:3001/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const getUserById = async (userId) => {
  const res = await fetch(`http://localhost:3001/api/users/${userId}`);
  return await res.json();
};
