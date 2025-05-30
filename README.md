# Share Image to Telegram

A Chrome extension that allows you to share images directly to Telegram via context menu.

## Features

- Right-click on any image to send it to Telegram
- Add custom captions to your images
- Clean, modern UI
- Auto-detects and inserts clipboard content as caption
- Fallback to page URL if clipboard is empty

## Screenshot

![](https://i.ibb.co/0pCTJC4v/1111111.png)

## Installation

### From Source Code

1. Download or clone this repository
2. Configure your Telegram Bot settings (see below)
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top-right corner
5. Click "Load unpacked" and select the extension directory

## Configuration

Before using the extension, you need to set up a Telegram Bot and configure your settings:

1. Copy `settings.js.example` to `settings.js`
2. Edit `settings.js` and add your Telegram credentials:

```javascript
export const botToken = 'YOUR_BOT_TOKEN'; // Get from @BotFather
export const chatId = 'YOUR_CHAT_ID';     // Your Telegram chat ID
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
