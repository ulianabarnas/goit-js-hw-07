import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const imagesMarkup = createImageGalleryMarkup(galleryItems);

galleryContainer.innerHTML = imagesMarkup;

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
  const originalSrc = imageEl.dataset.source;
  const isImageEl = imageEl.classList.contains("gallery__image");

  if (!isImageEl) return;

  const instance = basicLightbox.create(
    `
    <img src="${originalSrc}" width="800" height="600">
`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscKeyDown);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscKeyDown);
      },
    }
  );

  instance.show();

  function onEscKeyDown(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
