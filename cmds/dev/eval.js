module.exports = {
  config: {
    nombre: "eval",
    alias: ["e"],
    descripcion: "",
    category : "dev" 
  },
  run: async (client, message, args) => {
    if (!["493063208576483329"].includes(message.author.id))
      return message.channel.send("Disculpa tu no puedes usar este comando") 

    let limit = 1950;
    try {
      let code = args.join(" ");
      let evalued = eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
        message.channel.send(`\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
      } else message.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
  }
};
