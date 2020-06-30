const Discord = require("discord.js");
module.exports = {
  config: {
    nombre: "reverse",
    alias: ["invertir"] ,
    descripcion: "Dale vuelta a tus textos",
    category: "util"
  },
  run: async (client, message, args) => {
    const reverse = args
      .join(" ")
      .split("")
      .reverse()
      .join(""); //Damos vuelta los args (argumentos)
    if (!reverse) return message.channel.send("Coloca un texto para invertir por favor."); //Si no hay texto

    message.channel.send(
      `>>> **Texto a invertir** : \n ` +
        "```" +
        `${args.join(" ")} ` +
        "```" +
        ` \n **Texto invertido** :\n ` +
        "```" +
        ` ${reverse}` +
        "```"
    );
  }
};
