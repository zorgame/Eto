const db = require('megadb');
const yo = new db.crearDB('niveles');
module.exports = {
	config: {
		nombre: 'removenivel',
		alias: ['remove-nivel'],
		descripcion: 'Sustrae nivel con este comando - Solo administradores',
		category: 'economia'
	},

	run: async (client, message, args) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');

		if (!permisos) {
			return message.channel
				.send('No tienes **permisos** para ejecutar el comando')
				.then(e => e.delete({ timeout: 2500 }));
		}

		let usuario = message.mentions.users.first();
		if (!usuario)
			return message.channel.send('Debes mencionar a algún miembro');
		if (!args[1])
			return message.channel.send(
				'Te falto agregar cuanto de nivel/es quieres eliminar'
			);

		let no = args.slice(1).join(' ');
		if (isNaN(no))
			return message.channel.send(
				'Te falto decir el número de nivel/es que quieres eliminar'
			);
		let { nivel } = await yo.obtener(`${message.guild.id}.${usuario.id}`);
		if (nivel - no <= '0') {
			yo.establecer(`${message.guild.id}.${usuario.id}.nivel`, 1);
		} else {
			yo.restar(`${message.guild.id}.${usuario.id}.nivel`, no);
		}
		message.channel.send(
			`Al usuario ${usuario.username} le acabo de eliminar ${no} de nivel/es`
		);
	}
};
