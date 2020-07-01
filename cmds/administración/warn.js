const db = require('megadb');
const warn = new db.crearDB('warn');
const {MessageEmbed} = require('discord.js')
module.exports = {
	config: {
		nombre: 'warn',
		alias: ['w'],
		descripcion: '',
		category: 'admin'
	},

	run: async (client, message, args) => {
		let normal = message.mentions.users.first();
		let kk = args.slice(1).join(' ') || "Sin razon"
		if(kk.length > 50) return message.channel.send("No debe pasarse de 50 caracteres")
		if(normal.id == message.author.id) return message.channel.send("No puedes auto warnearte")
		if(normal.id == client.user.id) return message.channel.send("No puedes warnearme")
		const member = message.guild.members.resolve(normal)
		if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0)return message.channel.send('Esta persona tiene igual o mayor role que tu, no puedes warnearlo');
        if(!normal) return message.channel.send("Debes mencionar a quien Warnear por incumplir las reglas")
	
		if (warn.tiene(`${message.guild.id}.${normal.id}`)) {
			warn.push(`${message.guild.id}.${normal.id}`, kk)
		}
		if (!warn.tiene(`${message.guild.id}.${normal.id}`)) {
			warn.establecer(`${message.guild.id}.${normal.id}`, [kk]);
		}
		const total = await warn.obtener(`${message.guild.id}.${normal.id}`)
		const n = total.length
		
		const embed = new MessageEmbed() 
		.setColor("64ffc4")
		.setTitle("Nueva advertencia")
		.setDescription("Nuevo usuario advertido, Abajo tendrás más información")
		.addField("> ⦾ Moderador", message.author.username)
		.addField("> ⦾ Advertido", normal.username)
		.addField("> ⦾ Razon", "```" + kk + "```")
		.addField("> ⦾ Total de warns", "**" + n + "**")
		message.channel.send(embed)
	}
};
