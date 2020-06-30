const db = require('megadb');
const wel = new db.crearDB('wel');

module.exports = async (client, member) => {
	const { canal, mensaje } = await wel.obtener(member.guild.id);

	let nada = mensaje
		.replace(/(?<![A-Z]){user}(?![A-Z])/gi, member)
		.replace(/(?<![A-Z]){user:tag}(?![A-Z])/gi, member.user.tag)
		.replace(/(?<![A-Z]){user:name}(?![A-Z])/gi, member.user.username)
		.replace(/(?<![A-Z]){server}(?![A-Z])/gi, member.guild.name)
		.replace(/(?<![A-Z]){members}(?![A-Z])/gi, member.guild.memberCount);

	await client.channels.cache.get(canal).send(nada);
};
