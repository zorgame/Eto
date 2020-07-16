const { kiss } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
	config: {
		nombre: 'kiss',
		alias: '',
		descripcion: 'Besa a la persona que más quieras',
		category: 'int'
	},

	run: async (client, message, args) => {
		try {
			let normal =
				message.mentions.users.first() || client.users.cache.get(args[0]);

			let random = await kiss[Math.floor(Math.random() * 10)]
			
			let besosolo = [
				`Hubo tanto amor propio entre ${message.author}, Que ${
					client.user
				} Lo beso`,
				`${message.author} Se sentía tan solo en ${message.guild.name} que ${
					client.user
				} lo beso`,
				`No te beses tu mismo mejor lo hago yo`
			];
			let besoyo = [
				`${message.author} Me esta besando 😳`,
				`Hay probabilidad que entre ${
					message.author
				} y yo halla quimica por ese beso`,
				`${message.author} No me beses, pero gracias`
			];
			let nBeso = [
				`${message.author} Esta besando al aire porque a él nadie lo quiere`,
				`${message.author}  Así besa al de abajo`,
				`La próxima novia de ${
					message.author
				} lo besara así || Aunque sabemos que nunca tendra||`
			];

			let nnBeso = await nBeso[Math.floor(Math.random() * 3)];
			let bRandom = await besoyo[Math.floor(Math.random() * 3)];
			let sRandom = await besosolo[Math.floor(Math.random() * 3)];

			if (!normal) {
				let embed = new MessageEmbed()
					.setTitle('Solitario')
					.setDescription(nnBeso)
					.setImage(random)
					.setColor('64ffc4');
				await message.channel.send(embed);
			} else if (normal.id == message.author.id) {
				let embed = new MessageEmbed()
					.setColor('64ffc4')
					.setTitle(`Kiss - Besos`)
					.setDescription(sRandom)
					.setImage(random);
				await message.channel.send(embed);
			} else	if (normal.id == client.user.id) {
				let embed = new MessageEmbed()
					.setDescription(bRandom)
					.setImage(random)
					.setColor('64ffc4')
					.setTitle('Posible química entre un bot');
				await message.channel.send(embed);
			} else if(normal) {
			  	let embed = new MessageEmbed()
					.setDescription(`${message.author} Beso a ${normal}`)
					.setImage(random)
					.setColor('64ffc4')
					.setTitle('Tortolos');
				await message.channel.send(embed);
			  
			}
		} catch (err) {
			message.channel.send("Error: " + err);
		}
	}
};
