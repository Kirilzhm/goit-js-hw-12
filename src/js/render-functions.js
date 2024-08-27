export function displayImages(images) {
    const gallery = document.querySelector('.gallery');

    images.forEach(image => {
        const imgElement = `
            <li class="image-card">
                <a href="${image.largeImageURL}">
                    <img src="${image.webformatURL}" alt="${image.tags}" />
                    <div class="info">
                        <p><span class="text-span">Likes</span> ${image.likes}</p>
                        <p><span class="text-span">Views</span> ${image.views}</p>
                        <p><span class="text-span">Comments</span> ${image.comments}</p>
                        <p><span class="text-span">Downloads</span> ${image.downloads}</p>
                    </div>
                </a>
            </li>`;
        gallery.insertAdjacentHTML('beforeend', imgElement);
    });
};

export function clearImages() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}