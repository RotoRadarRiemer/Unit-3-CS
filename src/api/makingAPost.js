import { BASE_URL } from "./config";

export const makePost = async (token, post) => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post
        })
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  };
  
  