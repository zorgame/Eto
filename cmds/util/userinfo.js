module.exports = {
	config: {
		nombre: 'userinfo',
		alias: ['u-s'],
		descripcion: 'Mira la informacio de un usuario',
		category: 'util'
	},

	run: async (client, message, args) => {
		const { MessageEmbed } = require('discord.js');
		let user = message.mentions.users.first() || message.author;
		let member = message.mentions.members.first() || message.member;
		let estados = {
			online: '<a:online:728611791612936252> | Online',
			dnd: '<a:ocupado:728611825528340482> | No molestar',
			offline: '<a:offline:728611856608002108> | Desconectado',
			streaming: '<a:streaming:728611916720635974> | En directo',
			idle: '<a:disponible:728611886005878804> | Ausente'
		};
		let is = {
			web: '<:p_:730609654786162698> | Web',
			mobile: '<:i_:730609686189047920> | Movil',
			desktop: '<:c_:730609628815163453> | App',
			null: ":x: | Sin instancia"
		};
		let total = user.presence.clientStatus ? Object.keys(user.presence.clientStatus) : "sin status" 
		const moment = require('moment');
		require('moment-duration-format');

		let insignias = {
			HOUSE_BRAVERY: '<:HypeSquadBravery:730658472613380126>',
			HOUSE_BRILLIANCE: '<:HypeSquadBrilliance:730658496231637053>',
			HOUSE_BALANCE: '<:HypeSquadBalance:730658543153315940>',
			BUGHUNTER_LEVEL_1: '<:DiscordBugHunter:730658411343249440>',
			VERIFIED_DEVELOPER: '<:VerifiedBotDeveloper:730658298562478171>',
			DISCORD_PARTNER: '<:DiscordPartner:730657865215508490>',
			EARLY_SUPPORTER: '<:DiscordNitroEarlySupporter:730658322763481159>'
		};

		let embed = new MessageEmbed()
			.addField(
				'<a:a1:708879180322046025>  | Informacion',
				`**Bot:** ${user.bot ? 'Si' : 'No'}\n**Insignias:** ${user.flags
					.toArray()
					.map(x => insignias[x])
					.join(' ') || 'Sin insignias'}\n**Apodo:** ${
					member.nickname ? member.nickname : 'No tiene'
				}\n**Usuario:** ${user.username}\n**Discriminador:** ${
					user.discriminator
				}\n**ID:** ${user.id}\n**Completo:** ${user.tag}`
			)
			.addField(
				'Instancias',
				`${estados[user.presence.status]}\n${total ? is[total] :
					'<a:discord:729085035629641780> El usuario esta en 2 o mas dipositivos'}`
			)
			.addField(
				'Actividades',
				`\n${
					Object.keys(user.presence.activities)
						? '<a:men:729085605668978781> Ninguna Actividad Reciente'
						: user.presence.activities 
				}`
			)
			.addField(
				'Cantidad',
				`N° Roles: ${member.roles.cache.size}\nN° Canales: ${
					message.guild.channels.cache.filter(x =>
						x.permissionsFor(member).has('VIEW_CHANNEL')
					).size
				}`
			)
			.addField(
				'Roles',
				`\`\`\`${member.roles.cache.map(x => x.name).join(' / ')}\n\`\`\``
			)
			.addField(
				'Canales',
				`\`\`\`${message.guild.channels.cache
					.filter(x => x.permissionsFor(member).has('VIEW_CHANNEL'))
					.map(x => x.name)
					.join('\n')}\`\`\``
			)
			.addField(
				'Ingresos',
				`Cuenta creada: \`${moment(user.createdAt).format(
					'DD/MM/YYYY'
				)}\`\nFecha de ingreso: \`${moment(member.joinedAt).format(
					'DD/MM/YYYY'
				)}\``
			)
			.addField('Avatar', `**[Descarga Aqui](${user.avatarURL()})**`)
			.setImage(user.avatarURL())
			.setColor('RED');
		message.channel.send(embed);
	}
};
