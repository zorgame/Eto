const { MessageEmbed } = require('discord.js');
const { cyan } = require(`../../colores.json`);
module.exports = {
	config: {
		nombre: 'rating',
		alias: ['clasificacion'],
		descripcion: 'Califica a un miembro mediante estrellas',
		category: 'util'
	},
	run: async (client, message, args) => {
		let mencion =
			message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		let embed = new MessageEmbed();
		if (!mencion)
			message.channel.send(`Nescesitas mencionar a alguien o escribir la id`);
		else {
			let punt = Math.floor(Math.random() * 11),
				stars = '',
				y = '<:estrellanormal:709059624078147614>',
				b = '<:Estrellanegra:709058412553568327>';
			if (punt === 0) {
				stars = `${b} ${b} ${b} ${b} ${b} ${b} ${b} ${b} ${b} ${b}`;
			} else if (punt === 1) {
				stars = `${y} ${b} ${b} ${b} ${b} ${b} ${b} ${b} ${b} ${b}`;
			} else if (punt === 2) {
				stars = `${y} ${y} ${b} ${b} ${b} ${b} ${b} ${b} ${b} ${b}`;
			} else if (punt === 3) {
				stars = `${y} ${y} ${y} ${b} ${b} ${b} ${b} ${b} ${b} ${b}`;
			} else if (punt === 4) {
				stars = `${y} ${y} ${y} ${y} ${b} ${b} ${b} ${b} ${b} ${b}`;
			} else if (punt === 5) {
				stars = `${y} ${y} ${y} ${y} ${y} ${b} ${b} ${b} ${b} ${b}`;
			} else if (punt === 6) {
				stars = `${y} ${y} ${y} ${y} ${y} ${y} ${b} ${b} ${b} ${b}`;
			} else if (punt === 7) {
				stars = `${y} ${y} ${y} ${y} ${y} ${y} ${y} ${b} ${b} ${b}`;
			} else if (punt === 8) {
				stars = `${y} ${y} ${y} ${y} ${y} ${y} ${y} ${y} ${b} ${b}`;
			} else if (punt === 9) {
				stars = `${y} ${y} ${y} ${y} ${y} ${y} ${y} ${y} ${y} ${b}`;
			} else if (punt === 10) {
				stars = `${y} ${y} ${y} ${y} ${y} ${y} ${y} ${y} ${y} ${y}`;
			}

			embed
				.setTitle(`Calificación por miembro`)
				.setColor("64ffc4")
				.setDescription(
					`${mencion} || Tiene una calificación de: \n${stars} (${punt}) Estrellas  `
				);
			message.channel.send(embed);
		}
	}
};
