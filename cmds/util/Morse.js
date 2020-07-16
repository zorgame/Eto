module.exports = {
  config: {
    nombre: "morse",
    alias: "",
    descripcion: "Traduce tu texto a morse",
    category : "util" 
  },

  run: async (client, message, args) => {
  	
  	if(!args[0]) return message.channel.send("¿  Y el texto ?")
  	
let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
			morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
			text = args.slice(1).join(" ").toUpperCase();
		//Remplazar estos carácteres si es que se incluyen.
		while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
			text = text.replace("Ä", "AE").replace("Ö", "OE").replace("Ü", "UE");
		}
		//Se creería: Si empieza por . o por - es morse, caso contrario es texto normal
		if (text.startsWith(".") || text.startsWith("-")) {
			//Separar el texto morse en array
			text = text.split(" ");
			//Longitud
			let length = text.length;
			//Convertir a texto normal usando un loop
			for (let i = 0; i < length; i++) {
				text[i] = alpha[morse.indexOf(text[i])];
			}
			//Volver a unir
			text = text.join("");
		} else {
			//Lo mismo. Separar
			text = text.split("");
			let length = text.length;
			//Convertir a morse
			for (let i = 0; i < length; i++) {
				text[i] = morse[alpha.indexOf(text[i])];
			}
			text = text.join(" ");
		}
		//Enviar el texto.
		message.channel.send("```" + text + "```");
  }
};
