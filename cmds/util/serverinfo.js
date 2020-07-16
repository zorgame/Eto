const db = require("megadb")
const prefixes = new db.crearDB("prefixes")

module.exports = {
  config: {
    nombre: "serverinfo",
    alias: ["s-i"],
    descripcion: "Mira las stats del server en el que estas",
    category : "util", 
  },

  run: async (client, message, args) => {
    
    const {MessageEmbed} = require("discord.js")
		let prefix = await prefixes.obtener(message.guild.id)
		let nombre = message.guild.name
		let idServer = message.guild.id
		let idOwner = message.guild.ownerID
		let tagOwner = message.guild.owner.user.tag
		let roles = message.guild.roles.cache.size
		let emojis  = message.guild.emojis.cache.size
		let canales = message.guild.channels.cache.size
		let creacion =  message.guild.createdAt.toLocaleString()
		let afkChannel = message.guild.afkChannel
		let afkTimeout = message.guild.afkTimeout / 60
		let miembros = message.guild.memberCount
		let bots = message.guild.members.cache.filter(m => m.user.bot).size
		let verify = message.guild.verificationLevel
		let region = { 
			  "brazil": ":flag_br: Brazil", 
				"eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    }[message.guild.region]

		if(!args[0]){
			let embed = new MessageEmbed()
			.setTitle(`Estadisticas de ${nombre}`)
			.addField("Owner", `**• Owner:** ${tagOwner}\n**• ID Owner:** ${idOwner}`)
			.addField("Servidor", `**• Roles:** ${message.guild.roles.cache.size}\n**• Emojis:** ${message.guild.emojis.cache.size}\n**• Canales:** ${message.guild.channels.cache.size}\n**• Nombre:** ${nombre}\n**• ID:** ${idServer}`)
			.addField("Miembros", `• <a:online:728611791612936252> Online: ${message.guild.members.cache.filter(m => m.presence.status == 'online').size}\n• <a:ocupado:728611825528340482> Ocupados: ${message.guild.members.cache.filter(m => m.presence.status == 'dnd').size}\n• <a:offline:728611856608002108> Offline: ${message.guild.members.cache.filter(m => m.presence.status == 'offline').size}\n• <a:disponible:728611886005878804> Disponibles: ${message.guild.members.cache.filter(m => m.presence.status == 'idle').size}\n• <a:streaming:728611916720635974> Streaming: ${message.guild.members.cache.filter(m => m.presence.status == 'streaming').size}\n•  :robot: Bots: ${bots} | :man_standing: Miembros: ${message.guild.members.cache.filter(member => !member.user.bot).size} | :pushpin: Total: ${message.guild.memberCount}`)
			.addField("Contenido", `• AfkTimeout: ${afkTimeout}\n• Region: ${region}\n• Verificacion: ${verify}\n• AfkChannel: ${afkChannel ? afkChannel : "No hay"}\n• Creacion: ${creacion}`)
			.addField("Estructura", `\`\`\`lx\n• --emojis\n• --canales\n• --roles\nEj: ${prefix ? prefix : "ey"}serverinfo --emojis\`\`\``)
			.addField("Icon", `[Avatar del server](${message.guild.iconURL()})`)
			.setImage(message.guild.iconURL({format: "png", size: 2048}))
			.setColor("BLUE")
			message.channel.send(embed)
			

		} else if(args[0]){
			if(args[0] === "--emojis"){
				let emoji = message.guild.emojis.cache.map(x => `${x}`).sort((a,b) => b.animated - a).join(" ")
				let emojiN = message.guild.emojis.cache.filter(m => !m.animated).map(x => `${x}`).sort((a,b) => a.length - b.length).join(" ")
				let emojiA = message.guild.emojis.cache.filter(m => m.animated).map(x => `${x}`).sort((a,b) => a.length - b.length).join(" ")
				let kk = new MessageEmbed()
				.setTitle(`Emojis de ${nombre}`)
				.setDescription(`**Todos**\n${emoji}`)
				.addField("Normales:", emojiN, true)
				.addField("Animados", emojiA, true)
				.setThumbnail(message.guild.iconURL())
				.setColor("BLUE")
				message.channel.send(kk)

			}else if(args[0] === "--canales"){

				const lepush = (q, c) => {
      if (c.type == "text") q.push(`#️⃣ ${c.name}`);
      else if (c.type == "voice") q.push(`🔊 ${c.name}`);
      else if (c.type == "news") q.push(`📣 ${c.name}`);
      else if (c.type == "store") q.push(`🏷️ ${c.name}`);
      else if (c.type == "category") q.push(`> ${c.name}`);
      else q.push(`#️⃣ ${c.name}`);
    };

    let categorias = message.guild.channels.cache
		.filter(q => q.type == "category")
      .sort((p, c) => p.position - c.position);
    let canales = [];
    message.guild.channels.cache
      .filter(q => q.type != "category")
      .filter(q => !q.parentID)
      .sort((p, c) => p.position - c.position)
      .forEach(c => lepush(canales, c));
    categorias.forEach(c => {
      lepush(canales, c);
      message.guild.channels.cache
        .filter(q => q.parentID == c.id)
        .sort((p, c) => p.position - c.position)
        .forEach(c => lepush(canales, c));
    });

				let nuevoE = new MessageEmbed()
				.setTitle("Lista de canales")
				.setDescription(canales.join("\n"))
				.setColor("BLUE")
				message.channel.send(nuevoE)

			}else if(args[0] === "--roles"){
				
				let bbb =  message.guild.roles.cache.map(x => `• ${x}`).slice(1).join("\n")
				let kklo = new MessageEmbed()
				.setTitle("Lista de roles")
				.setColor("BLUE")
				.setDescription(bbb)
				message.channel.send(kklo)

			}
		}
	}
};