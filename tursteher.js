
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '-';

client.once('ready', () => {
    console.log('Bot ist online!');
    client.user.setActivity('Discord', { type: 'WATCHING' });

});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'lgbt'){
        message.channel.send('is good!!');

        
    }
    
    if(command === 'creator'){
        message.channel.send('pa$ha#0001');
    }
   

    if(command === 'help'){
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0084')
            .setAuthor('This is the Help Page')
            .setTitle('Commands')
            .setFooter('made by pa$ha')
            .addFields(
                { name: '-creator', value: 'Shows the creator of the Bot.' },
                { name: '-avatar', value: 'Shows your or someone elses avatar.' },
                { name: '-kick', value: 'Kicks a member (Staff Only)' },
                { name: '-clear (1-10)', value: 'Clears a chat (Staff Only)' }        

            );
                return message.channel.send(embed);
        }

        client.on('avatar', message => {
            if (message.content === 'whats my avatar') {
              message.reply(message.author.avatar());
            }
          });
    

    if(command === 'regelwerk'){
        const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setAuthor('Bei nicht befolgen der Regeln, ist ein Auschluss möglich.')
            .setTitle('Regelwerk')
            .setFooter('made by pa$ha')
            .addFields(
                { name: '§1: Spam', value: 'Spamming jeglicher Form ist in sämtlichen Textchannels verboten.' },
                { name: '§2: Earrape', value: 'Earrape, d.h. bewusst laute Geräusche zu machen oder abzuspielen, ist in sämtlichen Voicechannels verboten.' },
                { name: '§3: IP-Logger und Viren', value: 'Das Verwenden von IP-Loggern und Viren ist verboten.' },
                { name: '§4: Werbung', value: 'Werbung für andere Discord-Server ist in allen Text- und Voicechannels, sowie auch über PN, verboten.' },
                { name: '§5: Tierquälerei und Blutinhalte', value: 'Das Verbreiten von Videos und Bildern, welche Tierquälerei und Blutinhalte zeigen, ist verboten.' },
                { name: '§6: Kinderpornographie', value: 'Das Verbreiten von Pornographie Minderjähriger ist verboten.'},
                { name: '§7: Rechtsextremismus', value: 'Rechtsextremistische Inhalte werden nicht geduldet.' },
                { name: '§8: Leaks', value: 'Es dürfen weder Bilder einer Person, noch die Adresse oder andere private Daten, ohne ihre Einverständnis, geleakt werden. Dies ist auch per PN verboten.' },
                { name: '§9: Drohung und Erpressung', value: 'Das Drohen und Erpressen von Usern, beispielsweise mit einem Leak, ist verboten.' },
                { name: '§10: Beleidigungen', value: 'Das Beleidigen von Usern ist verboten.' },
                { name: '§11: Aufnehmen', value: 'Das Aufnehmen von Usern in Voicechannels ist verboten.' },
                { name: '§12: Bots und Raids', value: 'Das Verwenden von Bot-Accounts und Durchführen von Raids ist verboten.' },
                { name: '§13: Hierachie', value: 'Anweisungen der Teammitglieder sind ohne Widerspruch Folge zu leisten.' }          

            );
                return message.channel.send(embed);
        }


    if(command === 'avatar'){
            let User = message.mentions.users.first();
            if(!User){
            const embed = new Discord.MessageEmbed()
            .setTitle(message.author.username) 
            .setImage(message.author.displayAvatarURL())
        
            return message.channel.send(embed);
            }
            
            else {
            let avatar = User.avatarURL();
            const embed = new Discord.MessageEmbed()
            .setTitle(User.username)
            .setImage(avatar)
            return message.channel.send(embed);
            }
        }
    
    if(command === 'agree'){
        message.react('👍');
    }

    if(command === 'disagree'){
        message.react('👎');
    }

    if(command === 'kick'){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You cant bro');
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I cant bro');

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('pls tag user bro');
        if(!Member) return message.channel.send('he is not here bro');
        if(!Member.kickable) return message.channel.send('he is too op bro');

        if(Member.id === message.author.id) return message.channel.send('bruh thats you bro');

        let reason = args.slice(1).join(" ");

        Member.kick(reason)
        
        const kickembed = new Discord.MessageEmbed()
        .setTitle('Member kicked')
        .setThumbnail(Member.user.displayAvatarURL())
        .addField('kicked by', message.author)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()

        message.react('👍');
        message.channel.send(kickembed);
    }

    if(command === 'ban'){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You cant bro');
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I cant bro');

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('pls tag user bro');
        if(!Member) return message.channel.send('he is not here bro');
        if(!Member.bannable) return message.channel.send('he is too op bro');

        if(Member.id === message.author.id) return message.channel.send('bruh thats you bro');

        let reason = args.slice(1).join(" ");

        Member.ban(reason)
        
        const banembed = new Discord.MessageEmbed()
        .setTitle('Member banned')
        .setThumbnail(Member.user.displayAvatarURL())
        .addField('banned by ', message.author)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()

        message.react('👍');
        message.channel.send(banembed);
    }
    
    if(command === 'clear'){
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you cant bro");
            
            let deleteAmout;
            if (parseInt(args[0]) > 500) {
                deleteAmout = 500;
            }

            else {
                deleteAmout = parseInt(args[0])

            }
            message.channel.bulkDelete(deleteAmout, true);

            message.channel.send(`i deleted ${deleteAmout} messages yes`).then(m => m.delete({timeout: 5000}))
        


        }

});


// immer an letzter Stelle der Command!!!

client.login('Nein');
