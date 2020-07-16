module.exports = {
	config: {
		nombre: 'ttt',
		alias: ['3enraya', 'tictactoe', 'tresenraya'],
		descripcion: 'Juega a 3enraya con algún amigo tuyo',
		category: 'util'
	},

	run: async (client, message, args) => {
		const tresenraya = require('tresenraya');
		const Discord = require('discord.js');

		let uno = client.emojis.cache.find(x => x.name == '1_');
		let dos = client.emojis.cache.find(x => x.name == '2_');
		let tres = client.emojis.cache.find(x => x.name == '3_');
		let cuatro = client.emojis.cache.find(x => x.name == '4_');
		let cinco = client.emojis.cache.find(x => x.name == '5_');
		let seis = client.emojis.cache.find(x => x.name == '6_');
		let siete = client.emojis.cache.find(x => x.name == '7_');
		let ocho = client.emojis.cache.find(x => x.name == '8_');
		let nueve = client.emojis.cache.find(x => x.name == '9_');

		const usuario = message.mentions.users.first();
		if (!usuario) return message.channel.send('Menciona a alguien');
		if (usuario.bot) return message.channel.send('No puedes retar un bot');

		const partida = new tresenraya({
			jugadores: [message.author.id, usuario.id],
			fichas: ['🔵', '🔴'],
			tablero: [
				`${uno} `,
				`${dos}`,
				`${tres}`,
				`${cuatro}`,
				`${cinco}`,
				`${seis}`,
				`${siete}`,
				`${ocho}`,
				`${nueve}`
			]
		});

		const collector = new Discord.MessageCollector(
			message.channel,
			m => m.author.id === usuario.id,
			{ time: 30000, max: 1 }
		);

		message.channel
			.send(
				`${usuario}, Escribe **Y** para aceptar o escribe **N** para denegar, para eso tienes 30 segundos o se cancelara la solicitud`
			)
			.then(e => {
				collector.on('collect', async message => {
					if (message.content == 'Y' || message.content == 'y') {
						partida.on('ganador', (jugador, tablero, paso) => {
							let embed = new Discord.MessageEmbed()
								.setTitle('Stats de la partida')
								.addField('Ganador', client.users.cache.get(jugador).tag)
								.addField(
									'Perdedor',
									client.users.cache.get(partida.perdedor).tag
								)
								.addField('Tablero', tablero.string)
								.setColor('64ffc4');
							message.channel.send(embed);
						});

						partida.on('empate', (jugadores, tablero, paso) => {
							let embed = new Discord.MessageEmbed()
								.setTitle('Empate')
								.setDescription(
									`Empate entre los jugadores:\n ${jugadores
										.map(x => client.users.cache.get(x).tag)
										.join('\n')}`
								)

								.addField('Tablero', tablero.string)
								.setColor('64ffc4');
							message.channel.send(embed);
						});

						let embed = new Discord.MessageEmbed()
							.setTitle('TicTacToe | 3enraya')
							.setDescription(partida.tablero.string)
							.addField(
								'Turno',
								client.users.cache.get(partida.turno.jugador).username +
									' Ficha: [' +
									partida.turno.ficha +
									']'
							)
							.setColor('64ffc4');
						message.channel.send(embed).then(e => {
							const colector = message.channel.createMessageCollector(
								msg =>
									msg.author.id === partida.turno.jugador &&
									!isNaN(msg.content) &&
									(Number(msg.content) >= 1 && Number(msg.content) <= 9) &&
									partida.disponible(msg.content) &&
									!partida.finalizado
							);

							colector.on('collect', msg => {
								partida.elegir(msg.content);

								if (partida.finalizado) {
									colector.stop();
									return;
								}

								let emb = new Discord.MessageEmbed()
									.setTitle('TicTacToe | 3enraya')
									.setDescription(partida.tablero.string)
									.addField(
										'Turno',
										`${client.users.cache.get(partida.turno.jugador).username}`
									)
									.addField('Ficha', `[${partida.turno.ficha}]`)
									.setColor('64ffc4');

								e.edit(emb);
							});
						});
					} else if (message.content == 'N' || message.content == 'n') {
						message.channel.send('El usuario no quiere jugar en este momento');
						collector.stop();
					}
				});
				collector.on('end', x => {
					e.delete();
				});
			});
	}
};
