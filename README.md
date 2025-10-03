# Auto-login-framework

Currently constructed **especially for Cyberoam login for IIITnr internet portal**.  
*May develop into a multi-tool later on… who knows.*
<br>
{currently supported only for linux, windows support soon...}
{undergoing testing}
---
<br>
#V-2.0
<h1>IIIT-NR Cyberoam Auto-Login (V2.0)</h1>h1>

This project provides a simple <b>Linux watchdog script</b> (<code>toggle-portal.sh</code>) and an installer (<code>install.sh</code>) to keep you logged in to the Cyberoam captive portal automatically.<br><br>

Instead of manually logging in/out through the portal webpage, the script periodically pings Google (or another target). If connectivity is lost, it automatically posts your credentials to th’e captive portals <code>login.xml</code> endpoint using <code>curl</code>.<br><br>

<hr>

<h2> Installation</h2>h2>

1. <b>Unzip the folder</b> you downloaded(from the releases tab):<br>
<pre>
 unzip portal-tools.zip -d ~/portal-tools
 cd ~/portal-tools
</pre>pre>
<br>

2. <b>Run the installer</b>:<br>
<pre>
 chmod +x install.sh
 ./install.sh
</pre>pre>
<br>

During installation you will be prompted for:<br>
- Cyberoam username<br>
- Cyberoam password<br>
- Install directory (default: <code>~/.local/bin</code>)<br><br>

Credentials are stored safely in:<br>
<code>~/.config/toggle-portal/credentials</code> (mode 600).<br><br>

3. The installer will:<br>
- Copy <code>toggle-portal.sh</code> into the install directory<br>
- Create a wrapper (<code>toggle-portal-run.sh</code>) that loads your credentials<br>
- Add an <code>@reboot</code> crontab entry to auto-start on boot<br>
- Log into <code>~/toggle-portal.log</code><br>
- Create a helper <code>tail-toggle-portal-log.sh</code> to view logs<br><br>

<hr>

<h2>▶️ Usage</h2>h2>

<b>Run manually</b><br>
<pre>
 nohup toggle-portal-run.sh > ~/toggle-portal.log 2>&1 &
</pre>pre>
<br>

<b>View logs</b><br>
<pre>
 ~/tail-toggle-portal-log.sh
</pre>pre>
<br>

<b>Auto-start</b><br>
The installer adds a crontab entry so the script launches automatically at boot.<br>
Check with:<br>
<pre>
 crontab -l
</pre>pre>
You should see something like:<br>
<pre>
 @reboot nohup /home/user/.local/bin/toggle-portal-run.sh > /home/user/toggle-portal.log 2>&1 &
</pre>pre>
<br>

<hr>

<h2>⚙️ How it Works</h2>h2>

1. Pings <code>8.8.8.8</code> once per second<br>
2. If ping fails → assumes captive portal dropped your session<br>
3. Builds a POST like:<br>
<pre>
 mode=191&username=&lt;user&gt;&password=&lt;pass&gt;&a=&lt;timestamp&gt;&producttype=0
</pre>pre>
… and sends it to:<br>
<code>https://cyberoam.iiitnr.edu.in:8090/login.xml</code><br><br>
4. Loops forever, logging you in whenever needed<br><br>

<hr>

<h2>️ Troubleshooting</h2>h2>

<b>Script didn’t log me in</b><br>
- Check logs:<br>
<pre>tail -f ~/toggle-portal.log</pre>pre>
- Look for success strings (<code>success</code>, <code>logged in</code>, <code>&lt;message&gt;OK</code>)<br><br>

<b>Wrong credentials</b><br>
- Edit your saved credentials:<br>
<pre>nano ~/.config/toggle-portal/credentials</pre>pre>
- Restart the script:<br>
<pre>
 pkill -f toggle-portal.sh
 nohup toggle-portal-run.sh > ~/toggle-portal.log 2>&1 &
</pre>pre>
<br>

<b>No Internet even after login</b><br>
- Portal host may differ→  check browser DevTools when logging in manually<br>
- Update <code>PORTAL_HOST</code> in <code>toggle-portal.sh</code><br><br>

<b>Change ping target</b><br>
- Edit <code>toggle-portal.sh</code>, replace <code>8.8.8.8</code> with another IP or domain<br><br>

<hr>

<h2> Notes</h2>h2>

- Credentials stored in <code>~/.config/toggle-portal/credentials</code> (plain text, mode 600)<br>
- Works on Linux (tested on Ubuntu/Debian)<br>
- Needs <code>bash</code> and <code>curl</code><br>
- Customize retry intervals and targets by editing <code>toggle-portal.sh</code><br><br>

<hr>

<h2> Version</h2>h2>

<b>V2.0</b> – Added installer, watchdog re-login logic, auto-start, log helper, structured README<br><br>

<hr>

<h2> Credits</h2>h2>

- Reverse-engineered from captive portal JavaScript (<code>submitRequest()</code>)<br>
- Packaged for IIIT-NR Cyberoam<br>

</pre>
</pre>
</pre>
</pre>
</pre>
</pre>
</pre>
</h1>
##V-Alpha
## Instructions to Install
<br>

Make sure you **download this entire directory**:
<br>
just gitclone this stuff (usme toh sab hi expert hain):
git clone https://github.com/sundeep-kp/Auto-login-framework.git
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
<br>
<br>
*Bhai, aur kuchh suggestions hai to bata dena merko, bas 150 rupiya lega mai.*  
*You may provide me with suggestions for the project.*
<br>
<br>
---
<br>
<br>
Optional settings-
<br>
#if you don't want any pop ups , change this setting to true (search using ctrl+f inside the cyberoam-login.js file) :- 
headless: false
<br>
<br>
### If stuff doesn't work, try these out:
<br>
<br>
#Make `install.sh` executable:
<br>
<br>
Paste this in the terminal:-
<br>
<br>
chmod +x install.sh
- Make sure your **`cyberoam-login.js`** is okay using the **system-installed Chrome/Chromium**  
  *(usually `/usr/bin/chromium-browser` or `/usr/bin/google-chrome`)*.
<br>
<br>
 #Edit the part that says:
<br>
<br>
js<br>
const BROWSER_PATHS = [ <br>
  '/usr/bin/chromium-browser',<br>
  '/usr/bin/chromium',
  '/usr/bin/google-chrome-stable',<br>
  '/usr/bin/google-chrome',<br>
  '/snap/bin/chromium' <br>
]; <br>
<br>
If Puppeteer can’t find it, then you specify the path in executablePath when launching: <br>
<br>
<br>
const browser = await puppeteer.launch({ <br>
  headless: false <br>
  executablePath: '/usr/bin/chromium-browser' // adjust as needed <br>
}); <br>
<br>
<br>
You may add your current browser (Brave, Vivaldi, Edge, etc.) <br>
(they should work given the Chromium framework, but I dunno — I ChatGPT-ed the entire code, who am I to judge 😅) <br>


