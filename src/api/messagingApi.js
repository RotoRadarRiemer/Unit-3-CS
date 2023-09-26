import { BASE_URL } from "./config";

export const postMessage = async (postId, token, content) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content
          }
        })
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
}
