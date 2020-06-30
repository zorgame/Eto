const translate = require("@vitalets/google-translate-api");
const { MessageEmbed }  = require("discord.js");

module.exports = {
  config: {
    nombre: "pokedex",
    alias: ["pokemon"],
    descripcion: "Mira las stats de un pokemon de las generaciones 1 - 7",
    category: "util"
  },
  run: async (client, message, args) => {
    if (!args[0])return message.channel.send(`Intenta poner el nombre o numero del pokemon`);
    let reqs = await require("node-superfetch").get(`https://pokeapi.glitch.me/v1/pokemon/${args.join("%20")}`,{ json: true });
    let poke = reqs.body[0];
    let descripcionp = await translate(poke.description, { to: "es" });

    let tipo = {
      Fighting: "<:pelea:709075435920818266> Lucha",
      Dark: "<:dark:709075566585839643> Oscuro", 
      Fire: "<:fuego:709075390706090037> Fuego",
      Flying: "<:vuelo:709075358544166942> Volador",
      Ghost: " <:fantasma:709075302273515602>  Fantasma",
      Grass: "<:grass:709075207306084403> Planta",
      Ground: "<:Ground:709075157020442794> Tierra",
      Ice: "<:ice:709075134048370698> Hielo",
      Normal: "<:normal:709075109964415048> Normal",
      Poison: "<:posion:709075085352370197> Veneno",
      Psychic: "<:Psquico:709074987759173702> Psíquico",
      Rock: "<:rock:709074962270519339> Roca",
      Steel: "<:steel:709074929458610237> Acero",
      Water: "<:agua:709074904259231765> Agua",
      Bug: "<:bug:709075839400017945> Bicho",
      Dragon: "<:dragon:709075538802638918> Dragon",
      Electric: "<:electrico:709075509056634930> Eléctrico",
      Fairy: "<:fairy:709075468782927943> Hada"
    }, 
    color = {
      Bug: "GREEN",
      Dark: "BLACK",
      Dragon: "RED",
      Electric: "#FFD700",
      Fairy: "#9400D3",
      Fighting: "#FF391E",
      Fire: "ORANGE",
      Flying: "#FF391E",
      Ghost: "#4A518D",
      Grass: "#00FF00",
      Ground: "#8B4513",
      Ice: "#01A9DB",
      Normal: "#696969",
      Poison: "#564471",
      Psychic: "#FE2E2E",
      Rock: "#989899",
      Steel: "SLATE",
      Water: "#00BFFF"
    }, 
    huevo = {
      Bug: "Bicho",
      Ditto: "Ditto",
      Dragon: "Dragon",
      Fairy: "Hada",
      Field: "Campo",
      Flying: "Volador",
      Grass: "Planta",
      "Gender unknown": "Género desconocido",
      "Human-Like": "Similar al humano",
      Mineral: "Mineral",
      Monster: "Monstruo",
      Amorphous: "Amorfo",
      Undiscovered: "No descubierto",
      "Water 1": "Agua I",
      "Water 2": "Agua II",
      "Water 3": "Agua III"
    };
    
    let pokembed = new MessageEmbed() 
    .setTitle(`Información del pokemon || Pokedex`)
    .setDescription(`**General :** ____${poke.name} | #${poke.number} | Generación ${poke.gen}____\n**Descripcion:** ${descripcionp.text}`)
    .addField('Tipo:', Array.isArray(poke.types) ? poke.types.map((tipos) => tipo[tipos]).join('\n'):tipo[poke.types])
    .addField('Especie:', poke.species)
    .setColor(color[Array.isArray(poke.types) ? poke.types[0] : poke.types])
    .addField('Evolución:', `${poke.family.evolutionLine.join(' <a:a6:708899956831813642> ')}\nEvolución actual: \`${poke.family.evolutionStage}\``) 
    .addField('Rareza:', `<a:a6:708899956831813642> Inicial: \`${poke.starter ? 'Si' : 'No'}\`\n<a:a6:708899956831813642> Legendario: \`${poke.legendary ? 'Si' : 'No'}\`\n<a:a6:708899956831813642> Mítico: \`${poke.mythical ? 'Si' : 'No'}\`\n<a:a6:708899956831813642> Ultraente: \`${poke.ultraBeast ? 'Si' : 'No'}\`\n<a:a6:708899956831813642> Mega: \`${poke.mega ? 'Si' : 'No'}\``)
    .addField('Habilidades:', `<a:a6:708899956831813642> Habilidad normal: \`${poke.abilities.normal}\` \n<a:a6:708899956831813642> Habilidad oculta: \`${poke.abilities.hidden.length <= 0 ? 'Ninguna' : poke.abilities.hidden.join(', ')}\``)
    .addField('Grupos / Huevos:', Array.isArray(poke.eggGroups) ? poke.eggGroups.map((huevos) => huevo[huevos]).join('\n') : huevo[poke.eggGroups])
    .addField('Altura / peso:', `\`${poke.height}\`/\`${poke.weight}\``)
    .setThumbnail(poke.sprite)
    let msg = await message.channel.send("<a:a2:708873679269920797> Buscando pokemon") 
    setTimeout(() => { msg.edit("**\n**" ,pokembed) }, 2500)

    
    
  }
};
