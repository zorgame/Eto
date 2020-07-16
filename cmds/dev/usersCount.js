module.exports = {
  config: {
    nombre: "usersCount",
    alias: ["lista-usuarios"],
    descripcion: "Haces una lista de los usuarios",
    category : "dev" 
  },

  run: async (client, message, args) => {
try { 
	if(!"493063208576483329".includes(message.author.id)) return

      let usuarios = client.users.cache.map(x => x.username)
      //Primero hacemos una lista (mapeo de los usuarios)
			let pagina = []
			//Creamos un objeto vacio para poder usar la funcion push
        let cantidad = 20
				//Esta es la cantidad de usuarios que habran por pagina (es configurable)
        while (usuarios.length > 0) {
            pagina.push(usuarios.splice(0, cantidad).join("\n- "));
        }
				/*
				while te permite seguir ejecutando un bloque mientras su funcion
				evaluada sea true
				
				Usamos el objeto vacio para pushear 20 usuarios ahi adentro, llamada pagina y a parte
				de eso usamos splice

				El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos


				Como podemos notar paginas en este momento se vuelve un array
				*/
       let { MessageEmbed } = require("discord.js")
       let embed = new MessageEmbed()
           .setTitle("Lista")
					 .setDescription("- "+ pagina[args.join(" ") ? parseInt(args.join(" ")) - 1 : 0])
					 .setColor("ff0066")
					 .setFooter(`Pagina ${args[0]} de ${pagina.length}`)
					 message.channel.send(embed)

					 /*
					 Listo creamos un embed con el array de paginas y el numero de paginas
					 */


} catch (err) {
message.channel.send(err) 
  } 
 }
};