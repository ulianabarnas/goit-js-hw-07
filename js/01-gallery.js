import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const imagesMarkup = createImageGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("afterbegin", imagesMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createImageGalleryMarkup(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>
    `;
    })
    .join("");
}

function onGalleryContainerClick(e) {
  e.preventDefault();
  const imageEl = e.target;

  const isImageEl = imageEl.classList.contains("gallery__image");

  if (!isImageEl) return;

  //const original = imageEl.dataset.source

  console.log(imageEl.dataset.source);
}
