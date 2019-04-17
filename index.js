const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config/config.json");
client.commands = new Discord.Collection();

fs.readdir("./src/commands/", (err, files) =>{
	if (err) console.error(err);

	const filejs = files.filter(f => f.split(".").pop() == "js");
	filejs.forEach((f, i) =>{
		let props = require(`./src/commands/${f}`);
		client.commands.set(props.help.name, props);
	});
});


client.on("ready", () =>{
	client.user.setActivity("Prefix => f$");
	console.log("Bot is Online");
});

client.on("guildMemberAdd", member =>{
	let embedWelcome = new Discord.RichEmbed()
	.setTitle(":inbox_tray: Seja muito bem vindo(a) ao server Coffee Lab")
	.setDescription(`O membro ${member} quis se juntar a festa`)
	.setColor("#35f46f")

	member.guild.channels.get("566799613340811294").send(embedWelcome);

	// auto role
	const memberAddRole = member.guild.member(member);
	const role = member.guild.roles.find(`name`, "robô");

	memberAddRole.addRole(role);
});

client.on("guildMemberRemove", member =>{
	let embedGoodbye = new Discord.RichEmbed()
	.setTitle(":outbox_tray: Adeus amigo(a)")
	.setDescription(`O membro ${member.tag}, foi embora para sempre :sob:`)
	.setColor("#ff0000")

	member.guild.channels.get("566799613340811294").send(embedGoodbye);
});

client.on("message", message =>{
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let prefix = config.prefix;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	const commandFile = client.commands.get(command.slice(prefix.length));
	if (commandFile) commandFile.run(client, message, args);
});
client.login(config.token);