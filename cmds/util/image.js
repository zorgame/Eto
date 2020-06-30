var cheerio = require('cheerio');
const Discord = require('discord.js');
var request = require('request');

module.exports = {
	config: {
		nombre: 'imagen',
		alias: ['image', 'img'],
		descripcion: 'Busca cualquier imagen de google',
		category: 'util'
	},
	run: async (client, message, args) => {
		var parts = message.content.split(' ');

		var search = parts.slice(1).join(' ');
		if (!search)
			return message.channel.send(
				'Por favor agregar algo para que pueda buscar.'
			);

		var options = {
			url: 'http://results.dogpile.com/serp?qc=images&q=' + search,
			method: 'GET',
			headers: {
				Accept: 'text/html',
				'User-Agent': 'Chrome'
			}
		};

		request(options, function(error, response, responseBody) {
			if (error) {
				// Error
				return;
			}

			$ = cheerio.load(responseBody);

			var links = $('.image a.link');

			var urls = new Array(links.length)
				.fill(0)
				.map((v, i) => links.eq(i).attr('href'));
			console.log(urls);
			if (!urls.length) {
				return;
			}

			let lel = urls[Math.floor(Math.random() * urls.length)];

			const embed = new Discord.MessageEmbed()
				.setColor('64ffc4')
				.setTitle('Búsqueda de imagen')
				.setDescription(
					`**Si quieres descargar la imagen ‣ [clickea aqui](${lel})** `
				)
				.setImage(lel)
				.setFooter(message.author.username, message.author.displayAvatarURL)
				.setTimestamp();

			const embed1 = new Discord.MessageEmbed()
				
				.setColor('64ffc4')
				.setTitle('Búsqueda de imagen')
				.setDescription(
					`**Si quieres descargar la imagen ‣ [clickea aqui](${urls[1]})** `
				)
				.setImage(urls[1])
				.setFooter(message.author.username, message.author.displayAvatarURL)
				.setTimestamp();

			const embed2 = new Discord.MessageEmbed()
				
				.setColor('64ffc4')
				.setTitle('Búsqueda de imagen')
				.setDescription(
					`**Si quieres descargar la imagen ‣ [clickea aqui](${urls[2]})** `
				)
				.setImage(urls[2])
				.setFooter(message.author.username, message.author.displayAvatarURL)
				.setTimestamp();

			const embed3 = new Discord.MessageEmbed()
				
				.setColor('64ffc4')
				.setTitle('Búsqueda de imagen')
				.setDescription(
					`**Si quieres descargar la imagen ‣ [clickea aqui](${urls[3]})**`
				)
				.setImage(urls[3])
				.setFooter(message.author.username, message.author.displayAvatarURL)
				.setTimestamp();

			const embed4 = new Discord.MessageEmbed()
			
				.setColor('64ffc4')
				.setTitle('Búsqueda de imagen')
				.setDescription(
					`**Si quieres descargar la imagen ‣ [clickea aqui](${urls[4]})** `
				)
				.setImage(urls[4])
				.setFooter(message.author.username, message.author.displayAvatarURL)
				.setTimestamp();

			const embed5 = new Discord.MessageEmbed()
				
				.setColor('64ffc4')
				.setTitle('Búsqueda de imagen')
				.setDescription(
					`**Si quieres descargar la imagen ‣ [clickea aqui](${urls[5]})** `
				)
				.setImage(urls[5])
				.setFooter(message.author.username, message.author.displayAvatarURL)
				.setTimestamp();

			let emoji = client.emojis.cache.find(
				e => e.id === '708873679269920797'
			);

			message.channel.send('<a:a2:708873679269920797> Cargando').then(async msg => {
			await	msg.react('1️⃣');
			await	msg.react('2️⃣');
			await	msg.react('3️⃣');
			await	msg.react('4️⃣');
			await	msg.react('5️⃣').then(e => msg.edit("** **", embed)) 
			await	msg
					.awaitReactions(
						async (reaction, user) => {
							await reaction.users.remove(message.author.id);

							if (message.author.id !== user.id) return;
							if (reaction.emoji.name === '1️⃣') {
							await	msg.edit(embed1);
							}
							if (reaction.emoji.name === '2️⃣') {
							await	msg.edit(embed2);
							}
							if (reaction.emoji.name === '3️⃣') {
							await	msg.edit(embed3);
							}
							if (reaction.emoji.name === '4️⃣') {
							await	msg.edit(embed4);
							}
							if (reaction.emoji.name === '5️⃣') {
							await	msg.edit(embed5);
							}
						},
						{
							time: 60000,
							errors: ['time']
						}
					)
					.then(mg => {
						if (!mg.first()) return msg.edit('Ninguna reaccion registrada'); //Si no se detecta almenos una reacción luego del tiempo editamos mensaje
					});
			});
		});
	}
};
