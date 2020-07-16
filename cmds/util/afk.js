const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const afk = new db.crearDB('afk');
module.exports = {
	config: {
		nombre: 'afk',
		alias: '',
		descripcion: 'Entra en modo afk y que las demás personas te entiendan',
		category: 'util'
	},

	run: async (client, message, args) => {
		let razon = args.join(' ') || 'Sin razon';

		afk.establecer(`${message.guild.id}.${message.author.id}`, razon);

		let embed = new MessageEmbed()
			.setColor('64ffc4')
			.setTitle('🔔 | Usuario AFK')
			.setDescription(`Usuario: \`${message.author.tag}\`\nRazon: \`${razon}\``)
			.setThumbnail(message.author.avatarURL());
		message.channel.send(embed);
	}
};
