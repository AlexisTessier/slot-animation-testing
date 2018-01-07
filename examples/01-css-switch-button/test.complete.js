const test = require('../test.util')

test({
	example: '01-css-switch-button',
	headless: true
}, async ({
	page,
	makeShot
}) => {
	await page.waitForFunction('typeof window.animate === "function"');
	await makeShot('initial');

	await page.evaluate(async () => {
		window.animate(true);
	});
	await page.waitFor(180);
	await makeShot('on');

	await page.evaluate(async () => {
		window.animate(false);
	});
	await page.waitFor(180);
	await makeShot('off');
});