/ **
* This is the file where the bot commands are located
*
* @ License MIT license
* /

var http = require ('http');
var sys = require ('sys');

exports.commands = {
/ **
* Help commands
*
* These commands are here To provide information about the bot.
* /

/ * about: function (arg, by, room, with) {
if (this.hasRank (by, '# ~') | | room.charAt (0) === ',') {
var text ='';
Else {}
var text = '/ pm' + by + ',';
}
text + = '** Pokémon Showdown Bot ** by: Quinella and TalkTakesTime';
this.say (with, room, text);
},
help: 'guides',
Guides: function (arg, by, room, with) {
if (this.hasRank (by, '# ~') | | room.charAt (0) === ',') {
var text ='';
Else {}
var text = '/ pm' + by + ',';
}
if (config.botguide) {
text + = 'A guide on how to use this bot can be found here:' + config.botguide;
Else {}
text + = 'There is no guide for this bot. PM the owner with any questions. ';
}
this.say (with, room, text);
}, * /

/ **
* Dev commands
*
* These commands are here for highly ranked users (or the creator) to use
* To perform arbitrary actions That can not be done through any other commands
* Or to help with upkeep of the bot.
* /

reload: function (arg, by, room, with) {
if (config.excepts.indexOf (toId (by)) === -1) return false;
try {
this.uncacheTree ('. / commands.js');
Commands = require ('. / Commands.js'). Commands;
this.say (with, room, 'Commands reloaded.');
} Catch (e) {
error ('failed to reload:' + sys.inspect (e));
}
},
reloadData: function (arg, by, room, with) {
if (config.excepts.indexOf (toId (by)) === -1) return false;
this.say (with, room, 'Reloading data files ...');
var https = require ('https');
var = datenow Date.now ();
var formats = fs.createWriteStream ("formats.js");
https.get ("https://play.pokemonshowdown.com/data/formats.js?" + datenow, function (res) {
res.pipe (formats);
});
var = formatsdata fs.createWriteStream ("formats-data.js");
https.get ("https://play.pokemonshowdown.com/data/formats-data.js?" + datenow, function (res) {
res.pipe (formatsdata);
});
var = dex fs.createWriteStream ("pokedex.js");
https.get ("https://play.pokemonshowdown.com/data/pokedex.js?" + datenow, function (res) {
res.pipe (dex);
});
var moves = fs.createWriteStream ("moves.js");
https.get ("https://play.pokemonshowdown.com/data/moves.js?" + datenow, function (res) {
res.pipe (moves);
});
var = fs.createWriteStream abilities ("abilities.js");
https.get ("https://play.pokemonshowdown.com/data/abilities.js?" + datenow, function (res) {
res.pipe (abilities);
});
var items = fs.createWriteStream ("items.js");
https.get ("https://play.pokemonshowdown.com/data/items.js?" + datenow, function (res) {
res.pipe (items);
});
var = learnsets fs.createWriteStream ("learnsets-g6.js");
https.get ("https://play.pokemonshowdown.com/data/learnsets-g6.js?" + datenow, function (res) {
res.pipe (learnsets);
});
var aliases = fs.createWriteStream ("aliases.js");
https.get ("https://play.pokemonshowdown.com/data/aliases.js?" + datenow, function (res) {
res.pipe (aliases);
});
this.say (with, room, 'Data files reloaded');
},
custom: function (arg, by, room, with) {
if (config.excepts.indexOf (toId (by)) === -1) return false;
/ / Custom commands can be executed in an arbitrary room using the syntax
/ /. "Custom [room] command", eg, to do! Date pikachu in the room lobby,
/ / The command would be. "Custom [lobby]! Date pikachu." However, using
/ / "[" And "]" in the custom command to be executed can mess this up, I know
/ / Be careful with them.
if (arg.indexOf ('[') === 0 && arg.indexOf (']')> -1) {
tarRoom arg.slice var = (1, arg.indexOf (']'));
arg.substr = arg (arg.indexOf (']') + 1). trim ();
}
this.say (with tarRoom | | room, arg);
},
/ * js: function (arg, by, room, with) {
if (config.excepts.indexOf (toId (by)) === -1) return false;
try {
var result = eval (arg.trim ());
this.say (with, room, JSON.stringify (result));
} Catch (e) {
this.say (with, room, e.name + ":" + e.Message);
}
}, * /

/ **
* Room Owner commands
*
* These commands allow room owners to personalisé settings for moderation and use command.
* /

settings: 'set'
set: function (arg, by, room, with) {
if (! this.hasRank (by, '% @ & # ~') | | room.charAt (0) === ',') return false;

settable {var =
randompoke: 1,
randomteam: 1,
numberdex: 1,
Tier 1,
gen: 1
vgc: 1,
heavyslam: 1,
weight: 1
height: 1,
priority: 1
contact: 1
viablemoves: 1,
trad: 1,
dexsearch: 1,
stat: 1,
informations: 1
};
modOpts {var =
Flooding: 1,
caps: 1,
Stretching: 1,
bannedwords: 1,
snen: 1
};

var opts = arg.split (',');
var cmd = toId (opts [0]);
if (cmd === 'mod' | | cmd === 'm' | | cmd === 'modding') {
if (! opts [1] | |! toId (opts [1]) | |! (toId (opts [1]) in modOpts)) return this.say (with, room, 'Incorrect command: correct syntax is. September mod, ['+
Object.keys (modOpts). Join ('/') + '] ([on / off])');

if (! this.settings ['modding']) this.settings ['modding'] = {};
if (! this.settings ['modding'] [room]) this.settings ['modding'] [room] = {};
if (opts [2] && toId (opts [2])) {
if (! config.excepts.indexOf (toId (by)) === -1) return false;
if (! (toId (opts [2]) in {on: 1, off: 1})) return this.say (with, room, 'Incorrect command: correct syntax is. September mods, [' +
Object.keys (modOpts). Join ('/') + '] ([on / off])');
if (toId (opts [2]) === 'off') {
this.settings ['modding'] [room] [toId (opts [1])] = 0;
Else {}
delete this.settings ['modding'] [room] [toId (opts [1])];
}
this.writeSettings ();
this.say (with, room, 'Moderation for' + toId (opts [1]) + 'in this room is now' + toId (opts [2]). toUpperCase () + '.');
return;
Else {}
this.say (with, room, 'Moderation for' + toId (opts [1]) + 'in this room is currently' +
(this.settings ['modding'] [room] [toId (opts [1])] === 0? 'OFF', 'ON') + '.');
return;
}
Else {}
if (! Commands [cmd]) return this.say (with, room, '.' + opts [0] + 'is not a valid command.');
var failsafe = 0;
while (! (settable in cmd)) {
if (typeof Commands [cmd] === 'string') {
cmd = Commands [cmd];
} Else if (typeof Commands [cmd] === 'function') {
if (settable in cmd) {
break;
Else {}
this.say (with, room, 'The settings for.' + opts [0] + 'can not be changed.');
return;
}
Else {}
this.say (with, room, 'Something went wrong. TalkTakesTime PM here or on Smogon with the command you tried.');
return;
}
failsafe + +;
if (failsafe> 5) {
this.say (with, room, 'The command ".' + opts [0] + '" could not be found.');
return;
}
}

settingsLevels {var =
off: false,
disable: false,
'+': '+',
'%', '%',
'@', '@',
'&': '&',
'#', '#',
'~': '~',
on: true,
enable: true
};
if (! opts [1] | |! opts [1]. trim ()) {
var msg ='';
if (! this.settings [cmd] | | (! this.settings [cmd] [room] && this.settings [cmd] [room]! == false)) {
msg = '.' + Cmd + 'is available for users of rank' + (cmd === 'autoban'? '#': Config.defaultrank) + 'and above.';
} Else if (this.settings [cmd] [room] in settingsLevels) {
msg = '.' + Cmd + 'is available for users of rank' + this.settings [cmd] [room] + 'and above.';
} Else if (this.settings [cmd] [room] === true) {
msg = '.' + Cmd + 'is available for all users in this room.';
} Else if (this.settings [cmd] [room] === false) {
msg = '.' + Cmd + 'is not available for use in this room.';
}
this.say (with, room, msg);
return;
Else {}
if (! config.excepts.indexOf (toId (by)) === -1) return false;
newRank var = opts [1]. trim ();
if (! (newRank in settingsLevels)) return this.say (with, room, 'Unknown option: "' + + newRank '." Valid settings are: off / disable, +,%, @, &, #, ~, on / enable. ');
if (! this.settings [cmd]) this.settings [cmd] = {};
this.settings [cmd] [room] = settingsLevels [newRank];
this.writeSettings ();
this.say (with, room, 'The command.' + cmd + 'is now' +
(settingsLevels [newRank] === newRank? 'available for users of rank' newRank + + 'and above.':
(this.settings [cmd] [room]? 'available for all users in this room.': 'unavailable for use in this room.')))
}
}
},
/ * blacklist: 'autoban',
ban: 'autoban',
ab: 'autoban',
autoban: function (arg, by, room, with) {
if (! this.canUse ('autoban', room, by) | | room.charAt (0) === ',') return false;
if (! this.hasRank (this.ranks [toId (room)] | | '', '@ & # ~')) return this.say (with, room, config.nick + 'Requires rank of @ or higher to (a) the blacklist. ');

arg.split arg = (',');
var added = [];
illegalNick var = [];
alreadyAdded var = [];
if (! arg.length | | (arg.length === 1 &&! ​​arg [0]. trim (). length)) return this.say (with, room, 'You must specify at least one user to the blacklist. ');
for (var i = 0; i <arg.length; i + +) {
var = tarUser toId (arg [i]);
if (tarUser.length <1 | | tarUser.length> 18) {
illegalNick.push (tarUser);
continuous;
}
if (! this.blacklistUser (tarUser, room)) {
alreadyAdded.push (tarUser);
continuous;
}
this.say (with, room, '/ roomban' tarUser + + ', Blacklisted user');
added.push (tarUser);
}

var text ='';
if (added.length) {
text + = 'User (s) "' + added.join ('', '') + '' successfully added to the blacklist. ';
this.writeSettings ();
}
if (alreadyAdded.length) text + = 'User (s) "' + alreadyAdded.join ('', '') + '" already present in the blacklist. ';
if (illegalNick.length) text + = 'All' + (text.length? 'other':'') + 'users had illegally nicks and were not blacklisted.';
this.say (with, room, text);
},
unblacklist: 'unautoban',
unban: 'unautoban',
UNAB: 'unautoban',
unautoban: function (arg, by, room, with) {
if (! this.canUse ('autoban', room, by) | | room.charAt (0) === ',') return false;
if (! this.hasRank (this.ranks [toId (room)] | | '', '@ & # ~')) return this.say (with, room, config.nick + 'Requires rank of @ or higher to (a) the blacklist. ');

arg.split arg = (',');
var removed = [];
notRemoved var = [];
if (! arg.length | | (arg.length === 1 &&! ​​arg [0]. trim (). length)) return this.say (with, room, 'You must specify at least one user to unblacklist. ');
for (var i = 0; i <arg.length; i + +) {
var = tarUser toId (arg [i]);
if (tarUser.length <1 | | tarUser.length> 18) {
notRemoved.push (tarUser);
continuous;
}
if (! this.unblacklistUser (tarUser, room)) {
notRemoved.push (tarUser);
continuous;
}
this.say (with, room, '/ roomunban' + tarUser);
removed.push (tarUser);
}

var text ='';
if (removed.length) {
text + = 'User (s) "' + removed.join ('', '') + '" removed from the blacklist successfully. ';
this.writeSettings ();
}
if (notRemoved.length) text + = (text.length? 'No other', 'No') + 'specified users were present in the blacklist.';
this.say (with, room, text);
},
viewbans: 'viewblacklist',
vab: 'viewblacklist',
viewautobans: 'viewblacklist',
viewblacklist: function (arg, by, room, with) {
if (! this.canUse ('bl', room, by) | | room.charAt (0) === ',') return false;

var text ='';
if (! this.settings.blacklist | |! this.settings.blacklist [room]) {
text = 'No users are blacklisted in this room.';
Else {}
var = nicklist Object.keys (this.settings.blacklist [room]);
text = 'The Following users are blacklisted:' + nickList.join (',');
if (text.length> 300) text = 'Too many users to list.';
if (! nickList.length) text = 'No users are blacklisted in this room.';
}
this.say (with, room, '/ pm' + by + ',' + text);
},
banword: function (arg, by, room, with) {
if (! this.hasRank (by, '~')) return false;

if (! this.settings ['bannedwords']) this.settings ['bannedwords'] = {};
this.settings ['bannedwords'] [arg.trim (). toLowerCase ()] = 1;
this.writeSettings ();
this.say (with, room, 'Word' '+ arg.trim (). toLowerCase () +' 'banned.');
},
unbanword: function (arg, by, room, with) {
if (! this.hasRank (by, '~')) return false;

if (! this.settings ['bannedwords']) this.settings ['bannedwords'] = {};
delete this.settings ['bannedwords'] [arg.trim (). toLowerCase ()];
this.writeSettings ();
this.say (with, room, 'Word' '+ arg.trim (). toLowerCase () +' "unbanned. ');
}, * /

/ **
* General commands
*
* Add custom commands here.
* /

/ * tell: 'say',
say: function (arg, by, room, with) {
if (! this.canUse ('say', room, by)) return false;
this.say (with, room, stripCommands (arg) + '(' + by + 'said this)');
},
joke: function (arg, by, room, with) {
if (! this.canUse ('joke', room, by)) return false;
var self = this;

reqOpt {var =
hostname: 'api.icndb.com',
path: '/ jokes / random',
method: 'GET'
};
var req = http.request (reqOpt, function (res) {
res.on ('data', function (chunk) {
try {
var data = JSON.parse (chunk);
self.say (with, room, data.value.joke);
} Catch (e) {
self.say (with, room, 'Sorry, couldn \' t fetch a random joke ...: (');
}
});
});
req.end ();
},
choose: function (arg, by, room, with) {
if (arg.indexOf (',') === -1) {
var choices = arg.split ('');
Else {}
var choices = arg.split (',');
}
choices.filter choices = (function (i) {return (toId (s)! =='')});
if (choices.length <2) return this.say (with, room, (room.charAt (0) === ','?'': '/ pm' + by + ',') + '. choose: You must give at least 2 valid choices. ');
var choice = choices [Math.floor (Math.random () * choices.length)];
this.say (with, room, ((this.canUse ('choose', room, by) | | room.charAt (0) === ',')?'': '/ pm' + by + ', ') + stripCommands (choice));
},
usage: 'usagestats',
usagestats: function (arg, by, room, with) {
if (this.canUse ('usagestats', room, by) | | room.charAt (0) === ',') {
var text ='';
Else {}
var text = '/ pm' + by + ',';
}
text + = 'http://sim.smogon.com:8080/Stats/2014-04/';
this.say (with, room, text);
},
seen: function (arg, by, room, with) {
var text = (room.charAt (0) === ','?'': '/ pm' + by + ',');
if (toId (arg) === toId (by)) {
text + = 'Have you Looked in the mirror lately?';
} Else if (toId (arg) === toId (config.nick)) {
text + = 'You might be either blind or illiterate. Might want to get that checked out. ';
} Else if (! This.chatData [toId (arg)] | |! This.chatData [toId (arg)]. LastSeen) {
text + = 'The user' + arg.trim () + 'Has never been seen.';
Else {}
arg.trim text + = () + 'was last seen' + this.getTimeAgo (this.chatData [toId (arg)]. seenAt) + 'needle' + this.chatData [toId (arg)]. lastSeen;
}
this.say (with, room, text);
},
helix: function (arg, by, room, with) {
if (this.canUse ('helix', room, by) | | room.charAt (0) === ',') {
var text ='';
Else {}
var text = '/ pm' + by + ',';
}

var rand = Math.floor (20 * Math.random ()) + 1;

switch (rand) {
case 1: text + = "Signs point to yes." break;
case 2: text + = "Yes"; break;
case 3: text + = "Reply hazy, try again." break;
case 4: text + = "Without a doubt." break;
case 5: text + = "My sources say no." break;
case 6: text + = "As I see it, yes." break;
case 7: text + = "You may rely on it." break;
case 8: text + = "Concentrate and ask again." break;
case 9: text + = "Outlook not so good." break;
case 10: text + = "It is decidedly so." break;
case 11: text + = "Better not tell you now." break;
case 12: text + = "Very doubtful." break;
case 13: text + = "Yes - definitely." break;
case 14: text + = "It is Certain." break;
case 15: text + = "Can not predict now." break;
case 16: text + = "Most Likely." break;
case 17: text + = "Ask again later." break;
case 18: text + = "My reply is no." break;
case 19: text + = "Outlook good." break;
case 20: text + = "Do not count on it." break;
}
this.say (with, room, text);
}, * /
randompike: 'randompoke',
randompokemon: 'randompoke',
randompoke: function (arg, by, room, with) {
if (this.canUse ('randompoke', room, by) | | room.charAt (0) === ',') {
var text ='';
Else {}
return this.say (with, room, '/ pm' + by + ', the command Write in PM.');
}
try {
var dex = require ('. / pokedex.js'). BattlePokedex;
formatsdata var = require ('. / data.js-formats'). BattleFormatsData;
} Catch (e) {
return this.say (with, room, 'There was an error: try again in a few seconds.');
}
pokemon var = [];
extractedmon var ='';
var tiers = ['uber', 'ou', 'uu', 'ru', 'nu', 'lc',''];
if (tiers.indexOf (arg) == -1) return this.say (with, room, 'Tier not found');
for (var i in formatsdata) {
if (formatsdata [i]. tier) {
if (arg! ='') {
if (formatsdata [i]. tier.toLowerCase () == arg) {
pokemon.push (dex [i]. species);
}
}
else {
if (formatsdata [i]. tier! = 'Unreleased' && formatsdata [i]. tier! ='' && formatsdata [i]. tier! = 'CAP') {
pokemon.push (dex [i]. species);
}
}
}
}
extractedmon = pokemon [Math.floor (Math.random () * pokemon.length)];
text + = extractedmon;
this.say (with, room, text);
},
randomteam: function (arg, by, room, with) {
if (this.canUse ('randomteam', room, by) | | room.charAt (0) === ',') {
var text ='';
Else {}
return this.say (with, room, '/ pm' + by + ', the command Write in PM.');
}
try {
var dex = require ('. / pokedex.js'). BattlePokedex;
formatsdata var = require ('. / data.js-formats'). BattleFormatsData;
} Catch (e) {
return this.say (with, room, 'There was an error: try again in a few seconds.');
}
pokemon var = [];
extractedmon var ='';
var tiers = ['uber', 'ou', 'uu', 'ru', 'nu', 'lc',''];
if (tiers.indexOf (arg) == -1) return this.say (with, room, 'Tier not found');
checkTiers var = false;
for (var i in formatsdata) {
if (formatsdata [i]. tier) {
if (arg! ='') {
if (arg == 'uber') = checkTiers formatsdata [i]. tier.toLowerCase () == 'uber';
else if (arg == 'ou') = checkTiers formatsdata [i]. tier.toLowerCase () == 'ou' | | formatsdata [i]. tier.toLowerCase () == 'bl';
else if (arg == 'uu') = checkTiers formatsdata [i]. tier.toLowerCase () == 'uu' | | formatsdata [i]. tier.toLowerCase () == 'bl2';
else if (arg == '
