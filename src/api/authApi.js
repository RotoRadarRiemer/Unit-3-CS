import { BASE_URL } from "./config";

export async function registerUser(username, password) {
  try {
    const response = await fetch(
      `${BASE_URL}/users/register`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(
      `${BASE_URL}/users/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

export const getCurrentUserDetails = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    }
    throw new Error(result.error);
  } catch (err) {
    console.error(err);
    throw err;
  }
};