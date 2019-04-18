const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	let sugestao = args.join(" "); // pegando sua sugestão

	if (!sugestao) return message.reply("não posso continuar sem sua sugestão");

	const embedSugestao = new Discord.RichEmbed() // cirando o embed
	.addField("Usuário", `<@${message.author.id}>`)
	.addField("Sugestão", `${sugestao}`)
	.setFooter("Pfvr não marcar os dos emojis")
	.setColor("#09ff7d")
	try{
		message.guild.channels.get("567401105823105029").send(embedSugestao).then(embed => {
			embed.react("👌");  // adicionando uma reação ao embed
			embed.react("👎"); // adicionando uma reação ao embed
		});
		message.delete(sugestao);
	} catch(err){
		message.reply(`não consegui mandar sua sugestão. ERROR_MESSAGE: ${err}`);
	}
}

exports.help = {
	name : "sugestao"
}