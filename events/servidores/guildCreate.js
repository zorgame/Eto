module.exports = async (client, Guild) => {
	const { MessageEmbed } = require('discord.js');
	const db = require('megadb');
	const guild = new db.crearDB('guild');
	const canal = await guild.obtener(client.user.id);

	const embed = new MessageEmbed()
		.setTitle('Nuevo servidor')
		.setDescription(
			'Alguien me ha agregado a su Server, abajo tendrás más información'
		)
		.addField('> Nombre', Guild.name)
		.addField('> ID', Guild.id)
		.addField('> Miembros', Guild.memberCount)
		.addField('> Roles', Guild.roles.cache.size)
		.addField('> Canales', Guild.channels.cache.size)
		.setColor('64ffc4')
		.setThumbnail(Guild.iconURL());

	await client.channels.cache.get(canal).send(embed);
};
