const db = require('megadb');
const wel = new db.crearDB('wel');

module.exports = async (client, member) => {
	if (!wel.tiene(`${member.guild.id}.mensaje`)) {
		wel.establecer(
			`${member.guild.id}.mensaje`,
			'> Bienvenid@ {user:tag}\nEsperamos que la pases bien en nuestro server **{server}** por cierto se me olvidaba, gracias a ti somos {members} miembros'
		);
	}
	const { canal, mensaje, wrole} = await wel.obtener(member.guild.id);

	member.roles.add(wrole);

	let nada = mensaje
		.replace(/(?<![A-Z]){user}(?![A-Z])/gi, member)
		.replace(/(?<![A-Z]){user:tag}(?![A-Z])/gi, member.user.tag)
		.replace(/(?<![A-Z]){user:name}(?![A-Z])/gi, member.user.username)
		.replace(/(?<![A-Z]){server}(?![A-Z])/gi, member.guild.name)
		.replace(/(?<![A-Z]){members}(?![A-Z])/gi, member.guild.memberCount);

	await client.channels.cache.get(canal).send(nada);
};
