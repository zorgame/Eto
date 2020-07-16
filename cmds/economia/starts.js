const { mons } = require('../../config.json');
const { MessageEmbed , MessageCollector} = require('discord.js');
const db = require('megadb');
const pet = new db.crearDB('pets');

module.exports = {
	config: {
		nombre: 'start',
		alias: '',
		descripcion: 'Empieza tu aventura con una mascota',
		category: 'economia'
	},

	run: async (client, message, args) => {

			let collector = new MessageCollector(
			message.channel,
			m => m.author.id === message.author.id,
			{ max : 1 }
		)

		if (pet.tiene(message.author.id)) {
			let embed = new MessageEmbed()
			.setColor('ff0000').setDescription('Ya tienes una mascota');
			message.channel.send(embed);
		} else if (!pet.tiene(message.author.id)) {
			if (!args[0]) {
				let embed = new MessageEmbed()
					.setTitle('Nueva Mascota')
					.setDescription(
						'Para ver las mascotas escribe ey!start info <numero de mascota'
					)
					.addField(
						'N°1',
						'Sus estadísticas consisten en la velocidad y agilidad'
					)
					.addField('N°2', 'Sus estadísticas consisten en agilidad y daño')
					.addField('N°3', 'Sus estadísticas consisten en Atk especial y Daño')
					.addField('N°4', 'Sus estadísticas consisten en daño y velocidad')
					.addField(
						'N°5',
						'Sus estadísticas consisten en afk especial y velocidad'
					)
					.addField(
						'N°6',
						'Sus estadísticas consisten en +2 de daño y atk especial en -0,5'
					)
					.setColor('0cff00');
				message.channel.send(embed);
			} else if (args[0] === 'info') {
				if (!args[1]) {
					message.channel.send('¿ Y el número de la mascota ? ');
				} else if (isNaN(args[1])) {
					message.channel.send('Asegúrate de que sea un numero');
				} else if (args[1] > 6 || args[1] < 1) {
					message.channel.send('Esa mascota no existe');
				} else {

					let daño = mons[args[1]]["Daño"]
					let velocidad = mons[args[1]]["velocidad"]
					let defensa = mons[args[1]]["defensa"]
					let agilidad = mons[args[1]]["Agilidad"]
					let especial = mons[args[1]]["atks"]
					let vida = mons[args[1]]["life"]
					let nombre = mons[args[1]]["nombre"]
					let total = daño + velocidad + defensa + agilidad + especial + vida

					let yo = new MessageEmbed()
						.setTitle(`Mascota: ${nombre}`)
						.setDescription(`Vida: ${vida}\nDaño: ${daño}\nVelocidad: ${velocidad}\nDefensa: ${defensa}\nAgilidad: ${agilidad}\nAtk. Especial: ${especial}\nEstadisticas: ${total}`)
						.setImage(mons[args[1]]["image"])
						.setColor(mons[args[1]]["color"])
					message.channel.send(yo)
				
				}
			} else if(args[0]){
					if(args[0] > 6 || args[0] < 1){
						message.channel.send("Esa mascota no existe")
					} else if(isNaN(args[0])){
						message.channel.send("asegurate de que sea una mascota")
					} else {
        let nombre = mons[args[0]]["nombre"]
				message.channel.send(`Quieres aceptar a **${nombre}** como tu mascota?\nEscribe Y para aceptar o escribe N para denegar`)
				
				collector.on('collect', async message => {
					if(message.content.toLowerCase() == "y" || message.content.toLowerCase() == "yes" || message.content.toLowerCase() == "si") {

					let daño = mons[args[0]]["Daño"]
					let velocidad = mons[args[0]]["velocidad"]
					let defensa = mons[args[0]]["defensa"]
					let agilidad = mons[args[0]]["Agilidad"]
					let especial = mons[args[0]]["atks"]
					let vida = mons[args[0]]["life"]
					let nombre = mons[args[0]]["nombre"]
					let color = mons[args[0]]["color"]
					let image = mons[args[0]]["image"]
					let total = daño + velocidad + defensa + agilidad + especial + vida

						let ne = new MessageEmbed()
						.setTitle(`Tu nueva mascota: ${nombre}`)
						.setDescription(`Vida: ${vida}\nDaño: ${daño}\nVelocidad: ${velocidad}\nDefensa: ${defensa}\nAgilidad: ${agilidad}\nAtk. Especial: ${especial}\nEstadisticas: ${total}`)
						.setImage(image)
						.setThumbnail(message.author.avatarURL())
						.setColor(color)
					message.channel.send(ne)
					pet.establecer(`${message.author.id}.daño`, daño)
					pet.establecer(`${message.author.id}.vida`, vida)
					pet.establecer(`${message.author.id}.nombre`, nombre)
					pet.establecer(`${message.author.id}.velocidad`, velocidad)
					pet.establecer(`${message.author.id}.defensa`, defensa)
					pet.establecer(`${message.author.id}.agilidad`, agilidad)
					pet.establecer(`${message.author.id}.especial`, especial)
					pet.establecer(`${message.author.id}.level`, 0)
					pet.establecer(`${message.author.id}.xp`, 0)
					pet.establecer(`${message.author.id}.color`, color)
					pet.establecer(`${message.author.id}.image`, image)
					   } else if(message.content == "n" || message.content == "no"){
							 message.channel.send("proceso cancelado")
						 }
					 })
					}
		}
	}
}
}
