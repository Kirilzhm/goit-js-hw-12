import axios from 'axios';

const apiKey = '45524929-4d44ab8f504de5084895de9cf';
const baseUrl = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                key: apiKey,
                q: query,
                image_type: `photo`,
                orientation: `horizontal`,
                safesearch: true,
                page: page,
                per_page: perPage
            }
        });

        return response.data;
    } catch (error) {
        console.error("The error is:", error);
        throw error;
    }
}