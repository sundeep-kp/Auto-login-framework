// ~/bin/cyberoam-login.js
// Cyberoam auto-login using puppeteer (CommonJS). Reads creds from ~/.portal-creds

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer'); // you installed puppeteer with PUPPETEER_SKIP_DOWNLOAD=true
const os = require('os');

const CRED_FILE = path.join(os.homedir(), '.portal-creds');
const PORTAL_URL = 'https://cyberoam.iiitnr.edu.in:8090/httpclient.html'; // change only if your portal URL is different

// List of possible Chromium/Chrome executable paths (checked in order)
const BROWSER_PATHS = [
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/snap/bin/chromium'
];

function findBrowserExecutable() {
  for (const p of BROWSER_PATHS) {
    try { if (fs.existsSync(p)) return p; } catch (e) {}
  }
  // last-ditch: check environment
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  return null;
}

// backward-compatible sleep that works for old/new puppeteer
async function sleep(ms) {
  if (typeof globalThis.setTimeout === 'function') {
    return new Promise(res => setTimeout(res, ms));
  } else {
    return new Promise(res => setTimeout(res, ms));
  }
}

async function haveInternet() {
  const { execSync } = require('child_process');
  try {
    execSync('ping -c1 -W2 8.8.8.8', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

(async () => {
  if (!fs.existsSync(CRED_FILE)) {
    console.error(`Credential file missing: ${CRED_FILE}`);
    console.error(`Create it with:\nPORTAL_USER='yourusername'\nPORTAL_PASS='yourpassword'\nchmod 600 ~/.portal-creds`);
    process.exit(1);
  }

  const credsText = fs.readFileSync(CRED_FILE, 'utf8');
  // very simple parse; expects PORTAL_USER and PORTAL_PASS lines like earlier instructions
  const mUser = credsText.match(/PORTAL_USER\s*=\s*['"]?([^'"\n]+)['"]?/);
  const mPass = credsText.match(/PORTAL_PASS\s*=\s*['"]?([^'"\n]+)['"]?/);
  if (!mUser || !mPass) {
    console.error('Could not parse PORTAL_USER / PORTAL_PASS in ~/.portal-creds');
    process.exit(1);
  }
  const username = mUser[1].trim();
  const password = mPass[1].trim();

  if (await haveInternet()) {
    console.log('Internet already available — nothing to do.');
    process.exit(0);
  }

  const executablePath = findBrowserExecutable();
  if (!executablePath) {
    console.error('No Chromium/Chrome binary found. Install chromium or set CHROME_BIN env var.');
    process.exit(1);
  }
  console.log('Using browser at:', executablePath);

  // selector candidates: common Cyberoam portals use these but yours may differ
  const usernameSelectors = ['#username', 'input[name=username]', '#txtUsername', 'input[name=user]'];
  const passwordSelectors = ['#password', 'input[name=password]', '#txtPassword', 'input[name=passwd]'];
  const loginButtonSelectors = ['#loginbutton.button', '#btnLogin', 'input[type=submit]', 'button[type=submit]', 'input[name=Login]'];

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');

    console.log('Opening portal URL:', PORTAL_URL);
    await page.goto(PORTAL_URL, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => {
      console.warn('Initial goto failed:', e.message);
    });

    // try to find username field
    let found = false;
    for (const sel of usernameSelectors) {
      if (await page.$(sel)) {
        await page.focus(sel);
        await page.click(sel, { clickCount: 3 }).catch(() => {});
        await page.type(sel, username, { delay: 50 });
        console.log('Found username selector:', sel);
        found = true;
        break;
      }
    }
    if (!found) {
      console.warn('Username field not auto-detected. Inspect page and update selectors.');
    }

    found = false;
    for (const sel of passwordSelectors) {
      if (await page.$(sel)) {
        await page.focus(sel);
        await page.click(sel, { clickCount: 3 }).catch(() => {});
        await page.type(sel, password, { delay: 50 });
        console.log('Found password selector:', sel);
        found = true;
        break;
      }
    }
    if (!found) {
      console.warn('Password field not auto-detected. Inspect page and update selectors.');
    }

    // find and click login
    found = false;
    for (const sel of loginButtonSelectors) {
      const el = await page.$(sel);
      if (el) {
        await el.click().catch(() => {});
        console.log('Clicked login button using selector:', sel);
        found = true;
        break;
      }
    }
    if (!found) {
      console.warn('Login button not auto-detected. Trying to submit forms on the page.');
      // as fallback, try to submit the first form
      const forms = await page.$$('form');
      if (forms.length > 0) {
        try { await page.evaluate(() => document.forms[0].submit()); console.log('Submitted first form as fallback'); } catch (e) {}
      }
    }

    // wait for navigation or some time for AJAX to complete
    if (typeof page.waitForTimeout === 'function') {
      await page.waitForTimeout(5000);
    } else if (typeof page.waitFor === 'function') {
      await page.waitFor(5000);
    } else {
      await sleep(5000);
    }

    // check internet now
    if (await haveInternet()) {
      console.log('Portal login appears successful — internet is up.');
      fs.appendFileSync(path.join(os.homedir(), 'portal-login.log'), `${new Date().toString()}: login successful\n`);
      await browser.close();
      process.exit(0);
    } else {
      console.error('Portal login attempt failed — still no internet.');
      fs.appendFileSync(path.join(os.homedir(), 'portal-login.log'), `${new Date().toString()}: login FAILED\n`);
      // save screenshot for debugging
      try { await page.screenshot({ path: path.join(os.homedir(), 'portal-debug.png'), fullPage: true }); console.log('Saved portal-debug.png'); } catch(e){}
      await browser.close();
      process.exit(2);
    }

  } catch (err) {
    console.error('Error during login script:', err);
    if (browser) try { await browser.close(); } catch(e) {}
    process.exit(3);
  }
})();

