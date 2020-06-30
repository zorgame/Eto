module.exports = {
  config: {
    nombre: "bigtexto",
    alias: ["bt"],
    descripcion: "Agranda el mensaje que quieras",
    category: "util"
  },
  run: async (client, message, args) => {
    const mapping = {
      " ": "   ",
      "0": ":zero:",
      "1": ":one:",
      "2": ":two:",
      "3": ":three:",
      "4": ":four:",
      "5": ":five:",
      "6": ":six:",
      "7": ":seven:",
      "8": ":eight:",
      "9": ":nine:",
      "!": ":grey_exclamation:",
      "?": ":grey_question:",
      "#": ":hash:",
      "*": ":asterisk:",
      á: ":regional_indicator_a:",
      é: ":regional_indicator_e:",
      í: ":regional_indicator_i:",
      ó: ":regional_indicator_o:",
      ú: ":regional_indicator_u:"
    };
    "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
      mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
    });
    if (!args[0]) message.channel.send("escribe un texto para agrandar");
    else if (args.length > 80)
      message.channel.send("el texto no puede exceder los 80 carácters");
    message.channel.send(
      args
        .join(" ")
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    );
  }
};
