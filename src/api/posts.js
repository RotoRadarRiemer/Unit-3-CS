import { BASE_URL } from "./config";

export const fetchPosts = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { data } = await response.json();
  
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
  
      return data.posts;
    } catch (error) {
      console.error("There was an error fetching posts", error);
      return null;
    }
  };
  

export async function fetchAllPosts(token) {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.post; 
    } else {
      console.error('Failed to fetch posts', await response.json());
      return [];
    }

  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
}
