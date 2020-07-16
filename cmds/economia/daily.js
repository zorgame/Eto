const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const dinero = new db.crearDB('dinero');
const cooldown = new db.crearDB('cooldown');
const ms = require('pretty-ms')
const gemas = new db.crearDB("gemas")

module.exports = {
	config: {
		nombre: 'daily',
		alias: ['diario'],
		descripcion: 'Cada 24h recibes 250c',
		category: 'economia'
	},
	run: async (client, message, args) => {
		let tiempo = 86400000;

		if (cooldown.tiene(message.author.id)) {
			var m = await cooldown.obtener(message.author.id);
			let mm = await ms(m - Date.now());
			let msg = '<a:a2:708873679269920797> | Debes esperar `' + mm + '` para tu proximo pago';
			message.channel.send(`<a:a10:727039417956565073> | Cargando...`).then(e =>
				setTimeout(() => {
					e.edit(msg);
				}, 5000)
			);

			setTimeout(() => {
				cooldown.eliminar(message.author.id);
			}, m - Date.now());
		}

		if (!cooldown.tiene(message.author.id)) {
			cooldown.establecer(message.author.id, Date.now() + tiempo)
			if (!dinero.tiene(message.author.id)) {
				dinero.establecer(message.author.id, 250);
			}
			if (dinero.tiene(message.author.id)) {
				dinero.sumar(message.author.id, 250);
			}
			let bb = message.author.id
      if (!gemas.tiene(message.author.id)) {
				gemas.establecer(`${bb}.uno`, 5);
				gemas.establecer(`${bb}.dos`, 10);
				gemas.establecer(`${bb}.tres`, 20);
				gemas.establecer(`${bb}.cuatro`, 40);
				gemas.establecer(`${bb}.cinco`, 80);
				gemas.establecer(`${bb}.seis`, 160);
			}

		let gemaE1 = "<:gema1:728989095048773683>"
		let gemaE2 = "<:gema2:728989072319840326>"
		let gemaE3 = "<:gema3:728989044800880734>"
		let gemaE4 = "<:gema4:728989019534393355>"
		let gemaE5 = "<:gema5:728988995266150440>"
		let gemaE6 = "<:gema6:728988967458046052>"

		if (gemas.tiene(message.author.id)) {
				gemas.sumar(`${message.author.id}.uno`, 1);
				gemas.sumar(`${message.author.id}.dos`, 5);
				gemas.sumar(`${message.author.id}.tres`, 10);
				gemas.sumar(`${message.author.id}.cuatro`, 20);
				gemas.sumar(`${message.author.id}.cinco`, 40);
				gemas.sumar(`${message.author.id}.seis`, 80);
			}
			let embedd = new MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.addField("Premios", `${gemaE1}: 1\n${gemaE2}: 5\n${gemaE3}: 10\n${gemaE4}: 20\n${gemaE5}: 40\n${gemaE6}: 80\n<a:a7:715787660207325245>: 250`)
      .setColor(message.member.displayHexColor)
			message.channel.send(embedd);
		}
	}
};
