const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const dinero = new db.crearDB('dinero');
const { cyan } = require('../../colores.json');

module.exports = {
	config: {
		nombre: 'cartera',
		alias: ['bal', 'credits'],
		descripcion: 'Mira el dinero que tienes en tu cartera',
		category: 'economia'
	},
	run: async (client, message, args) => {
		let kk = message.mentions.users.first() || message.author;
		let bb = kk.id;
		if (!dinero.tiene(bb)) {
			dinero.establecer(bb, 0);
		}

		let total = await dinero.obtener(bb);

		let embed = new MessageEmbed()
			.setColor("64ffc4")
			.setTitle(`Cartera de ${kk.username}`)
			.setDescription(`Total de dinero: <a:a7:715787660207325245> ${total} `);
		message.channel.send(embed);
	}
};
