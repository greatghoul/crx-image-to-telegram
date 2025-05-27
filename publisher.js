// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get('imageUrl');

// Get the preview image element
const previewImage = document.querySelector('.image-preview img');

// Set the image source if imageUrl is provided
if (imageUrl) {
    previewImage.src = imageUrl;
    previewImage.alt = 'Image to share';
} else {
    console.error('No image URL provided');
}
