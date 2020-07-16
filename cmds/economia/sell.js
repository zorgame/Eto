const { MessageEmbed } = require('discord.js');
const db = require('megadb');
const prefix = new db.crearDB('prefixes');
const dinero = new db.crearDB('dinero');
const gemas = new db.crearDB('gemas');

module.exports = {
  config: {
    nombre: "sell",
    alias: ["vender"],
    descripcion: "Vende tus gemas o recolectalaspara comprar mas cosas en la tienda",
    category : "economia" 
  },

  run: async (client, message, args) => {
try {

let gemaE1 = '<:gema1:728989095048773683>';
let gemaE2 = '<:gema2:728989072319840326>';
let gemaE3 = '<:gema3:728989044800880734>';
let gemaE4 = '<:gema4:728989019534393355>';
let gemaE5 = '<:gema5:728988995266150440>';
let gemaE6 = '<:gema6:728988967458046052>';
let moneda = "<a:a7:715787660207325245>";

if (!gemas.tiene(message.author.id)) {
gemas.establecer(`${message.author.id}.uno`, 0);
gemas.establecer(`${message.author.id}.dos`, 0);
gemas.establecer(`${message.author.id}.tres`, 0);
gemas.establecer(`${message.author.id}.cuatro`, 0);
gemas.establecer(`${message.author.id}.cinco`, 0);
gemas.establecer(`${message.author.id}.seis`, 0);
}

if(!dinero.tiene(message.author.id)){
	dinero.establecer(message.author.id, 0)
}

let p = await prefix.obtener(message.guild.id)

let {uno, dos, tres, cuatro, cinco, seis } = await gemas.obtener(message.author.id)

if(!args[0]){

	let sinArgs = new MessageEmbed()
	.setDescription("Aca puedes vender todas tus gemas")
	.setTitle("Tienda de vendedor")
	.addField("Precio de las gemas", `Tier 6: ${gemaE6}x1\nTier 5: ${gemaE5}x2\nTier 4: ${gemaE4}x4\nTier 3: ${gemaE3}x8\nTier 2: ${gemaE2}x16\nTier 1: ${gemaE1}x32`)
	.addField("Como vender?", `\`\`\`${p}sell 1\n${p}sell all\n${p}sell 1 100\n${p}sell 2 150\`\`\``)
  .setColor("0dff00")
	message.channel.send(sinArgs)

} else if(args[0] === "1"){
if(!args[1]){
	if(uno <= 0){
		let noTieneGemasUno = new MessageEmbed()
		.setColor("ff0000")
		.setTitle("Sin Gemas")
		.setDescription("No tienes gemas de tier 1")
		message.channel.send(noTieneGemasUno)
	} else if(uno > 0){
		let Muno = uno * 32
		dinero.sumar(message.author.id, Muno)
		gemas.establecer(`${message.author.id}.uno`, 0)
		let vendioGemasUno = new MessageEmbed()
		.setColor("0dff00")
		.setTitle("Nueva Venta")
		.setDescription(`Vendiste ${gemaE1} ${uno} por el precio de ${moneda} ${Muno}`)
		message.channel.send(vendioGemasUno)
	}
} else if(args[1]){
	let gemaUnoPorVender = args[1]
	let porVenderM = gemaUnoPorVender * 32
	if(gemaUnoPorVender > uno){
		let gemaUnoMayor = new MessageEmbed()
		.setTitle("Valor muy alto")
		.setDescription("No tienes toda esa cantidad")
		.setColor("ff0000")
		message.channel.send(gemaUnoMayor)	
	} else if(gemaUnoPorVender <= uno){
		dinero.sumar(message.author.id, porVenderM)
		gemas.restar(`${message.author.id}.uno`, gemaUnoPorVender)
   let gemaUnoSiVender = new MessageEmbed()
		.setTitle("Vendido")
		.setDescription(`Acabas de vender ${gemaE1} ${gemaUnoPorVender} por ${moneda} ${porVenderM}`)
		.setColor("0dff00")
		message.channel.send(gemaUnoSiVender)
	}
}
} else if(args[0] === "2"){
	if(!args[1]){ 
	if(dos <= 0){
		let noTieneGemasDos = new MessageEmbed()
		.setColor("ff0000")
		.setTitle("Sin Gemas")
		.setDescription("No tienes gemas de tier 2")
		message.channel.send(noTieneGemasDos)
	 } else if(dos > 0){
		let Mdos = dos * 16
		dinero.sumar(message.author.id, Mdos)
		gemas.establecer(`${message.author.id}.dos`, 0)
		let vendioGemasDos = new MessageEmbed()
		.setColor("0dff00")
		.setTitle("Nueva Venta")
		.setDescription(`Vendiste ${gemaE2} ${dos} por el precio de ${moneda} ${Mdos}`)
		message.channel.send(vendioGemasDos)
	 }
	} else if(args[1]){
	let gemaDosPorVender = args[1]
	let porVenderMD = gemaDosPorVender * 16
	if(gemaDosPorVender > dos){
		let gemaDosMayor = new MessageEmbed()
		.setTitle("Valor muy alto")
		.setDescription("No tienes toda esa cantidad")
		.setColor("ff0000")
		message.channel.send(gemaDosMayor)	
	} else if(gemaDosPorVender <= dos){
		dinero.sumar(message.author.id, porVenderMD)
		gemas.restar(`${message.author.id}.dos`, gemaDosPorVender)
   let gemaDosSiVender = new MessageEmbed()
		.setTitle("Vendido")
		.setDescription(`Acabas de vender ${gemaE2} ${gemaDosPorVender} por ${moneda} ${porVenderMD}`)
		.setColor("0dff00")
		message.channel.send(gemaDosSiVender)
	}
}

} else if(args[0] === "3"){

	if(!args[1]){ 
	if(tres <= 0){
		let noTieneGemasTres = new MessageEmbed()
		.setColor("ff0000")
		.setTitle("Sin Gemas")
		.setDescription("No tienes gemas de tier 3")
		message.channel.send(noTieneGemasTres)
	 } else if(tres > 0){
		let Mtres = tres * 8
		dinero.sumar(message.author.id, Mtres)
		gemas.establecer(`${message.author.id}.tres`, 0)
		let vendioGemasTres = new MessageEmbed()
		.setColor("0dff00")
		.setTitle("Nueva Venta")
		.setDescription(`Vendiste ${gemaE3} ${tres} por el precio de ${moneda} ${Mtres}`)
		message.channel.send(vendioGemasTres)
	 }
	} else if(args[1]){
	let gemaTresPorVender = args[1]
	let porVenderMT = gemaTresPorVender * 8
	if(gemaTresPorVender > tres){
		let gemaTresMayor = new MessageEmbed()
		.setTitle("Valor muy alto")
		.setDescription("No tienes toda esa cantidad")
		.setColor("ff0000")
		message.channel.send(gemaTresMayor)	
	} else if(gemaTresPorVender <= tres){
		dinero.sumar(message.author.id, porVenderMT)
		gemas.restar(`${message.author.id}.tres`, gemaTresPorVender)
   let gemaTresSiVender = new MessageEmbed()
		.setTitle("Vendido")
		.setDescription(`Acabas de vender ${gemaE3} ${gemaTresPorVender} por ${moneda} ${porVenderMT}`)
		.setColor("0dff00")
		message.channel.send(gemaTresSiVender)
	}
}
	
} else if(args[0] === "4"){
	if(!args[1]){ 
	if(cuatro <= 0){
		let noTieneGemasCuatro = new MessageEmbed()
		.setColor("ff0000")
		.setTitle("Sin Gemas")
		.setDescription("No tienes gemas de tier 4")
		message.channel.send(noTieneGemasCuatro)
	 } else if(cuatro > 0){
		let Mcuatro = cuatro * 4
		dinero.sumar(message.author.id, Mcuatro)
		gemas.establecer(`${message.author.id}.cuatro`, 0)
		let vendioGemasCuatro = new MessageEmbed()
		.setColor("0dff00")
		.setTitle("Nueva Venta")
		.setDescription(`Vendiste ${gemaE4} ${cuatro} por el precio de ${moneda} ${Mcuatro}`)
		message.channel.send(vendioGemasCuatro)
	 }
	} else if(args[1]){
	let gemaCuatroPorVender = args[1]
	let porVenderMC = gemaCuatroPorVender * 4
	if(gemaCuatroPorVender > cuatro){
		let gemaCuatroMayor = new MessageEmbed()
		.setTitle("Valor muy alto")
		.setDescription("No tienes toda esa cantidad")
		.setColor("ff0000")
		message.channel.send(gemaCuatroMayor)	
	} else if(gemaCuatroPorVender <= cuatro){
		dinero.sumar(message.author.id, porVenderMC)
		gemas.restar(`${message.author.id}.cuatro`, gemaCuatroPorVender)
   let gemaCuatroSiVender = new MessageEmbed()
		.setTitle("Vendido")
		.setDescription(`Acabas de vender ${gemaE4} ${gemaCuatroPorVender} por ${moneda} ${porVenderMC}`)
		.setColor("0dff00")
		message.channel.send(gemaCuatroSiVender)
	}
}
	
} else if(args[0] === "5"){
	
	if(!args[1]){ 
	if(cinco <= 0){
		let noTieneGemasCinco = new MessageEmbed()
		.setColor("ff0000")
		.setTitle("Sin Gemas")
		.setDescription("No tienes gemas de tier 5")
		message.channel.send(noTieneGemasCinco)
	 } else if(cinco > 0){
		let Mcinco = cinco * 2
		dinero.sumar(message.author.id, Mcinco)
		gemas.establecer(`${message.author.id}.cinco`, 0)
		let vendioGemasCinco = new MessageEmbed()
		.setColor("0dff00")
		.setTitle("Nueva Venta")
		.setDescription(`Vendiste ${gemaE5} ${cinco} por el precio de ${moneda} ${Mcinco}`)
		message.channel.send(vendioGemasCinco)
	 }
	} else if(args[1]){
	let gemaCincoPorVender = args[1]
	let porVenderMC = gemaCincoPorVender * 2
	if(gemaCincoPorVender > cinco){
		let gemaCincoMayor = new MessageEmbed()
		.setTitle("Valor muy alto")
		.setDescription("No tienes toda esa cantidad")
		.setColor("ff0000")
		message.channel.send(gemaCincoMayor)	
	} else if(gemaCincoPorVender <= cinco){
		dinero.sumar(message.author.id, porVenderMC)
		gemas.restar(`${message.author.id}.cinco`, gemaCincoPorVender)
   let gemaCincoSiVender = new MessageEmbed()
		.setTitle("Vendido")
		.setDescription(`Acabas de vender ${gemaE5} ${gemaCincoPorVender} por ${moneda} ${porVenderMC}`)
		.setColor("0dff00")
		message.channel.send(gemaCincoSiVender)
	}
}

} else if(args[0] === "6"){

	if(!args[1]){ 
	if(seis <= 0){
		let noTieneGemasSeis = new MessageEmbed()
		.setColor("ff0000")
		.setTitle("Sin Gemas")
		.setDescription("No tienes gemas de tier 6")
		message.channel.send(noTieneGemasSeis)
	 } else if(seis > 0){
		let Mseis = seis * 1
		dinero.sumar(message.author.id, Mseis)
		gemas.establecer(`${message.author.id}.seis`, 0)
		let vendioGemasSeis = new MessageEmbed()
		.setColor("0dff00")
		.setTitle("Nueva Venta")
		.setDescription(`Vendiste ${gemaE6} ${seis} por el precio de ${moneda} ${Mseis}`)
		message.channel.send(vendioGemasSeis)
	 }
	} else if(args[1]){
	let gemaSeisPorVender = args[1]
	let porVenderMS = gemaSeisPorVender * 1
	if(gemaSeisPorVender > seis){
		let gemaSeisMayor = new MessageEmbed()
		.setTitle("Valor muy alto")
		.setDescription("No tienes toda esa cantidad")
		.setColor("ff0000")
		message.channel.send(gemaSeisMayor)	
	} else if(gemaSeisPorVender <= seis){
		dinero.sumar(message.author.id, porVenderMS)
		gemas.restar(`${message.author.id}.seis`, gemaSeisPorVender)
   let gemaSeisSiVender = new MessageEmbed()
		.setTitle("Vendido")
		.setDescription(`Acabas de vender ${gemaE6} ${gemaSeisPorVender} por ${moneda} ${porVenderMS}`)
		.setColor("0dff00")
		message.channel.send(gemaSeisSiVender)
	}
}
	
} else if(args[0] === "all"){

	let unoM = uno * 32
	let dosM = dos * 16
	let tresM = tres * 8
	let cuatroM = cuatro * 4
	let cincoM = cinco * 2
	let seisM = seis * 1
	let choco =  unoM + dosM + tresM + cuatroM + cincoM + seisM 

	let todoPorfin = new MessageEmbed()	
	.addField("Tus Gemas", `${gemaE1} ${uno} ${gemaE3} ${dos}\n${gemaE3} ${tres} ${gemaE4} ${cuatro}\n${gemaE5} ${cinco} ${gemaE6} ${seis}`)
  .addField("Precios de las gemas", `${gemaE1} ${unoM}    ${gemaE2} ${dosM}\n${gemaE3} ${tresM}    ${gemaE4} ${cuatroM}\n${gemaE5} ${cincoM}    ${gemaE6} ${seisM}`)
  .addField("Total", `Tus ganancias: ${moneda} ${choco}`)
	.setColor("64ffc4")
	.setAuthor(message.author.username, message.author.displayAvatarURL())
	message.channel.send(todoPorfin)

gemas.establecer(`${message.author.id}.uno`, 0);
gemas.establecer(`${message.author.id}.dos`, 0);
gemas.establecer(`${message.author.id}.tres`, 0);
gemas.establecer(`${message.author.id}.cuatro`, 0);
gemas.establecer(`${message.author.id}.cinco`, 0);
gemas.establecer(`${message.author.id}.seis`, 0);
dinero.sumar(message.author.id, choco)

 }
} catch (err) {
message.channel.send(`Error: \`\`\`${err}\`\`\``) 
  } 
 } 
} 

