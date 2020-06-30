const db = require('megadb');
const nivel = new db.crearDB('niveles');
module.exports = {
	config: {
		nombre: 'addxp',
		alias: ['add-xp'],
		descripcion: 'Aumenta tu xp con este comando - Solo administradores',
		category: 'economia'
	},

	run: async (client, message, args) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');

		if (!permisos) {
			return message.channel
				.send('No tienes **permisos** para ejecutar el comando')
				.then(e => e.delete({ timeout: 2500 }));
		}

		let usuario =
			message.mentions.users.first()
		if (!usuario)
			return message.channel.send(
				'Debes mencionar a algún miembro'
			)
			if(!args[1])return message.channel.send("Te falto agregar cuanto de xp quieres sumar ")
		let no = args.slice(1).join(' ');
		if (isNaN(no))
			return message.channel.send(
				'Te falto decir el número de xp que quieres agregar'
			);

		nivel.sumar(`${message.guild.id}.${usuario.id}.xp`, no);

		message.channel.send(
			`Al usuario ${usuario.username} le acabo de agregar ${no} de xp`
		);
	}
};
