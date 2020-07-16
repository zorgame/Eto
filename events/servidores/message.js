module.exports = async (client, message) => {
	
	try {
		const Discord = require('discord.js');
		const db = require('megadb');
		const black = new db.crearDB('blacklist');
		const { NF, GR } = require('../../niveles.js');
		const cooldown = new db.crearDB('cooldown');
		const cooldown2 = new db.crearDB('cooldownP');
		const pet = new db.crearDB("pets")
		const b = await black.obtener(client.user.id);
		const afk = new db.crearDB('afk');
		const xxp = await pet.obtener(`${message.author.id}.xp`)
		let coco = 5
		const llevel = await pet.obtener(`${message.author.id}.level`)
		let lup = 5 * llevel ** 2 + 50 + llevel + 100

		if(xxp + coco >= lup) {
			pet.restar(`${message.author.id}.xp`, lup)
			pet.establecer(`${message.author.id}.level`, parseInt(llevel + 1))
			message.channel.send(`Felicidades tu mascota subio de nivel a ${llevel + 1}`)
		}

		if (cooldown.tiene(message.author.id)) {
			let bb = await cooldown.obtener(message.author.id);
			setTimeout(() => {
				cooldown.eliminar(message.author.id);
			}, bb - Date.now());
		}
		if (cooldown2.tiene(message.author.id)) {
			let cho = await cooldown2.obtener(message.author.id);
			setTimeout(() => {
				cooldown2.eliminar(message.author.id);
			}, cho - Date.now());
		}

		if (!message.guild) return;

		const prefix_db = new db.crearDB('prefixes');
		let prefix;
		if (prefix_db.tiene(message.guild.id)) {
			prefix = await prefix_db.obtener(message.guild.id);
		} else {
			prefix = 'ey!';
		}
		if (afk.tiene(`${message.guild.id}.${message.author.id}`)) {
			afk.eliminar(`${message.guild.id}.${message.author.id}`);
			message.channel
				.send('Hola devuelta, tu estado en afk lo acabo de eliminar')
				.then(e => e.delete({ timeout: 5000 }));
		}

		let mencion = message.mentions.users.first();
		if (mencion) {
			if (afk.tiene(`${message.guild.id}.${mencion.id}`)) {
				let a = await afk.obtener(`${message.guild.id}.${mencion.id}`);
				let embed = new Discord.MessageEmbed()
					.setColor('64ffc4')
					.setTitle('🔔 | AFK')
					.setDescription(
						`${mencion.username} esta afk por: \`${a}\``
					)
					.setThumbnail(mencion.avatarURL());
				message.channel.send(embed);
			}
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

		if (cmd) {
			if (b.includes(message.author.id)) {
				message.channel.send('Estas en la blacklist');
			} else if (!b.includes(message.author.id)) {
				let commandfile =
					client.commands.get(cmd) ||
					client.commands.get(client.alias.get(cmd));

				if (commandfile) commandfile.run(client, message, args);
			}
		}
	} catch (err){
		message.channel.send(err)
	}
};
