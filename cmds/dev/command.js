const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'comandos',
		alias: ['commands'],
		descripcion: 'Una lista de todos mis comandos',
		category: 'dev'
	},

	run: async (client, message, args) => {
		try {
			if(!args[0]){
			if (!message.guild.member(client.user).hasPermission('ADD_REACTIONS')) {
				message.channel
					.send('No tengo permisos de agregar reacciones')
					.then(e => e.delete({ timeout: 5000 }));
			}

			if (
				!message.guild.member(client.user).hasPermission('USE_EXTERNAL_EMOJIS')
			) {
				message.channel
					.send('No tengo permisos de usar emojis externos')
					.then(e => e.delete({ timeout: 5000 }));
			} else {
				if (message.guild.member(client.user).hasPermission('ADD_REACTIONS')) {
					message.delete();
					let utilArr = [],
						devArr = [],
						conArr = [],
						ecoArr = [],
						admArr = [],
						intArr = [],
						imgArr = [];

					client.commands
						.filter(a => a.config.category == 'dev')
						.forEach(cmd => {
							devArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(x => x.config.category == 'img')
						.forEach(cmd => {
							imgArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'int')
						.forEach(cmd => {
							intArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'util')
						.forEach(cmd => {
							utilArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'con')
						.forEach(cmd => {
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

					let uno = client.emojis.cache.find(x => x.name == '11');
					let dos = client.emojis.cache.find(x => x.name == '22');
					let tres = client.emojis.cache.find(x => x.name == '33');
					let cuatro = client.emojis.cache.find(x => x.name == '44');
					let cinco = client.emojis.cache.find(x => x.name == '55');
					let seis = client.emojis.cache.find(x => x.name === '66');
					let trash = client.emojis.cache.find(x => x.name == 'trash');
					let arrow = client.emojis.cache.find(x => x.name == 'arrow');

					let n2 = client.commands.filter(a => a.config.category == 'util')
						.size;
					let n3 = client.commands.filter(a => a.config.category == 'dev').size;
					let n4 = client.commands.filter(a => a.config.category == 'con').size;
					let n5 = client.commands.filter(a => a.config.category == 'economia')
						.size;
					let n6 = client.commands.filter(a => a.config.category == 'admin')
						.size;
					let n7 = client.commands.filter(a => a.config.category == 'int').size;
					let n8 = client.commands.filter(x => x.config.category == 'img').size;

					let total = n2 + n3 + n4 + n5 + n6 + n7 + n8;
					let nada = 'https://i.ibb.co/wg6wYPT/1593842168495.png';

					const embed0 = new MessageEmbed()
						.setTitle('Opciones para que escojas')
						.setDescription(
							`${uno}: \`Escojes la sección de configuración\`\n${dos}: \`Escojes la sección de administración\`\n${tres}: \`Escojes la sección de economia\`\n${cuatro}: \`Escojes la sección de utilidad\`\n${cinco}: \`Escojes la sección de roleplay\`\n${seis}: \`Escojes la sección de imágenes\`\nTotal de comandos: \`${total}\``
						)
						.setColor('64ffc4');

					const embed = new MessageEmbed()
						.setTitle('> Sección de Configuración')
						.setDescription('• `' + conArr.map(a => a).join('` • `') + '`')
						.setColor('64ffc4')
						.setThumbnail(nada)
						

					const embed1 = new MessageEmbed()
						.setTitle('> Sección de Moderacion')
						.setDescription('• `' + admArr.map(a => a).join('` • `') + '`')
						.setColor('64ffc4')
						.setThumbnail(nada)

					const embed2 = new MessageEmbed()
						.setTitle('> Sección de Economia y social')
						.setDescription('• `' + ecoArr.map(a => a).join('` • `') + '`')
						.setColor('64ffc4')
						.setThumbnail(nada)

					const embed3 = new MessageEmbed()
						.setTitle('> Sección de Utilidad')
						.setDescription('• `' + utilArr.map(a => a).join('` • `') + '`')
						.setColor('64ffc4')
						.setThumbnail(nada);

					const embed4 = new MessageEmbed()
						.setTitle('> Sección de Roleplay')
						.setDescription('• `' + intArr.map(a => a).join('` • `') + '`')
						.setColor('64ffc4')
						.setThumbnail(nada)

					const embed5 = new MessageEmbed()
						.setTitle('> Sección de Imagenes')
						.setDescription('• `' + imgArr.map(a => a).join('` • `') + '`')
						.setColor('64ffc4')
						.setThumbnail(nada)

					if (!args[0]) {
						message.channel
							.send(
								'<a:a10:727039417956565073> |  Cargando los comandos, espera...'
							)
							.then(async msg => {
								await msg.react(uno);
								await msg.react(dos);
								await msg.react(tres);
								await msg.react(cuatro);
								await msg.react(cinco);
								await msg.react(seis);
								await msg.react(arrow);
								await msg
									.react(trash)
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
										if (reaction.emoji.name === '11') {
											msg.edit(embed);
										}
										if (reaction.emoji.name === '22') {
											await msg.edit(embed1);
										}
										if (reaction.emoji.name === '33') {
											await msg.edit(embed2);
										}
										if (reaction.emoji.name === '44') {
											await msg.edit(embed3);
										}
										if (reaction.emoji.name === '55') {
											await msg.edit(embed4);
										}
										if (reaction.emoji.name === '66') {
											await msg.edit(embed5);
										}
										if (reaction.emoji.name === 'arrow') {
											await msg.edit(embed0);
										}
										if (reaction.emoji.name === 'trash') {
											await msg.delete()
										}
									},
									{
										time: 60000
									}
								);
							});
					}
				}
			}
		 } else if(args[0] === "--all"){

			 let utilArr = [],
						devArr = [],
						conArr = [],
						ecoArr = [],
						admArr = [],
						intArr = [],
						imgArr = [];

					client.commands
						.filter(a => a.config.category == 'dev')
						.forEach(cmd => {
							devArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(x => x.config.category == 'img')
						.forEach(cmd => {
							imgArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'int')
						.forEach(cmd => {
							intArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'util')
						.forEach(cmd => {
							utilArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'con')
						.forEach(cmd => {
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
					let n5 = client.commands.filter(a => a.config.category == 'economia').size;
					let n6 = client.commands.filter(a => a.config.category == 'admin').size;
					let n7 = client.commands.filter(a => a.config.category == 'int').size;
					let n8 = client.commands.filter(x => x.config.category == 'img').size;
          let total = n2 + n3 + n4 + n5 + n6 + n7 + n8;
			 
			 let allCommands = new MessageEmbed()
			 .addField(`• RolePlay [${n7}]`, intArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Imagen [${n8}]`, imgArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Configuracion [${n4}]`, conArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Administracion [${n6}]`, admArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Economia [${n5}]`, ecoArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Util [${n2}]`, utilArr.map(a => `\`${a}\``).join(', '))
			 .setAuthor(client.user.username, client.user.displayAvatarURL())
			 .setTimestamp()
			 .setFooter(`total de comandos ${total}`)
			 .setColor('64ffc4')
			 .setImage("https://media.discordapp.net/attachments/632098744262721564/633640689955110912/nitro.gif")
			 message.channel.send(allCommands)

		 } else if(args[0] === "--dm"){
			 let utilArr = [],
						devArr = [],
						conArr = [],
						ecoArr = [],
						admArr = [],
						intArr = [],
						imgArr = [];

					client.commands
						.filter(a => a.config.category == 'dev')
						.forEach(cmd => {
							devArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(x => x.config.category == 'img')
						.forEach(cmd => {
							imgArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'int')
						.forEach(cmd => {
							intArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'util')
						.forEach(cmd => {
							utilArr.push(cmd.config.nombre);
						});
					client.commands
						.filter(c => c.config.category == 'con')
						.forEach(cmd => {
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
					let n5 = client.commands.filter(a => a.config.category == 'economia').size;
					let n6 = client.commands.filter(a => a.config.category == 'admin').size;
					let n7 = client.commands.filter(a => a.config.category == 'int').size;
					let n8 = client.commands.filter(x => x.config.category == 'img').size;
          let total = n2 + n3 + n4 + n5 + n6 + n7 + n8;
			 
			 let allCommandsDm = new MessageEmbed()
			 .addField(`• RolePlay [${n7}]`, intArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Imagen [${n8}]`, imgArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Configuracion [${n4}]`, conArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Administracion [${n6}]`, admArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Economia [${n5}]`, ecoArr.map(a => `\`${a}\``).join(', '))
			 .addField(`• Util [${n2}]`, utilArr.map(a => `\`${a}\``).join(', '))
			 .setAuthor(client.user.username, client.user.displayAvatarURL())
			 .setTimestamp()
			 .setFooter(`total de comandos ${total}`)
			 .setColor('64ffc4')
			 message.author.send(allCommandsDm).then(x => message.channel.send("Mira tus mensajes privados")).catch(e => {
                 let errorr = new MessageEmbed()
                 .setColor("ff0000")
                 .addField("Error", e)
                 .addField("Posible Solucion", "[1] Activa los dm\n[2] intenta usar --all")
                 .addField("Bug?", "Si aun no se soluciona informalo en nuestro server de soporte")
								 .setImage("https://media.discordapp.net/attachments/632098744262721564/633640689955110912/nitro.gif")
                 return message.channel.send(errorr)
             })
		 }
		} catch (err) {
			console.log(err);
		}
	}
};
