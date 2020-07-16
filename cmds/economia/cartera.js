const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const dinero = new db.crearDB('dinero');
const { cyan } = require('../../colores.json');
const gemas = new db.crearDB("gemas")

module.exports = {
	config: {
		nombre: 'cartera',
		alias: ['bal', 'credits'],
		descripcion: 'Mira el dinero que tienes en tu cartera',
		category: 'economia'
	},
	run: async (client, message, args) => {
		let kk = message.mentions.users.first() || message.author;
		let bb = kk.id
		if (!dinero.tiene(bb)) {
			dinero.establecer(bb, 0);
		}

		if (!gemas.tiene(bb)) {
				gemas.establecer(`${bb}.uno`, 0);
				gemas.establecer(`${bb}.dos`, 0);
				gemas.establecer(`${bb}.tres`, 0);
				gemas.establecer(`${bb}.cuatro`, 0);
				gemas.establecer(`${bb}.cinco`, 0);
				gemas.establecer(`${bb}.seis`, 0);
			}

		let total = await dinero.obtener(bb)

		let gemaE1 = "<:gema1:728989095048773683>"
		let gemaE2 = "<:gema2:728989072319840326>"
		let gemaE3 = "<:gema3:728989044800880734>"
		let gemaE4 = "<:gema4:728989019534393355>"
		let gemaE5 = "<:gema5:728988995266150440>"
		let gemaE6 = "<:gema6:728988967458046052>"

		let {uno, dos, tres, cuatro, cinco, seis } = await gemas.obtener(bb)

		let embed = new MessageEmbed()
			.setColor("64ffc4")
			.setAuthor(kk.username, kk.displayAvatarURL())
			.addField("Gemas",`${gemaE1}: x${uno}  ${gemaE2}: x${dos}\n${gemaE3}: x${tres}  ${gemaE4}: x${cuatro}\n${gemaE5}: x${cinco}  ${gemaE6}: x${seis}`)
			.addField("Dinero", `<a:a7:715787660207325245> ${total}`)
		message.channel.send(embed);
	}
};
