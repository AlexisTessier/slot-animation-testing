const test = require('../test.util')

test({
	example: '01-css-switch-button',
	headless: false
}, async ({
	page,
	makeShot
}) => {
	await page.waitForFunction('typeof window.animate === "function"');
	await makeShot('initial');
});