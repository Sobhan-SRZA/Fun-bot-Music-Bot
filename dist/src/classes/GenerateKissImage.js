"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const canvas_1 = require("@napi-rs/canvas");
const error_1 = tslib_1.__importDefault(require("../utils/error"));
const jimp_1 = require("jimp");
class GenerateKissImage {
    isGay;
    isLesbian;
    avatar1;
    avatar2;
    constructor(avatar1, avatar2, isGay = false, isLesbian = false) {
        this.avatar1 = avatar1;
        this.avatar2 = avatar2;
        this.isGay = isGay;
        this.isLesbian = isLesbian;
    }
    ;
    setFirstUserAvatar(item) {
        this.avatar1 = item;
        return this;
    }
    ;
    setSecondUserAvatar(item) {
        this.avatar2 = item;
        return this;
    }
    setGay(item) {
        this.isGay = item;
        return this;
    }
    setLesbian(item) {
        this.isLesbian = item;
        return this;
    }
    #applyText(canvas, text, size, width, font) {
        const ctx = canvas.getContext("2d");
        do {
            ctx.font = `${(size -= 1)}px ${font}`;
        } while (ctx.measureText(text).width > width);
        return ctx;
    }
    async generate() {
        try {
            const canvas = (0, canvas_1.createCanvas)(1024, 600);
            const ctx = canvas.getContext("2d");
            if (this.isGay) {
                // Draw background
                let bg_image = await jimp_1.Jimp.read("./images/g404002__kiss.png");
                bg_image = await bg_image.getBuffer("image/png");
                const bg = await (0, canvas_1.loadImage)(bg_image);
                ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                // Draw first image
                let user_image = await jimp_1.Jimp.read(this.avatar2);
                user_image = user_image.circle();
                user_image = await user_image.getBuffer("image/png");
                const user = await (0, canvas_1.loadImage)(user_image);
                ctx.drawImage(user, 250, 15, 250, 250);
                // Draw second image
                let author_image = await jimp_1.Jimp.read(this.avatar1);
                author_image = author_image.circle();
                author_image = await author_image.getBuffer("image/png");
                const author = await (0, canvas_1.loadImage)(author_image);
                ctx.drawImage(author, 590, 20, 250, 250);
            }
            else if (this.isLesbian) {
                // Draw background
                let bg_image = await jimp_1.Jimp.read("./images/r412301_lesbian_kiss.png");
                bg_image = await bg_image.getBuffer("image/png");
                const bg = await (0, canvas_1.loadImage)(bg_image);
                ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                // Draw first image
                let user_image = await jimp_1.Jimp.read(this.avatar2);
                user_image = user_image.circle();
                user_image = await user_image.getBuffer("image/png");
                const user = await (0, canvas_1.loadImage)(user_image);
                ctx.drawImage(user, 250, 175, 250, 250);
                // Draw second image
                let author_image = await jimp_1.Jimp.read(this.avatar1);
                author_image = author_image.circle();
                author_image = await author_image.getBuffer("image/png");
                const author = await (0, canvas_1.loadImage)(author_image);
                ctx.drawImage(author, 590, 45, 250, 250);
            }
            // To buffer the image
            const buffer = canvas.toBuffer("image/png");
            return Buffer.from(buffer);
        }
        catch (e) {
            (0, error_1.default)(e);
        }
        ;
    }
}
exports.default = GenerateKissImage;
;
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */ 
//# sourceMappingURL=GenerateKissImage.js.map