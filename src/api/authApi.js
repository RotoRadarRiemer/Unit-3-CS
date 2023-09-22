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
            username: 'jriemer61',
            password: 'Password'
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