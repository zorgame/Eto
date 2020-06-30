const Discord = require('discord.js');
const db = require('megadb');
const levels_db = new db.crearDB('niveles');

module.exports = {
	config: {
		nombre: 'rank',
		alias: '',
		descripcion: 'Este comando te muestra tu xp y nivel que tienes',
		category: 'economia'
	},

	run: async (client, message, args) => {
		if (!levels_db.tiene(`${message.guild.id}`))
			return message.channel.send(
				'Este servidor no tiene a nadie en el ranklist'
			);

		let usuario = message.mentions.users.first() || message.author;

		if (!levels_db.tiene(`${message.guild.id}.${usuario.id}`))
			levels_db.establecer(`${message.guild.id}.${usuario.id}`, {
				xp: 0,
				nivel: 0
			});

		let { xp, nivel } = await levels_db.obtener(
			`${message.guild.id}.${usuario.id}`
		);
		let levelup = 5 * nivel ** 2 + 50 + nivel + 100;
		let embed = new Discord.MessageEmbed()
			.setColor('64ffc4')
			.setDescription(
				`Stats del usuario ${usuario} \nXP: ${xp}/${levelup}\nNivel: ${nivel}`
			);
		message.channel.send(embed);
	}
};
