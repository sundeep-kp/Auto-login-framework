# Auto-login-framework

Currently constructed **especially for Cyberoam login for IIITnr internet portal**.  
*May develop into a multi-tool later on… who knows.*

---

## Instructions to Install

Make sure you **download this entire directory**:
<br>
cyberoam-autologin/
├── install.sh # installer script (sets up everything)
├── uninstall.sh # removes files, disables timer/service)
├── cyberoam-login.js # main Node.js autologin script
├── cyberoam-login.service # systemd service unit
├── cyberoam-login.timer # systemd timer unit
<br>
<br>

The last three files will be **automatically copied/moved to their required locations**.  
*You don’t have to touch a damn thing (trust me :D).*

Right click and **run `install.sh` as a program** or from your terminal.

---

### Note:-

*Bhai, aur kuchh suggestions hai to bata dena merko, bas 150 rupiya lega mai.*  
*You may provide me with suggestions for the project.*

---

Optional settings-
#if you don't want any pop ups , change this setting to true (search using ctrl+f inside the cyberoam-login.js file) :- 
headless: false

### If stuff doesn't work, try these out:

#Make `install.sh` executable:

bash

chmod +x install.sh
- Make sure your **`cyberoam-login.js`** is okay using the **system-installed Chrome/Chromium**  
  *(usually `/usr/bin/chromium-browser` or `/usr/bin/google-chrome`)*.

 #Edit the part that says:

js
const BROWSER_PATHS = [
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/snap/bin/chromium'
];
If Puppeteer can’t find it, then you specify the path in executablePath when launching:

const browser = await puppeteer.launch({
  headless: false
  executablePath: '/usr/bin/chromium-browser' // adjust as needed
});


You may add your current browser (Brave, Vivaldi, Edge, etc.)
(they should work given the Chromium framework, but I dunno — I ChatGPT-ed the entire code, who am I to judge 😅)


