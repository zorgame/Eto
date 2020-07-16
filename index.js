/* Hola */

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('Hello Express app');
});

app.listen(3000, () => console.log('server started'));

const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const { token } = require('./config.json');
const client = new Client();

['alias', 'commands'].forEach(x => (client[x] = new Collection())); //Colocamos nuevas colecciones al Cliente
['comandos', 'eventos'].forEach(x => require(`./handler/${x}`)(client)); //Hacemos un array con las carpetas que tendrá el handler NO TOCAR.

client.login(token);
