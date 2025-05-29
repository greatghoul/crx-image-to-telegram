// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get('imageUrl');
const pageUrl = urlParams.get('pageUrl');

// Get form elements
const previewImage = document.querySelector('.image-preview img');
const captionInput = document.querySelector('.caption');
const publishButton = document.querySelector('button');
const originalButtonText = publishButton.textContent;

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

function setButtonMessage(message, { status = '', disabled = null } = {}) {
  publishButton.textContent = message;
  publishButton.classList.remove('success', 'error');
  
  if (status) {
    publishButton.classList.add(status);
  }

  if (disabled !== null) {
    publishButton.disabled = disabled;
  }
}

function handlePublish() {
  setButtonMessage('Publishing...', { disabled: true });

  const caption = captionInput.value.trim();
  const message = {
    type: 'publish',
    data: { imageUrl, caption },
  };
  chrome.runtime.sendMessage(message, response => {
    if (response.success) {
      setButtonMessage('Published!', { status: 'success', disabled: true });
      setTimeout(() => window.close(), 2000);
    } else { 
      setButtonMessage(response.error || 'Failed to publish', { status: 'error', disabled: false });
      setTimeout(() => setButtonMessage(originalButtonText), 3000);
    }
  });
}

publishButton.addEventListener('click', handlePublish);

async function init () {
  // preview image.
  previewImage.src = imageUrl;

  // set image caption, if clipboard has text, use it, otherwise use the page URL.
  const clipboardText = await readClipboardText();
  captionInput.value = clipboardText || pageUrl;
  captionInput.focus();

  try {
    await navigator.clipboard.writeText('');
  } catch (err) {
    console.error('Failed to clear clipboard: ', err);
  }
}

init();
