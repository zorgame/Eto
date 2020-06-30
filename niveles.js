const Discord = require('discord.js');
const db = require('megadb');
let levels_db = new db.crearDB('niveles');
let cooldownniveles = new Map();

module.exports = {
	NF: async message => {
		if (cooldownniveles.has(message.guild.id + message.author.id)) {
			let cooldown = cooldownniveles.get(message.guild.id + message.author.id);
			if (Date.now() < cooldown) {
				return;
			}
		}

		if (!levels_db.tiene(message.guild.id))
			levels_db.establecer(message.guild.id, {});

		if (!levels_db.tiene(`${message.guild.id}.${message.author.id}`))
			levels_db.establecer(`${message.guild.id}.${message.author.id}`, {
				xp: 0,
				nivel: 1
			});

		let { xp, nivel } = await levels_db.obtener(
			`${message.guild.id}.${message.author.id}`
		);
		let randomxp = Math.floor(Math.random() * 10) + 1;
		let levelup = 5 * nivel ** 2 + 50 + nivel + 100;

		cooldownniveles.set(
			message.guild.id + message.author.id,
			Date.now() + 10000
		);

		if (xp + randomxp >= levelup) {
			levels_db.establecer(`${message.guild.id}.${message.author.id}`, {
				xp: xp,
				nivel: parseInt(nivel + 1)
			});

			let embed = new Discord.MessageEmbed()
				.setDescription(
					`${message.member} Felicidades acabas de subir a ${parseInt(
						nivel + 1
					)}`
				)
				.setColor('RANDOM')
				.setTitle('Levelup');
			return message.channel.send(embed).then(e => e.delete({ timeout: 2500 }));
		} else {
			levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp);
		}
	},
	GR: (users, message) => {
		let userlist = [];

		for (var key in users) {
			let usuario = message.guild.members.cache.has(key)
				? message.guild.members.cache.get(key).user.tag
				: `Salió (${key}) `;
			userlist.push([usuario, users[key].nivel, users[key].xp]);
		}

		userlist.sort((user1, user2) => {
			return user2[1] - user1[1] || user2[2] - user1[2];
		});

		return userlist;
	}
};
