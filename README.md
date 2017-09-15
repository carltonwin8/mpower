# Nodejs Control Of mPower PRO Via Telnet

Use the



# From Sequim

Text below copied from
[here](https://community.ubnt.com/t5/mFi/mPower-API/td-p/637549).

---

Re: mPower API?
Options
‎03-13-2014 03:22 PM

In case it escaped your attention, the current mPower firmware has added a
"Controls" tab to the web admin page. From this page you can read the parameter
values and turn the outlets ON or OFF.
But if you still want CLI access, what follows should get you started.  I'm
unaware of any documentation for this interface.  I can only tell you what I
have learned by exploration.
Connect to the mPower with SSH or telnet.
Position to /proc/power.
Issue this command:
```
ls -l
```
You will see a long list of interesting files. This is a virtual file system
that provides access to the hardware components.
The outlets 1, 2, and 3 are represented by files "relay1", "relay2", and
"relay3" respectively. You can read each of these to determine its ON/OFF
status; "0" is OFF, "1" is ON.
```
cat relay1
```
 Or you can read the whole trio with a single command.
```
cat relay*
```
To switch an outlet to ON or OFF, simply write a "1" or "0" respectively to the
relay number of interest.
```
echo 1 > relay1
```
You can read values from some of these virtual files, but first you must confirm
that values are being measured.  They probably are if the mFi controller is
managing things, but if not you can make it so anyway.  First check:
```
cat enabled*
```
 returns the "enabled" status of all three outlets.  "0" is disabled, so you must change this to "1" if you expect to get values.
```
echo 1 > enabled1
echo 1 > enables2
echo 1 > enabled3
```
 or whatever pattern is needed for the outlets of interest.  Now you can fetch some values.
```
cat active_pwr1
```
 returns the power factor corrected power demand on outlet 1.
```
cat v_rms1
```
 returns the RMS voltage at outlet 1.  This will be zero if the outlet is off.
```
cat i_rms1
```
 returns the RMS current delivered via outlet 1.
```
cat pf1
```
 returns the power factor associated with the load on outlet 1.
```
cat energy_sum1
```
 returns the totalized energy in Watt-hours delivered via outlet1.  I think this total starts at boot-up but haven't confirmed this.
There are plenty of other virtual files whose purpose has escaped me.

Here's another interesting place:
cd /proc/led

Here you will find two more virtual files to tamper with. "freq" controls the pilot LED flash rate (steady on is "0") while "status" controls the LED color.
So that's it. Hope it helps.
