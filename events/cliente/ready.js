const automaticping = require('glitch-automaticping');

module.exports = async client => {
	console.log(
		`Hey, ${client.user.username}, estoy en ${
			client.guilds.cache.size
		} servidores`
	);
	

	setInterval(() => {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: client.ws.ping + ' ping',
				type: 'PLAYING'
			}
		});
	}, 5000);
};
