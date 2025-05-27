// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get('imageUrl');
const pageUrl = urlParams.get('pageUrl');

// Get form elements
const previewImage = document.querySelector('.image-preview img');
const captionInput = document.querySelector('.caption');

// Get the preview image element
if (imageUrl) {
    previewImage.src = imageUrl;
    previewImage.alt = 'Image to share';
} else {
    console.error('No image URL provided');
}

async function readClipboardText() {
  try {
    let text = await navigator.clipboard.readText();
    return text && text.trim();
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}

async function init () {
  // preview image.
  previewImage.src = imageUrl;

  // set image caption, if clipboard has text, use it, otherwise use the page URL.
  const clipboardText = await readClipboardText();
  captionInput.value = clipboardText || pageUrl;
  captionInput.focus();
}

init();
