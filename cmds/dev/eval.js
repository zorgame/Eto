const Discord = require('discord.js');
const util = require('util');
function clean(text) {
	if (typeof text === 'string')
		return text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203));
	else return text;
}

module.exports = {
	config: {
		nombre: 'eval',
		alias: ['e'],
		descripcion: 'Secreto',
		category: 'dev'
	},

	run: async (client, message, args) => {
		const code = args.join(' ');
		if (!['493063208576483329'].includes(message.author.id))
			return message.channel.send(
				'No tienes permisos para ejecutar esta acción'
			)
		if("client.token".includes(code)) return message.channel.send("Tas joto o que?")

		const embed = new Discord.MessageEmbed()
			.setTitle(
				`${client.emojis.cache.find(x => x.name == 'a10')} Evaluando...`
			)
			.setColor(0xffff00)
			.addField('Entrada', '```js\n' + args.join(' ') + '\n```')
			.setFooter(
				message.author.tag,
				message.author.avatarURL({
					dynamic: true
				})
			)
			.setTimestamp();
		let m = await message.channel.send(embed);
		try {
			let output = clean(eval(code) )
			let type = typeof output;
			if (typeof output !== 'string') {
				output = util.inspect(output, { depth: 0 });
			}
			if (output.length >= 1020) {
				output = `${output.substr(0, 1010)}...`;
			}
			while (true) {
				if (!output.includes(process.env.TOKEN)) {
					break;
				}
				output = output.replace(process.env.TOKEN, 'Secreto');
			}
			const embed2 = new Discord.MessageEmbed()
				.setTitle('Resultado')
				.setColor(0x00ffff)
				.addField('Entrada', '```js\n' + args.join(' ') + '\n```')
				.addField('Salida', '```js\n' + output + '\n```')
				.addField('Tipo', '```js\n' + type + '\n```')
				.setFooter(
					message.author.tag,
					message.author.avatarURL({
						dynamic: true
					})
				)
				.setTimestamp();
			setTimeout(() => {
				m.edit(embed2);
			}, 2000);
		} catch (err) {
			const embed3 = new Discord.MessageEmbed()
				.setTitle('Error')
				.setColor(0xff0000)
				.addField('Entrada', '```js\n' + args.join(' ') + '\n```')
				.addField('Error', '```js\n' + err + '\n```')
				.setFooter(
					message.author.tag,
					message.author.avatarURL({
						dynamic: true
					})
				)
				.setTimestamp();
			setTimeout(() => {
				m.edit(embed3);
			}, 2000);
		}
	}
};
