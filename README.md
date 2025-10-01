# Auto-login-framework
Currently constructed especially for cyberoam login for IIITnr internet portal. May develop into a multi tool later on.






Instructions to install :- 



Make sure you download this entire directory:- 
it should include these files:- cyberoam-autologin/

├── install.sh                 # installer script (sets up everything)

├── uninstall.sh               # removes files, disables timer/service

├── cyberoam-login.js          # main Node.js autologin script

├── cyberoam-login.service     # systemd service unit

├── cyberoam-login.timer       # systemd timer unit







the last three files will be automatically copied/moved to their required location. 
You don't have to touch a damn thing (trust me :D)



right click and run the install.sh as a program or from your terminal .







Note :- Bhai aur kuchh suggestions hai to bata dena merko, bas 150 rupiya lega mai 
You may provide me with suggestions for the project







If stuff don't work try these out:-
#chmod +x install.sh 

(may do the same thing to all files even though that's parabobly overkill)

#Make sure you have entered the correct userid and password (as for as i know its probably userid:yourname2X101@iiitnr.edu.in and password:Test@1234)

#Make sure your cyberoam-login.js is either okay using the system-installed Chrome/Chromium (usually /usr/bin/chromium-browser or /usr/bin/google-chrome).
edit in the part that says const BROWSER_PATHS = [
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/snap/bin/chromium'

If Puppeteer can’t find it, then you specify the path in executablePath when launching:

You may add your current browser that you are using (brave, vivaldi, edge etc. although they should work given the chromium framework, 
but I dunno , I chatgpted the entire code who am I to judge)
