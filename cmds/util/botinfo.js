const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'botinfo',
		alias: ['stats'],
		descripcion: 'Mira mis stats',
		category: 'util'
	},

	run: async (client, message, args) => {
		
		let ms = require("pretty-ms")
		tiempo = ms(client.uptime)
			
		let embed = new MessageEmbed()
			.setTitle('📚 Información actual - **Eto Yoshimura**')
			.addField(
				'> <a:verify:729193046591275069> Información',
				`\`\`\`⦾ Usuarios: ${client.users.cache.size.toLocaleString()}\n⦾ Canales: ${client.channels.cache.size.toLocaleString()}\n⦾ Servidores: ${client.guilds.cache.size.toLocaleString()}\n⦾ Memoria: ${parseInt(
					(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
				)}MB/${parseInt(
					(require('os').totalmem() / 1024 / 1024).toFixed(2)
				)}MB\n⦾ Comandos: ${client.commands.size}\n⦾ Uptime: ${tiempo}\`\`\``
			)
			.addField("> <a:caja:729196174673969202> | Desarrollador", `\`\`\`⦾ Developer: ZorGame#8769\n⦾ Pruebas: Weas Raras - By ZorGame\n⦾ Ayudantes: Javi ϟ#8067 𝓐𝓷𝓸𝓽𝓱𝓮𝓻#3467\n⦾ Lenguaje: JavaScript\n⦾ Libreria: discord.js ${require("discord.js").version}\`\`\``)
			.setColor('64ffc4')
		message.channel.send(embed);
	}
};
