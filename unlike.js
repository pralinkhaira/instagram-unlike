const UNLIKE_BATCH_SIZE = 80;
const DELAY_BETWEEN_ACTIONS_MS = 1500;
const DELAY_BETWEEN_CHECKBOX_CLICKS_MS = 100;
const DELAY_AFTER_SELECT_CLICK_MS = 2000;
const DELAY_AFTER_ITEMS_VISIBLE_MS = 2000;
const MAX_RETRIES = 60;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const waitForElement = async (selector, timeout = 30000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const el = document.querySelector(selector);
        if (el) return el;
        await delay(100);
    }
    throw new Error(`Element "${selector}" not found within ${timeout}ms`);
};

const clickElement = async (element) => {
    if (!element) throw new Error("Element not found");
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.click();
};

const waitForSelectButton = async () => {
    for (let i = 0; i < MAX_RETRIES; i++) {
        const selectSpan = [...document.querySelectorAll("span")]
            .find(el => el.textContent.trim().toLowerCase() === "select");
        if (selectSpan) return;
        await delay(1000);
    }
    throw new Error("Select button not found after waiting");
};

const unlikeSelectedItems = async () => {
    try {
        const unlikeButton = [...document.querySelectorAll("span")]
            .find(el => el.textContent.trim() === "Unlike");
        if (!unlikeButton) throw new Error("Unlike button not found");
        await clickElement(unlikeButton);
        await delay(DELAY_BETWEEN_ACTIONS_MS);
        const confirmButton = await waitForElement('button[tabindex="0"]');
        await clickElement(confirmButton);
    } catch (err) {
        console.error("Error while unliking:", err.message);
    }
};

const scrollAndWaitForMoreItems = async (previousCount) => {
    window.scrollTo(0, document.body.scrollHeight);
    for (let i = 0; i < 10; i++) {
        await delay(1000);
        const currentCount = document.querySelectorAll('[aria-label="Toggle checkbox"]').length;
        if (currentCount > previousCount) return true;
    }
    return false;
};

const removeLikes = async () => {
    try {
        while (true) {
            const selectSpan = [...document.querySelectorAll("span")]
                .find(el => el.textContent.trim().toLowerCase() === "select");
            if (!selectSpan) throw new Error("Select button not found");
            await clickElement(selectSpan.parentElement);
            await delay(DELAY_AFTER_SELECT_CLICK_MS);

            const checkboxes = document.querySelectorAll('[aria-label="Toggle checkbox"]');
            if (checkboxes.length === 0) {
                const loaded = await scrollAndWaitForMoreItems(0);
                if (!loaded) {
                    console.log("🚫 No more items to unlike.");
                    break;
                }
                continue;
            }

            await delay(DELAY_AFTER_ITEMS_VISIBLE_MS);

            for (let i = 0; i < Math.min(UNLIKE_BATCH_SIZE, checkboxes.length); i++) {
                await clickElement(checkboxes[i]);
                await delay(DELAY_BETWEEN_CHECKBOX_CLICKS_MS);
            }

            await delay(DELAY_BETWEEN_ACTIONS_MS);
            await unlikeSelectedItems();
            await delay(DELAY_BETWEEN_ACTIONS_MS);
            await waitForSelectButton();
            await delay(DELAY_BETWEEN_ACTIONS_MS);
        }
    } catch (err) {
        console.error("Error in removeLikes:", err.message);
    }
};

(async () => {
    console.log("🚀 Starting Instagram Unlike Script...");
    await removeLikes();
    console.log("✅ Finished unliking all visible posts.");
})();
