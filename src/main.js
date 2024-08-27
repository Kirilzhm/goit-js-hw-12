import { fetchImages } from './js/pixabay-api.js';
import { displayImages, clearImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import simpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.input-text');
const loader = document.querySelector('.loader');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox = new simpleLightbox('.gallery a');

let query = ''; 
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    query = input.value.trim(); 
    page = 1;

    if (query === '') {
        iziToast.error({
            title: `Error`,
            message: `Please enter a search query.`,
            position: `topRight`,
        });
        return;
    }

    loader.classList.remove(`is-hidden`);
    loadMoreBtn.classList.add('is-hidden');
    clearImages();

    try {
        const data = await fetchImages(query, page, perPage);

        loader.classList.add(`is-hidden`); 

        if (data.hits.length === 0) {
            iziToast.error({
                title: `No results`,
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: `topRight`,
            })
        } else {
            totalHits = data.totalHits;
            displayImages(data.hits);
            lightbox.refresh();
            if (page * perPage < totalHits) {
                loadMoreBtn.classList.remove('is-hidden');
            }
        }
    } catch (error) {
        loader.classList.add('is-hidden');
        iziToast.error({
            title: `Error`,
            message: `An error occurred while fetching images. Please try again later.`,
            position: `topRight`,
        });
        console.error("The error is:", error);
    }
}); 

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    loader.classList.remove('is-hidden');
    loadMoreBtn.classList.add('is-hidden');

    try {
        const data = await fetchImages(query, page, perPage);

        loader.classList.add('is-hidden');

        displayImages(data.hits);
        lightbox.refresh();

        const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        if (page * perPage >= totalHits) {
            loadMoreBtn.classList.add('is-hidden');
            iziToast.info({
                title: `End of results`,
                message: `We're sorry, but you've reached the end of search results.`,
                position: `topRight`,
            });
        } else {
            loadMoreBtn.classList.remove('is-hidden');
        }
    } catch (error) {
        loader.classList.add('is-hidden');
        iziToast.error({
            title: `Error`,
            message: `An error occurred while fetching more images. Please try again later.`,
            position: `topRight`,
        });
        console.error("The error is:", error);
    }
});
