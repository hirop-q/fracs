const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("permissão negada!");
	if (!args[0]) return message.reply("diga quantas mensagens devo deletar");
	try{
		message.channel.bulkDelete(args[0]).then(() =>{
			const embedClear = new Discord.RichEmbed()
			.setTitle("Clear")
			.setDescription(`Foram deletadas ${args[0]} mensagens`)
			.setFooter(`Comando usa pelo adm ${message.author.tag}`)
			.setColor("#09ff7d")

			message.channel.send(embedClear).then(msg => msg.delete(5000));
		});
	} catch(err){
		message.reply(`Não consegui deletar as mensagens. ERROR_MESSAGE: ${err}`);
	}
}

exports.help = {
	name : "clear"
}