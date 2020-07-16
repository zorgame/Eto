const imdb = require("imdb-api");
const translate = require("@vitalets/google-translate-api");
const Discord = require("discord.js");

module.exports = {
  config: {
    nombre: "info-serie",
    alias: ["pelicula", "serie", "info-pelicula"],
    descripcion:
      "Este comando te muestra la información de una película o serie",
    category: "util"
  },
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    const imob = new imdb.Client({ apiKey: "be8273a1" });
    let movie = await imob.get({ name: args.join(" ") });
    let traducido = await translate(movie.plot, { to: "es" });
  
    embed
      .setAuthor(movie.title)
      .setColor("RANDOM")
      .setThumbnail(movie.poster)
      .setDescription(`${traducido.text}`)
      .addField("Clasificación", movie.rating)    
      .addField("País", movie.country)
      .addField("Tipo", movie.type)
      .addField("Lenguajes", movie.languages);
    message.channel.send(embed)
  } 
};
