const db = require('megadb');
const wel = new db.crearDB('wel');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		nombre: 'sets',
		alias: '',
		descripcion:
			'Mira todas las estadistas de configuración que tienes en el servidor',
		category: 'con'
	},

	run: async (client, message, args) => {
		let { canal, mensaje, wrole } = await wel.obtener(message.guild.id)
	   
		 wrole ? message.guild.roles.cache.find(x => x.id == wrole).name :  "Sin role"
	

		let embed = new MessageEmbed()
			.setTitle('Logs - Configuraciones actuales')
			.setDescription(
				'Para tener conocimiento de tus Logs - configuraciones actuales mira abajo de este mensaje'
			)
			.addField(
				'> Canal de bienvenidas', `\`\`\`${canal ? client.channels.cache.get(canal).name : "Sin canal"}\`\`\``
			)
			.addField(
				'> Mensaje de bienvenida',`\`\`\`${mensaje ? mensaje : `bien en nuestro server **{ser> Bienvenid@ {user:tag}\nEsperamos que la pases ver}** por cierto se me olvidaba, gracias a ti somos {members} miembros (default)`}\`\`\``
			)
			.addField(
				'> Role de bienvenida', `\`\`\` ${wrole ? message.guild.roles.cache.find(x => x.id == wrole).name :  "Sin role"} \`\`\``
			)
			.setColor('64ffc4')
			.setThumbnail(message.guild.iconURL()) ;
		message.channel.send(embed);
	}
};
