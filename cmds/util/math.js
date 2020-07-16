module.exports = {
  config: {
    nombre: "math",
    alias: ["calculator"],
    descripcion: "Haces tus operaciomes matematicas",
    category: "util"
  },
  run: async (client, message, args) => {
    
    
    const math = require("math-expression-evaluator"); // Este NPM es con el que se podrá hacer los calculos
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed().setColor(`64ffc4`);

    if (!args[0]) {
      embed.setDescription("Debes agregar alguna operación");
      return await message.channel.send(embed); // Devuelve un mensaje si es que ejecuta el comando sin nada
    }
    let resultado
    
   
    	try {
      resultado = math.eval(args.join(" ")); // El Args toma el calculo
    } catch (e) {
      resultado = "error: Entrada Invalida"; // Cuando es incorrecta
    }
    embed
      .addField("Operacion:", `\`\`\`js\n${args.join(" ")}\`\`\``, false) // Te da el calculo
      .setTitle("Calculadora - 📳 " )
      .addField("Solucion", `\`\`\`js\n${resultado}\`\`\``, false);
    await message.channel.send(embed);
  } // Finaliza el códig}; // Finaliza el código
  // Cualquier duda, lean la doc de la NPM
};
