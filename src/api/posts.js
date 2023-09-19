import { BASE_URL } from "./config";

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
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
