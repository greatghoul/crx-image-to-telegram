
import { botToken, chatId } from './settings.js';

async function imageToFile(imageUrl) {
  // Fetch the image as a Blob
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const contentType = response.headers.get('Content-Type');
  const ext = contentType ? contentType.split('/')[1].split(';')[0] : 'png';
  // Create a File from the Blob (Telegram API accepts Blob or File)
  return new File([blob], `image.${ext}`, { type: blob.type });
}

/**
 * Publishes an image to a Telegram chat using the Telegram Bot API's sendPhoto method.
 *
 * Uses the following Telegram Bot API endpoint:
 *   POST https://api.telegram.org/bot<token>/sendPhoto
 *   See: https://core.telegram.org/bots/api#sendphoto
 */
async function publishImageToTelegram(data, sendResponse) {
  try {
    const { imageUrl, caption } = data;
    const file = await imageToFile(imageUrl);

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', file);
    if (caption) {
      formData.append('caption', caption);
    }

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;
    const response = await fetch(apiUrl, { method: 'POST', body: formData });
    const json = await response.json();
    console.log(json);
    if (json.ok) {
      sendResponse({ success: true });
    } else {
      throw new Error(json.description || 'Failed to publish image');
    }
  } catch (error) {
    console.error('Failed to publish image to Telegram:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Create context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'shareToTelegram',
    title: 'Share to Telegram',
    contexts: ['image']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'shareToTelegram') {
    // Open publisher.html in a popup window
    const imageUrl = encodeURIComponent(info.srcUrl);
    const pageUrl = encodeURIComponent(tab.url);
    chrome.windows.create({
      url: `publisher.html?imageUrl=${imageUrl}&pageUrl=${pageUrl}`,
      type: 'popup',
      width: 500,
      height: 600
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'publish') {
    publishImageToTelegram(message.data, sendResponse);
    return true; // Indicates async response
  }
});
