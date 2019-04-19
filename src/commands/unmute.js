const Discord = require("discord.js");

exports.run = (bot, message, args) => {
	let member = message.guild.member(message.mentions.users.first());
	const muteRole = message.guild.roles.find(`name`, "muted");

	if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("permissão negada!");

	member.removeRole(muteRole);
}

exports.help = {
	name : "unmute"
}