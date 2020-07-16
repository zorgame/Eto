const { mons } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const pet = new db.crearDB('pets');
const prefix = new db.crearDB('prefixes');
let cooldown = new db.crearDB('cooldownP');
let ms = require('ms');
const dinero = new db.crearDB('dinero');
const gemas = new db.crearDB('gemas');
const misiones = [
	'3 razores iban a destruir el pueblo pero tu mascota uso Grass Ball para sujetarlos y calmarlos',
	'Quien lo diría tu mascota encontró un tesoro escondido',
	'Un duelo de ángeles provocó una línea en la mitad de la tierra y tu mascota uso el prismal magic para destrozar las piedras que obstruian el paso',
	'En el campo de los cangrejos hubo una batalla entre los olfos y los razores, pero tu mascota soluciono la batalla',
	'Tu mascota escarbando encontró un mapa del tesoro que lo dirijo a los paisajes de los escarabajos grises',
	'3 tempest estaban clamando un Falcón Ice pero era de nivel 300 tu mascota los ayudó pero casi muere',
	'Tu mascota está apuntó de llegar a un nuevo nivel después de pelear con 3 fascoseos pardos',
	'ES probable que halla encontrado una bolsa de gemas',
	'Nuevo documento encontrado tu mascota puede que haya encontrado cosas buenas',
	'Nivel Forast Power hallado en un pueblo viejo, tu mascota con 3 lideres de monstruos fueron a buscar y llevaron buena mercacncia',
	'Proximamente sabras nuevas cosas de tu mascota, pero mira que encontro'
];

module.exports = {
	config: {
		nombre: 'find',
		alias: ['buscar'],
		descripcion: 'Busca batallas con enemigos',
		category: 'economia'
	},

	run: async (client, message, args) => {
		if (cooldown.tiene(message.author.id)) {
			let huh = await cooldown.obtener(message.author.id);
			if (huh - Date.now() <= 0) {
				cooldown.eliminar(message.author.id);
			}
		}

		const p = await prefix.obtener(message.guild.id);

		if (!pet.tiene(message.author.id)) {
			message.channel.send(
				`No tienes una mascota, escripe ${
					p ? p : 'ey!'
				}start y miraras las posibilidades que puedes obtener. Recuerda descansar a tu mascota`
			);
		} else if (pet.tiene(message.author.id)) {
			let {
				daño,
				vida,
				nombre,
				velocidad,
				defensa,
				agilidad,
				especial,
				level,
				color,
				image,
				xp
			} = await pet.obtener(message.author.id);

			if (cooldown.tiene(message.author.id)) {
				let tiempoT = await cooldown.obtener(message.author.id);
				let tiempo = await ms(tiempoT - Date.now());
				message.channel.send(
					`Debes esperar \`${tiempo}\` para seguir buscando, mejor descansa tu mascota`
				);

				if (cooldown.tiene(message.author.id)) {
					let cho = await cooldown.obtener(message.author.id);
					setTimeout(() => {
						cooldown.eliminar(message.author.id);
					}, cho - Date.now());
				}
			} else if (!cooldown.tiene(message.author.id)) {
				cooldown.establecer(message.author.id, Date.now() + 300000);
				let mis = misiones[Math.floor(Math.random() * 10)];
				let random = Math.floor(Math.random() * 50) + 1;
				let vid = Math.floor(Math.random() * vida);
				pet.sumar(`${message.author.id}.xp`, random);
				const dinep = Math.floor(Math.random() * (500 - 100) + 100);

				let gem1 = Math.floor(Math.random() * 5);
				let gem2 = Math.floor(Math.random() * 10);
				let gem3 = Math.floor(Math.random() * 20);
				let gem4 = Math.floor(Math.random() * 40);
				let gem5 = Math.floor(Math.random() * 80);
				let gem6 = Math.floor(Math.random() * 160);

				if (!dinero.tiene(message.author.id)) {
					dinero.establecer(message.author.id, dinep);
				}
				if (dinero.tiene(message.author.id)) {
					dinero.sumar(message.author.id, dinep);
				}
				if (!gemas.tiene(message.author.id)) {
					gemas.establecer(`${message.author.id}.uno`, gem1);
					gemas.establecer(`${message.author.id}.dos`, gem2);
					gemas.establecer(`${message.author.id}.tres`, gem3);
					gemas.establecer(`${message.author.id}.cuatro`, gem4);
					gemas.establecer(`${message.author.id}.cinco`, gem5);
					gemas.establecer(`${message.author.id}.seis`, gem6);
				}
				if (gemas.tiene(message.author.id)) {
					gemas.sumar(`${message.author.id}.uno`, gem1);
					gemas.sumar(`${message.author.id}.dos`, gem2);
					gemas.sumar(`${message.author.id}.tres`, gem3);
					gemas.sumar(`${message.author.id}.cuatro`, gem4);
					gemas.sumar(`${message.author.id}.cinco`, gem5);
					gemas.sumar(`${message.author.id}.seis`, gem6);
				}
				let gemaE1 = '<:gema1:728989095048773683>';
				let gemaE2 = '<:gema2:728989072319840326>';
				let gemaE3 = '<:gema3:728989044800880734>';
				let gemaE4 = '<:gema4:728989019534393355>';
				let gemaE5 = '<:gema5:728988995266150440>';
				let gemaE6 = '<:gema6:728988967458046052>';

				let embed = new MessageEmbed()
					.setTitle('Tu mascota encontro')
					.addField(`Estadiscticas`, `Vida Restante: ${vid}\nXP: ${random}`)
					.addField('Mision', mis)
					.addField(
						'Recolectado',
						`${gemaE1}: x${gem1} ${gemaE2}: x${gem2}\n${gemaE3}: x${gem3} ${gemaE4}: x${gem4}\n${gemaE5}: x${gem5}  ${gemaE6}: x${gem6}\n<a:a7:715787660207325245> Dinero: ${dinep}`
					)
					.setThumbnail(image)
					.setColor(color);
				message.channel.send(embed);
			}
		}
	}
};
