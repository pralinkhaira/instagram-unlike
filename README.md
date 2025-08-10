# Instagram Mass Unlike Script

A browser-based automation script to bulk-unlike posts (reels, photos) from your Instagram Likes activity page.  
Runs entirely in your browser console — no third-party apps, no password sharing.

⚠ **Use at your own risk**. Instagram may temporarily block your account if too many actions are done too quickly.

---

## Features
- Bulk-unlikes posts directly in your browser
- Configurable batch size & delays
- No need for API or third-party tools
- Works with Instagram's native Likes page

---

## How to Use
1. **Set Instagram Language to English**  
   Go to Instagram → Settings → Language → English

2. **Open the Likes Activity Page**  
   [https://www.instagram.com/your_activity/interactions/likes/](https://www.instagram.com/your_activity/interactions/likes/)

3. **Open Developer Console**
   - Chrome/Edge (Windows/Linux): `Ctrl + Shift + J`
   - Chrome/Edge (Mac): `Cmd + Option + J`
   - Firefox: `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac)
   - Safari: Enable Develop Menu in Preferences → Advanced, then `Cmd + Option + C`

4. **Paste and Run Script**
   - Copy all contents of `unlike.js`
   - Paste into the console
   - Press Enter

---

## Configuration
Inside `unlike.js`, you can adjust:
```javascript
const UNLIKE_BATCH_SIZE = 80;             // Items per batch
const DELAY_BETWEEN_ACTIONS_MS = 1500;    // Delay after actions (ms)
const DELAY_BETWEEN_CHECKBOX_CLICKS_MS = 100;
````

---

## Safety Tips

* Recommended: 200–300 unlikes per hour max
* Take breaks between runs
* Stop immediately if you get an "Action Blocked" message

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
