const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const { token } = require('./config.json');
const client = new Client();

['alias', 'commands'].forEach(x => (client[x] = new Collection()));
['comandos', 'eventos'].forEach(x => require(`./handler/${x}`)(client)); 

client.login(token);
