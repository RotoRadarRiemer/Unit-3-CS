import { BASE_URL } from "./config";

export const deleteUserPost = async (token, postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return await response.json();

  } catch (err) {
    console.error(err);
    throw err;
  }
}
