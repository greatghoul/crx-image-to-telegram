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
    chrome.windows.create({
      url: `publisher.html?imageUrl=${imageUrl}`,
      type: 'popup',
      width: 500,
      height: 600
    });
  }
});
