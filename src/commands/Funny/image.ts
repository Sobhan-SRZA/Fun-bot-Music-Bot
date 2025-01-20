import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, Message, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import CommandType from "../../types/command";
import error from "../../utils/error";
import getAuthor from "../../utils/getAuthor";
import GenerateKissImage from "../../classes/GenerateKissImage";
import responseError from "../../utils/responseError";
import response from "../../utils/response";
import EmbedData from "../../storage/embed";
import HexToNumber from "../../functions/HexToNumber";
import getLinkResponse from "../../functions/getLinkResponse";

const command: CommandType = {
  data: {
    name: "image",
    description: "ارسال عکس های انیمه ای و ساخت عکس های بامزه.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
    ]),
    default_bot_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks
    ]),
    dm_permission: true,
    nsfw: false,
    options: [
      {
        name: "kiss",
        description: "ساخت عکس بوسیدن یوزر.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "یک یوزر انتخاب کنید.",
            type: ApplicationCommandOptionType.User,
            required: true
          },
          {
            name: "type",
            description: "کدوم نوع سبک تصویر رو میخوای؟",
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "Gay",
                value: "gay"
              },
              {
                name: "Lesbian",
                value: "lesbian"
              }
            ],
            required: true
          },
          {
            name: "ephemeral",
            description: "آیا می‌خواهید این پیام مخفی بماند؟",
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "بله",
                value: "true"
              },
              {
                name: "خیر",
                value: "false"
              }
            ],
            required: false
          }
        ]
      },
      {
        name: "anime",
        description: "Use anime methods by api.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "Who do you want to use?",
            type: ApplicationCommandOptionType.User,
            required: true
          },
          {
            name: "type",
            description: "What type of anime method you want?",
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "Slap",
                value: "slap"
              },
              {
                name: "Hug",
                value: "hug"
              },
              {
                name: "Kiss",
                value: "kiss"
              },
              {
                name: "Pat",
                value: "pat"
              },
              {
                name: "Feed",
                value: "feed"
              }
            ],
            required: true
          },
          {
            name: "ephemeral",
            description: "آیا می‌خواهید این پیام مخفی بماند؟",
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: "بله",
                value: "true"
              },
              {
                name: "خیر",
                value: "false"
              }
            ],
            required: false
          }
        ]
      }
    ]
  },
  category: "member",
  aliases: ["h", "commands"],
  cooldown: 10,
  only_owner: false,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {
      const
        user = getAuthor(interaction)!,
        Subcommand = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getSubcommand() : args![0];

      switch (Subcommand) {
        case "kiss": {
          const
            member = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getMember("user") : interaction instanceof Message && interaction.mentions.members?.first() || interaction.guild?.members.cache.get(args![1]),
            type = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getString("type") : args![2],
            types = ["gay", "lesbian"];

          if (!member)
            return await responseError(interaction, "لطفا یوزر را وارد کنید.");

          if (!type || !types.includes(type.toLowerCase()))
            return await responseError(interaction, `فقط میتوانید دو نوع را انتخاب کنید:\n [ ${types.join(" | ")} ]`);

          switch (type) {
            case "gay": {
              const image = await new GenerateKissImage(
                user.displayAvatarURL({ extension: "png", forceStatic: true }),
                member.displayAvatarURL({ extension: "png", forceStatic: true }),
                true
              ).generate();
              return await response(interaction, {
                embeds: [
                  new EmbedBuilder()
                    .setTitle("OMG!!!")
                    .setDescription(`\`${user.username}\` start kissing **${member.user.username}**`)
                    .setColor(HexToNumber(EmbedData.color.pink))
                    .setTimestamp()
                    .setImage(`attachment://${type}-kiss.png`)
                ],
                files: [
                  new AttachmentBuilder(image!, { name: type + "-kiss.png" })
                ]
              });
            }
            case "lesbian": {
              const image = await new GenerateKissImage(
                user.displayAvatarURL({ extension: "png", forceStatic: true }),
                member.displayAvatarURL({ extension: "png", forceStatic: true }),
                false,
                true
              ).generate();
              return await response(interaction, {
                embeds: [
                  new EmbedBuilder()
                    .setTitle("OMG!!!")
                    .setDescription(`\`${user.username}\` start kissing **${member.user.username}**`)
                    .setColor(HexToNumber(EmbedData.color.pink))
                    .setTimestamp()
                    .setImage(`attachment://${type}-kiss.png`)
                ],
                files: [
                  new AttachmentBuilder(image!, { name: type + "-kiss.png" })
                ]
              });
            }
          }
          break;
        }

        case "anime": {
          const
            member = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getMember("user") : interaction instanceof Message && interaction.mentions.members?.first() || interaction.guild?.members.cache.get(args![1]),
            type = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getString("type") : args![2],
            types = ["kiss", "hug", "slap", "pat", "feed"];

          if (!member)
            return await responseError(interaction, "لطفا یوزر را وارد کنید.");

          if (!type || !types.includes(type.toLowerCase()))
            return await responseError(interaction, `فقط میتوانید دو نوع را انتخاب کنید:\n [ ${types.join(" | ")} ]`);

          switch (type) {
            case "kiss": {
              const image = await getLinkResponse("https://nekos.life/api/kiss");
              return await response(interaction, {
                embeds: [
                  new EmbedBuilder()
                    .setTitle("OMG!!!")
                    .setDescription(`\`${user.username}\` start kissing **${member.user.username}**`)
                    .setColor(HexToNumber(EmbedData.color.pink))
                    .setFooter({ text: "This image maked by \"nekos.life\" api." })
                    .setTimestamp()
                    .setImage(`attachment://kiss.gif`)
                ],
                files: [new AttachmentBuilder(image.url, { name: 'kiss.gif' })]
              })
            }

            case "hug": {
              const image = await getLinkResponse("https://nekos.life/api/hug");
              return await response(interaction, {
                embeds: [
                  new EmbedBuilder()
                    .setTitle("OMG!!!")
                    .setDescription(`\`${user.username}\` start hugging **${member.user.username}**`)
                    .setColor(HexToNumber(EmbedData.color.pink))
                    .setFooter({ text: "This image maked by \"nekos.life\" api." })
                    .setTimestamp()
                    .setImage(`attachment://hug.gif`)
                ],
                files: [new AttachmentBuilder(image.url, { name: 'hug.gif' })]
              })
            }

            case "slap": {
              const image = await getLinkResponse("https://nekos.life/api/v2/img/slap");
              return await response(interaction, {
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`OMG!!!`)
                    .setDescription(`\`${user.username}\` get slap to **${member.user.username}**`)
                    .setColor(HexToNumber(EmbedData.color.pink))
                    .setFooter({ text: "This image maked by \"nekos.life\" api." })
                    .setTimestamp()
                    .setImage("attachment://slap.gif")
                ],
                files: [new AttachmentBuilder(image.url, { name: "slap.gif" })]
              })
            }

            case "pat": {
              const image = await getLinkResponse("https://nekos.life/api/v2/img/pat");
              return await response(interaction, {
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`OMG!!!`).setDescription(`\`${user.username}\` start caressing to **${member.user.username}**`)
                    .setColor(HexToNumber(EmbedData.color.pink))
                    .setFooter({ text: "This image maked by \"nekos.life\" api." })
                    .setTimestamp()
                    .setImage("attachment://pat.gif")
                ],
                files: [new AttachmentBuilder(image.url, { name: "pat.gif" })]
              })
            }

            case "feed": {
              const image = await getLinkResponse("https://nekos.life/api/v2/img/feed");
              return await response(interaction, {
                embeds: [
                  new EmbedBuilder()
                    .setTitle("OMG!!!")
                    .setDescription(`\`${user.username}\` is feeding\ **${member.user.username}**`)
                    .setColor(HexToNumber(EmbedData.color.pink))
                    .setFooter({ text: "This image maked by \"nekos.life\" api." })
                    .setTimestamp()
                    .setImage("attachment://feed.gif")
                ],
                files: [new AttachmentBuilder(image.url, { name: "feed.gif" })]
              })
            }
          }
        } break;

        default: {
          break;
        }
      }

    } catch (e: any) {
      error(e)
    }
  }
};
export default command;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */