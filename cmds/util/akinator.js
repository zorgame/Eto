const akinator = require('mech-aki');
const Discord = require('discord.js');
module.exports = {
	config: {
		nombre: 'akinator',
		alias: ['aki'],
		descripcion: 'Adivina tu personaje',
		category: 'util'
	},
	run: async (client, message, args) => {
		if (!'493063208576483329'.includes(message.author.id)) {
			message.channel.send('Comando anda en mantenimiento');
		} else {
			try {
				var embed = new Discord.MessageEmbed().setColor('64ffc4');

				let aki = new akinator('es');
				let pregunt = await aki.empezar();
				embed.setTitle(pregunt.pregunta);
				var respuestas = new Map([
					['✅', 0],
					['❌', 1],
					['❓', 2],
					['🤔', 3],
					['😞', 4],
					['🔙', -9]
				]);
				var array_respuestas = ['✅', '❌', '❓', '🤔', '😞', '🔙'];

				embed.addField(
					'Opciones',
					`✅: Sí\n❌: No\n❓: No lo sé\n🤔: Probablemente sí\n😞: Probablemente no\n🔙: Atrás`,
					false
				);
				var msg = await message.channel.send(embed);
				for (let index = 0; index < array_respuestas.length; index++)
					await msg.react(array_respuestas[index]);
				while (aki.progreso < 85) {
					console.log(aki.progreso);
					var respuesta = await new Promise((resolve, reject) => {
						var collector = msg.createReactionCollector(
							async (reaction, user) => {
								if (message.author.id !== user.id) return;
							},
							{ time: 60000 }
						);
						collector.on('collect', r => {
							resolve(r.emoji.name);
						});
						collector.on('end', collected => resolve(null));
					});
					if (!respuesta) return msg.delete();
					var respuesta_num = respuestas.get(respuesta);
					pregunt =
						respuesta_num != -9
							? await aki.siguiente(respuesta_num)
							: await aki.atras();
					embed.setTitle(pregunt.pregunta);
					await msg.edit(embed);
				}

				var personajes = await aki.respuestas();
				var personaje = personajes.get(0);
				embed.setTitle('✅Tu personaje es: ' + personaje.nombre);
				embed.setDescription(personaje.descripcion);
				embed.setImage(personaje.foto);
				embed.fields = [];
				msg.delete();
				message.channel.send(embed);
			} catch (e) {
				message.channel.send(
					`Hubo un error, no se encontró el personaje o retrocediste mucho, intenta otra vez`
				);
			}
		}
	}
};
