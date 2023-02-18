import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const createListItemsMarkup = (items) => {
    return items.map(({preview, description, original}) => {
      return `
        <a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}">
        </a>`; 
    }).join('');
}

const galleryRef = document.querySelector('.gallery');

galleryRef.innerHTML = createListItemsMarkup(galleryItems);

new SimpleLightbox('.gallery__item', {captionsData: 'alt', captionDelay: 250, sourceAttr:"href"});