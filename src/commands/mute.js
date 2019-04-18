// Comando mute versão 1.0

const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	let member = message.guild.member(message.mentions.users.first()); // mensione o membro
	let reason = args.join(" ").slice(22); // diga o motivo

	if (!member) return message.reply("pfvr diga qual membro devo mutar");
	if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("permissão negada!");
	if (member.hasPermissions("MANAGE_MESSAGES")) return message.reply("não posso muta-lo");
	if (!reason) return message.reply("pfvr diga o motivo do mute");
	
	const muteRole = message.guild.roles.find(`name`, "muted"); // pegando o cargo muted do server

	const embedMute = new Discord.RichEmbed() // criando o embed
	.setTitle("Mute")
	.addField("Usuário", `<@${member.id}>`)
	.addField("Motivo", `${reason}`)
	.addField("Administrador", `<@${message.author.id}>`)
	.setColor("#09ff7d")
	
	member.addRole(muteRole);
	message.guild.channels.get("566798533919768578").send(embedMute); // mandando mensagem para o chat "modlog"
}

exports.help = {
	name : "mute"
}