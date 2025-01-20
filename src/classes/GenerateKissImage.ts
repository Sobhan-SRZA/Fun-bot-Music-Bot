import { Canvas, createCanvas, loadImage, SKRSContext2D } from "@napi-rs/canvas";
import error from "../utils/error";
import { Jimp } from "jimp";

export default class GenerateKissImage {

  isGay: boolean;
  isLesbian: boolean;
  avatar1: string;
  avatar2: string;
  constructor(avatar1: string, avatar2: string, isGay: boolean = false, isLesbian: boolean = false) {
    this.avatar1 = avatar1;
    this.avatar2 = avatar2;
    this.isGay = isGay;
    this.isLesbian = isLesbian;
  };

  setFirstUserAvatar(item: string) {
    this.avatar1 = item;
    return this;
  };

  setSecondUserAvatar(item: string) {
    this.avatar2 = item;
    return this;
  }

  setGay(item: boolean) {
    this.isGay = item;
    return this;
  }

  setLesbian(item: boolean) {
    this.isLesbian = item;
    return this;
  }

  #applyText(canvas: Canvas, text: string, size: number, width: number, font: string): SKRSContext2D {
    const ctx = canvas.getContext("2d");
    do {
      ctx.font = `${(size -= 1)}px ${font}`;
    } while (ctx.measureText(text).width > width);
    return ctx;
  }

  async generate() {
    try {
      const canvas = createCanvas(1024, 600);
      const ctx = canvas.getContext("2d");
      if (this.isGay) {
        // Draw background
        let bg_image: any = await Jimp.read("./images/g404002__kiss.png");
        bg_image = await bg_image.getBuffer("image/png");
        const bg = await loadImage(bg_image);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // Draw first image
        let user_image: any = await Jimp.read(this.avatar2);
        user_image = user_image.circle();
        user_image = await user_image.getBuffer("image/png");
        const user = await loadImage(user_image);
        ctx.drawImage(user, 250, 15, 250, 250);


        // Draw second image
        let author_image: any = await Jimp.read(this.avatar1);
        author_image = author_image.circle();
        author_image = await author_image.getBuffer("image/png");
        const author = await loadImage(author_image);
        ctx.drawImage(author, 590, 20, 250, 250);
      }

      else if (this.isLesbian) {
        // Draw background
        let bg_image: any = await Jimp.read("./images/r412301_lesbian_kiss.png");
        bg_image = await bg_image.getBuffer("image/png");
        const bg = await loadImage(bg_image);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // Draw first image
        let user_image: any = await Jimp.read(this.avatar2);
        user_image = user_image.circle();
        user_image = await user_image.getBuffer("image/png");
        const user = await loadImage(user_image);
        ctx.drawImage(user, 250, 175, 250, 250);


        // Draw second image
        let author_image: any = await Jimp.read(this.avatar1);
        author_image = author_image.circle();
        author_image = await author_image.getBuffer("image/png");
        const author = await loadImage(author_image);
        ctx.drawImage(author, 590, 45, 250, 250);
      }

      // To buffer the image
      const buffer = canvas.toBuffer("image/png");
      return Buffer.from(buffer);
    } catch (e: any) {
      error(e)
    };
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */