const Discord = require('discord.js');
const db = require('megadb');
const { GR } = require('../../niveles');
const levels_db = new db.crearDB('niveles');

module.exports = {
	config: {
		nombre: 'top',
		alias: ['ranklist'],
		descripcion: 'Muestra el top en el que estás',
		category: 'economia'
	},
	run: async (client, message, args) => {
		if (!levels_db.tiene(`${message.guild.id}`))
			return 'El servidor no cuenta con una base de datos de experiencia';
		let usuarios = GR(await levels_db.obtener(message.guild.id), message);
		usuarios.map(
			(usuario, index) =>
				(usuarios[index] = `<a:a6:708899956831813642> ${index + 1}: ${
					usuario[0]
				}\n            Nivel: ${usuario[1]}\n            XP: ${
					usuario[2]
				} / ${10 * usuario[1] ** 2 + 200 + usuario[1] + 200} `)
		);

		let pagina = [];
		let cantidad = 5;
		while (usuarios.length > 0) {
			pagina.push(usuarios.splice(0, cantidad));
		}

		let embed = new Discord.MessageEmbed();
		embed.setColor('64ffc4');
		embed.setThumbnail(message.guild.iconURL);
		embed.setFooter(`Pagina 1 de ${pagina.length} `);

		if (!args[0]) {
			embed.addField(
				`Top del server ${message.guild.name}`,
				`${pagina[0].join('\n')}`
			);
			return message.channel.send(embed);
		}

		if (isNaN(args[0]))
			return message.channel.send('Debe ingresar el número de la página');
		let se = parseInt(args[0]);
		if (se <= 0 || se > pagina.length)
			return message.channel.send(`La página ${se} no existe`);
		embed.addField(
			`Top del server ${message.guild.name}`,
			`${pagina[se - 1].join('\n')}`
		);
		embed.setFooter(`Página ${se} de ${pagina.length}`);
		return message.channel.send(embed);
	}
};
