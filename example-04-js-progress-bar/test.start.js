const path = require('path')
const assert = require('assert')

const fs = require('fs-extra')
const chalk = require('chalk')
const puppeteer = require('puppeteer')
const BlinkDiff = require('blink-diff')

const url = "http://192.168.1.27:3000/example-01-css-switch/index-todo.wip.html";
const shotdir = id => path.join(__dirname, 'snapshots', id);
const shotref = id => path.join(shotdir(id), `${id}.ref.png`);
const shottest = id => path.join(shotdir(id), `${id}.test.png`);
const shotdiff = id => path.join(shotdir(id), `${id}.diff.png`);

async function makeDiff(id){
	const diff = new BlinkDiff({
		imageAPath: shotref(id),
		imageBPath: shottest(id),
		thresholdType: BlinkDiff.THRESHOLD_PIXEL,
		imageOutputPath: shotdiff(id)
	});

	const message = [
		`A visual change was detected during the visual regression check "${id}".`,
    `You can see more data in "${shotdir(id)}". Just remove the ${shotref(id)}`,
    `image and rerun the test if the change is expected.`
  ].join('');

	const diffed = new Promise(resolve => {
		diff.run((error, result) => {
			if (error) {
				resolve({
					status: {
						ok: false,
						refCreated: false,
						error,
						diffResult: result
					},
					message: `Error happened while diffing "${id}" : ${error.message}`
				})
			}
			else if(!diff.hasPassed(result.code)){
				resolve({
					status: {
						ok: false,
						refCreated: false,
						error: null,
						diffResult: result
					},
					message
				})
			}
			else{
				resolve({
					status: {
						ok: true,
						refCreated: false,
						error: null,
						diffResult: result
					},
					message
				})
			}
		});
	});

	return diffed.then(diff => assert(diff.status.ok, diff.message));
}

async function test(callback){
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try{
		await callback(page);
	}
	catch(err){
		console.log(chalk.red(err.message));
	}
	finally{
		await browser.close();
	}
}

async function makeShot(page, id) {
	await fs.ensureDir(path.dirname(shottest(id)));
	await page.screenshot({path: shottest(id)});
	
	const refExists = await fs.pathExists(shotref(id));
	if(!refExists){
		await fs.copy(shottest(id), shotref(id));
	}
	else{
		await makeDiff(id);
	}
}

test(async page => {
	await page.goto(url);
	await page.waitForFunction('typeof window.switchComponent === "object"');
	await makeShot(page, 'base');
});