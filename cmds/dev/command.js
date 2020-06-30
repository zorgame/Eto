const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'comandos',
		alias: ['commands'],
		descripcion: 'Una lista de todos mis comandos',
		category: 'dev'
	},

	run: async (client, message, args) => {
		if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) {
			message.channel
				.send('No tengo permisos de agregar reacciones')
				.then(e => e.delete({ timeout: 2500 }));
		}

		if (message.guild.member(client.user).hasPermission('ADD_REACTIONS')) {
			message.delete();
			let utilArr = [],
				devArr = [],
				conArr = [],
				ecoArr = [],
				admArr = [];

			client.commands.filter(a => a.config.category == 'dev').forEach(cmd => {
				devArr.push(cmd.config.nombre);
			});
			client.commands.filter(c => c.config.category == 'util').forEach(cmd => {
				utilArr.push(cmd.config.nombre);
			});
			client.commands.filter(c => c.config.category == 'con').forEach(cmd => {
				conArr.push(cmd.config.nombre);
			});
			client.commands
				.filter(c => c.config.category == 'economia')
				.forEach(cmd => {
					ecoArr.push(cmd.config.nombre);
				});
			client.commands
				.filter(e => e.config.category == 'admin')
				.forEach(cmd => admArr.push(cmd.config.nombre));

			let n2 = client.commands.filter(a => a.config.category == 'util').size;
			let n3 = client.commands.filter(a => a.config.category == 'dev').size;
			let n4 = client.commands.filter(a => a.config.category == 'con').size;
			let n5 = client.commands.filter(a => a.config.category == 'economia')
				.size;
			let n6 = client.commands.filter(a => a.config.category == 'admin').size;

			let total = n2 + n3 + n4 + n5 + n6;
			let nada = 'https://i.ibb.co/HhvxV2y/IMG-20200628-110500.png';

			const embed0 = new MessageEmbed()
				.setTitle('Opciones para que escojas')
				.setDescription(
					'1️⃣: `Escojes la sección de configuración`\n2️⃣: `Escojes la sección de moderacion`\n3️⃣: `Escojes la sección de economía y social`\n4️⃣: `Escojes la sección de utilidad`\n Total de comandos: `' +
						total +
						'`'
				)
				.setColor('64ffc4');

			const embed = new MessageEmbed()
				.setTitle('> Sección de Configuración')
				.setDescription('`' + conArr.map(a => a).join('` | `') + '`')
				.setColor('GREEN')
				.setImage(nada)
				.setThumbnail(client.user.avatarURL());

			const embed1 = new MessageEmbed()
				.setTitle('> Sección de Moderacion')
				.setDescription('`' + admArr.map(a => a).join('` | `') + '`')
				.setColor('64ffc4')
				.setImage(nada)
				.setThumbnail(client.user.avatarURL());

			const embed2 = new MessageEmbed()
				.setTitle('> Sección de Economia y social')
				.setDescription('`' + ecoArr.map(a => a).join('` | `') + '`')
				.setColor('64ffc4')
				.setImage(nada)
				.setThumbnail(client.user.avatarURL());

			const embed3 = new MessageEmbed()
				.setThumbnail(client.user.avatarURL())
				.setTitle('> Sección de Utilidad')
				.setDescription('`' + utilArr.map(a => a).join('` | `') + '`')
				.setColor('64ffc4')
				.setImage(nada);

			if (!args[0]) {
				message.channel
					.send('<a:a1:708879180322046025> Cargando los comandos, espera...')
					.then(async msg => {
						await msg.react('1️⃣');
						await msg.react('2️⃣');
						await msg.react('3️⃣');
						await msg.react('4️⃣');
						await msg.react('⏮️');
						await msg
							.react('✖️')
							.then(async e => msg.edit('** **', await embed0));

						await msg.awaitReactions(
							async (reaction, user) => {
								if (
									message.guild
										.member(client.user)
										.hasPermission('MANAGE_MESSAGES')
								) {
									await reaction.users.remove(message.author.id);
								}
								if (message.author.id !== user.id) return;
								if (reaction.emoji.name === '1️⃣') {
									msg.edit(embed);
								}
								if (reaction.emoji.name === '2️⃣') {
									await msg.edit(embed1);
								}
								if (reaction.emoji.name === '3️⃣') {
									await msg.edit(embed2);
								}
								if (reaction.emoji.name === '4️⃣') {
									await msg.edit(embed3);
								}
								if (reaction.emoji.name === '⏮️') {
									await msg.edit(embed0);
								}
								if (reaction.emoji.name === '✖️') {
									await msg.delete();
								}
							},
							{
								time: 60000,
								errors: ['time']
							}
						);
					});
			}
		}
	}
};
