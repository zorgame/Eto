module.exports = async (client, message) => {
	const Discord = require('discord.js');
	const db = require('megadb');

	const { NF, GR } = require('../../niveles.js');

	const cooldown = new db.crearDB('cooldown');

	if (cooldown.tiene(message.author.id)) {
		let bb = await cooldown.obtener(message.author.id);
		setTimeout(() => {
			cooldown.eliminar(message.author.id);
		}, bb - Date.now());
	}

	const prefix_db = new db.crearDB('prefixes');
	let prefix;
	if (prefix_db.tiene(message.guild.id)) {
		prefix = await prefix_db.obtener(message.guild.id);
	} else {
		prefix = 'ey!';
	}

	const config = require(`../../config.json`); //Llamamos la carpet config

	if (message.author.bot || message.channel.type === 'dm') return; //Si el mensaje es por DM devuelve FALSE (O si es de un bot)

	if (message.content == '<@' + client.user.id + '>') {
		message.channel.send('Mi prefix es **' + prefix + '**');
	}

	let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g); //Argumentos
	let cmd = args.shift().toLowerCase(); //Cmd ejecutado

	if (!message.content.startsWith(prefix)) {
		NF(message);
		return;
	} //Si no comienza por prefix devuelve false
	let commandfile =
		client.commands.get(cmd) || client.commands.get(client.alias.get(cmd));
	//obtenemos el contenido commands de la colección client (para que se a su alias)
	if (commandfile) commandfile.run(client, message, args);
};
