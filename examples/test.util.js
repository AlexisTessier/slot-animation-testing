const path = require('path')
const assert = require('assert')

const fs = require('fs-extra')
const chalk = require('chalk')
const puppeteer = require('puppeteer')
const BlinkDiff = require('blink-diff')

const shotdir = id => path.join(__dirname, '../snapshots', id);
const shotref = id => path.join(shotdir(id), `${id}.ref.png`);
const shottest = id => path.join(shotdir(id), `${id}.test.png`);
const shotdiff = id => path.join(shotdir(id), `${id}.diff.png`);

async function makeDiff(id, threshold){
	const diff = new BlinkDiff({
		imageAPath: shotref(id),
		imageBPath: shottest(id),
		thresholdType: BlinkDiff.THRESHOLD_PIXEL,
		threshold,
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

async function makeShot(page, id, threshold) {
	await fs.ensureDir(path.dirname(shottest(id)));
	await page.screenshot({path: shottest(id)});
	
	const refExists = await fs.pathExists(shotref(id));
	if(!refExists){
		await fs.copy(shottest(id), shotref(id));
	}
	else{
		await makeDiff(id, threshold);
	}
}

async function test({
	example,
	headless = true,
	protocol = 'http',
	host = '192.168.1.27',
	port = '3000',
	file = 'wip.html'
}, callback){
	assert(typeof example === 'string');

	const url = `${protocol}://${host}:${port}/${example}/${file}`;

	const browser = await puppeteer.launch({headless});
	const page = await browser.newPage();
	await page.goto(url);

	try{
		await callback({page, makeShot: (id, threshold = 100) => makeShot(page, path.join(example, id), threshold)});
		process.stdout.write(chalk.green('Tests successfull')+'\n');
	}
	catch(err){
		process.stderr.write(chalk.red(err.message)+'\n');
		process.exitCode = 1;
	}
	finally{
		await browser.close();
	}
}

module.exports = test;