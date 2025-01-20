"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const error_1 = tslib_1.__importDefault(require("../../utils/error"));
const getAuthor_1 = tslib_1.__importDefault(require("../../utils/getAuthor"));
const GenerateKissImage_1 = tslib_1.__importDefault(require("../../classes/GenerateKissImage"));
const responseError_1 = tslib_1.__importDefault(require("../../utils/responseError"));
const response_1 = tslib_1.__importDefault(require("../../utils/response"));
const embed_1 = tslib_1.__importDefault(require("../../storage/embed"));
const HexToNumber_1 = tslib_1.__importDefault(require("../../functions/HexToNumber"));
const getLinkResponse_1 = tslib_1.__importDefault(require("../../functions/getLinkResponse"));
const command = {
    data: {
        name: "image",
        description: "ارسال عکس های انیمه ای و ساخت عکس های بامزه.",
        type: discord_js_1.ApplicationCommandType.ChatInput,
        default_member_permissions: new discord_js_1.PermissionsBitField([
            discord_js_1.PermissionFlagsBits.SendMessages,
        ]),
        default_bot_permissions: new discord_js_1.PermissionsBitField([
            discord_js_1.PermissionFlagsBits.SendMessages,
            discord_js_1.PermissionFlagsBits.EmbedLinks
        ]),
        dm_permission: true,
        nsfw: false,
        options: [
            {
                name: "kiss",
                description: "ساخت عکس بوسیدن یوزر.",
                type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "یک یوزر انتخاب کنید.",
                        type: discord_js_1.ApplicationCommandOptionType.User,
                        required: true
                    },
                    {
                        name: "type",
                        description: "کدوم نوع سبک تصویر رو میخوای؟",
                        type: discord_js_1.ApplicationCommandOptionType.String,
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
                        type: discord_js_1.ApplicationCommandOptionType.String,
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
                type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "user",
                        description: "Who do you want to use?",
                        type: discord_js_1.ApplicationCommandOptionType.User,
                        required: true
                    },
                    {
                        name: "type",
                        description: "What type of anime method you want?",
                        type: discord_js_1.ApplicationCommandOptionType.String,
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
                        type: discord_js_1.ApplicationCommandOptionType.String,
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
            const user = (0, getAuthor_1.default)(interaction), Subcommand = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getSubcommand() : args[0];
            switch (Subcommand) {
                case "kiss": {
                    const member = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getMember("user") : interaction instanceof discord_js_1.Message && interaction.mentions.members?.first() || interaction.guild?.members.cache.get(args[1]), type = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getString("type") : args[2], types = ["gay", "lesbian"];
                    if (!member)
                        return await (0, responseError_1.default)(interaction, "لطفا یوزر را وارد کنید.");
                    if (!type || !types.includes(type.toLowerCase()))
                        return await (0, responseError_1.default)(interaction, `فقط میتوانید دو نوع را انتخاب کنید:\n [ ${types.join(" | ")} ]`);
                    switch (type) {
                        case "gay": {
                            const image = await new GenerateKissImage_1.default(user.displayAvatarURL({ extension: "png", forceStatic: true }), member.displayAvatarURL({ extension: "png", forceStatic: true }), true).generate();
                            return await (0, response_1.default)(interaction, {
                                embeds: [
                                    new discord_js_1.EmbedBuilder()
                                        .setTitle("OMG!!!")
                                        .setDescription(`\`${user.username}\` start kissing **${member.user.username}**`)
                                        .setColor((0, HexToNumber_1.default)(embed_1.default.color.pink))
                                        .setTimestamp()
                                        .setImage(`attachment://${type}-kiss.png`)
                                ],
                                files: [
                                    new discord_js_1.AttachmentBuilder(image, { name: type + "-kiss.png" })
                                ]
                            });
                        }
                        case "lesbian": {
                            const image = await new GenerateKissImage_1.default(user.displayAvatarURL({ extension: "png", forceStatic: true }), member.displayAvatarURL({ extension: "png", forceStatic: true }), false, true).generate();
                            return await (0, response_1.default)(interaction, {
                                embeds: [
                                    new discord_js_1.EmbedBuilder()
                                        .setTitle("OMG!!!")
                                        .setDescription(`\`${user.username}\` start kissing **${member.user.username}**`)
                                        .setColor((0, HexToNumber_1.default)(embed_1.default.color.pink))
                                        .setTimestamp()
                                        .setImage(`attachment://${type}-kiss.png`)
                                ],
                                files: [
                                    new discord_js_1.AttachmentBuilder(image, { name: type + "-kiss.png" })
                                ]
                            });
                        }
                    }
                    break;
                }
                case "anime":
                    {
                        const member = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getMember("user") : interaction instanceof discord_js_1.Message && interaction.mentions.members?.first() || interaction.guild?.members.cache.get(args[1]), type = interaction instanceof discord_js_1.CommandInteraction && interaction.options instanceof discord_js_1.CommandInteractionOptionResolver ? interaction.options.getString("type") : args[2], types = ["kiss", "hug", "slap", "pat", "feed"];
                        if (!member)
                            return await (0, responseError_1.default)(interaction, "لطفا یوزر را وارد کنید.");
                        if (!type || !types.includes(type.toLowerCase()))
                            return await (0, responseError_1.default)(interaction, `فقط میتوانید دو نوع را انتخاب کنید:\n [ ${types.join(" | ")} ]`);
                        switch (type) {
                            case "kiss": {
                                const image = await (0, getLinkResponse_1.default)("https://nekos.life/api/kiss");
                                return await (0, response_1.default)(interaction, {
                                    embeds: [
                                        new discord_js_1.EmbedBuilder()
                                            .setTitle("OMG!!!")
                                            .setDescription(`\`${user.username}\` start kissing **${member.user.username}**`)
                                            .setColor((0, HexToNumber_1.default)(embed_1.default.color.pink))
                                            .setFooter({ text: "This image maked by \"nekos.life\" api." })
                                            .setTimestamp()
                                            .setImage(`attachment://kiss.gif`)
                                    ],
                                    files: [new discord_js_1.AttachmentBuilder(image.url, { name: 'kiss.gif' })]
                                });
                            }
                            case "hug": {
                                const image = await (0, getLinkResponse_1.default)("https://nekos.life/api/hug");
                                return await (0, response_1.default)(interaction, {
                                    embeds: [
                                        new discord_js_1.EmbedBuilder()
                                            .setTitle("OMG!!!")
                                            .setDescription(`\`${user.username}\` start hugging **${member.user.username}**`)
                                            .setColor((0, HexToNumber_1.default)(embed_1.default.color.pink))
                                            .setFooter({ text: "This image maked by \"nekos.life\" api." })
                                            .setTimestamp()
                                            .setImage(`attachment://hug.gif`)
                                    ],
                                    files: [new discord_js_1.AttachmentBuilder(image.url, { name: 'hug.gif' })]
                                });
                            }
                            case "slap": {
                                const image = await (0, getLinkResponse_1.default)("https://nekos.life/api/v2/img/slap");
                                return await (0, response_1.default)(interaction, {
                                    embeds: [
                                        new discord_js_1.EmbedBuilder()
                                            .setTitle(`OMG!!!`)
                                            .setDescription(`\`${user.username}\` get slap to **${member.user.username}**`)
                                            .setColor((0, HexToNumber_1.default)(embed_1.default.color.pink))
                                            .setFooter({ text: "This image maked by \"nekos.life\" api." })
                                            .setTimestamp()
                                            .setImage("attachment://slap.gif")
                                    ],
                                    files: [new discord_js_1.AttachmentBuilder(image.url, { name: "slap.gif" })]
                                });
                            }
                            case "pat": {
                                const image = await (0, getLinkResponse_1.default)("https://nekos.life/api/v2/img/pat");
                                return await (0, response_1.default)(interaction, {
                                    embeds: [
                                        new discord_js_1.EmbedBuilder()
                                            .setTitle(`OMG!!!`).setDescription(`\`${user.username}\` start caressing to **${member.user.username}**`)
                                            .setColor((0, HexToNumber_1.default)(embed_1.default.color.pink))
                                            .setFooter({ text: "This image maked by \"nekos.life\" api." })
                                            .setTimestamp()
                                            .setImage("attachment://pat.gif")
                                    ],
                                    files: [new discord_js_1.AttachmentBuilder(image.url, { name: "pat.gif" })]
                                });
                            }
                            case "feed": {
                                const image = await (0, getLinkResponse_1.default)("https://nekos.life/api/v2/img/feed");
                                return await (0, response_1.default)(interaction, {
                                    embeds: [
                                        new discord_js_1.EmbedBuilder()
                                            .setTitle("OMG!!!")
                                            .setDescription(`\`${user.username}\` is feeding\ **${member.user.username}**`)
                                            .setColor((0, HexToNumber_1.default)(embed_1.default.color.pink))
                                            .setFooter({ text: "This image maked by \"nekos.life\" api." })
                                            .setTimestamp()
                                            .setImage("attachment://feed.gif")
                                    ],
                                    files: [new discord_js_1.AttachmentBuilder(image.url, { name: "feed.gif" })]
                                });
                            }
                        }
                    }
                    break;
                default: {
                    break;
                }
            }
        }
        catch (e) {
            (0, error_1.default)(e);
        }
    }
};
exports.default = command;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=image.js.map