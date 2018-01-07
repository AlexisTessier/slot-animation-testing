const test = require('../test.util')

test({
	example: '02-js-switch-button',
	headless: true
}, async ({
	page,
	makeShot
}) => {
	await page.waitForFunction('typeof window.render === "function"');
	await makeShot('initial');

	for(let i = 0; i <= 10; i++){
		await page.evaluate(async (i) => {
			window.render(i/10);
		}, i);
		await makeShot('on-'+i);
	}
});