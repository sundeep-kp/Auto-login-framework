# Auto-login-framework

Currently constructed **especially for Cyberoam login for IIITnr internet portal**.  
*May develop into a multi-tool later on… who knows.*
<br>
---
<br>
## Instructions to Install
<br>
Make sure you **download this entire directory**:
<br>
cyberoam-autologin/
├── install.sh # installer script (sets up everything) <br>
├── uninstall.sh # removes files, disables timer/service)<br>
├── cyberoam-login.js # main Node.js autologin script<br>
├── cyberoam-login.service # systemd service unit<br>
├── cyberoam-login.timer # systemd timer unit<br>
<br>
<br>

The last three files will be **automatically copied/moved to their required locations**.  
*You don’t have to touch a damn thing (trust me :D).*
<br>
<br>
Right click and **run `install.sh` as a program** or from your terminal.
<br>
---
<br>
### Note:-
<br>
*Bhai, aur kuchh suggestions hai to bata dena merko, bas 150 rupiya lega mai.*  
*You may provide me with suggestions for the project.*
<br>
---
<br>
Optional settings-
#if you don't want any pop ups , change this setting to true (search using ctrl+f inside the cyberoam-login.js file) :- 
headless: false
<br>
### If stuff doesn't work, try these out:
<br>
#Make `install.sh` executable:
<br>
bash
<br>
chmod +x install.sh
- Make sure your **`cyberoam-login.js`** is okay using the **system-installed Chrome/Chromium**  
  *(usually `/usr/bin/chromium-browser` or `/usr/bin/google-chrome`)*.
<br>
 #Edit the part that says:
<br>
js<br>
const BROWSER_PATHS = [ <br>
  '/usr/bin/chromium-browser',<br>
  '/usr/bin/chromium',
  '/usr/bin/google-chrome-stable',<br>
  '/usr/bin/google-chrome',<br>
  '/snap/bin/chromium' <br>
]; <br>
If Puppeteer can’t find it, then you specify the path in executablePath when launching: <br>
<br>
const browser = await puppeteer.launch({ <br>
  headless: false <br>
  executablePath: '/usr/bin/chromium-browser' // adjust as needed <br>
}); <br>
<br>
<br>
You may add your current browser (Brave, Vivaldi, Edge, etc.) <br>
(they should work given the Chromium framework, but I dunno — I ChatGPT-ed the entire code, who am I to judge 😅) <br>


