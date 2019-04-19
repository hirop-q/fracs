const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	let member = message.guild.member(message.mentions.users.first());
	let reason = args.join(" ").slice(22);

	if (!message.member.hasPermissions("ADMINISTRATOR")) return message.reply("permissão negada!");
	if (member.hasPermissions("ADMINISTRATOR")) return message.reply("não posso expulsa-lo");
	if (!reason) return message.reply("pfvr diga o motivo do kick");

	const embedKick = new Discord.RichEmbed()
	.setTitle("Kick")
	.addField("Usuário", `<@${member.id}>`)
	.addField("Motivo", `${reason}`)
	.addField("Administrador", `<@${message.author.id}>`)
	.setColor("#ff1000")

	message.guild.member(member).kick(reason);
	message.guild.channels.get("566798533919768578").send(embedKick);
}

exports.help = {
	name : "kick"
}