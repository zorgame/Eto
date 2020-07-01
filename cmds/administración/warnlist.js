const db = require('megadb');
const warn = new db.crearDB('warn');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'warnlist',
		alias: ['warnlist'],
		descripcion: 'Mira la lista de advertencias de un usuario',
		category: 'admin'
	},

	run: async (client, message, args) => {
		const en = [];
		let normal = message.mentions.users.first() || message.author 
		
		if (!warn.tiene(`${message.guild.id}.${normal.id}`))
			return message.channel.send('Este usuario no tiene warns/advertencias');
		let total = await warn.obtener(`${message.guild.id}.${normal.id}`);
		
	var i = 1
	total.forEach(x => {
	   en.push([i+": " +total[i - 1]] )
	   i++
	})
		
		
		const embed = new MessageEmbed() 
		.setTitle(`Lista de warns del usuario ${normal.username}`)
		.setDescription("Aca abajo tendrás una lista de las advertencias que tiene el miembro")
		.setColor("64ffc4")
		.addField("Warns", en)
		.setThumbnail(normal.avatarURL())
		message.channel.send(embed)
	}
};
