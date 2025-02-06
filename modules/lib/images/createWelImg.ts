import { Canvas, loadImage } from "canvas";
import { GuildMember } from "discord.js";
import getColor from "get-image-colors";

export async function createWelImage(menber: GuildMember) {
	const displayAvtUrl = menber.displayAvatarURL({
		extension: "png",
		size: 512,
	});
	const canvas = new Canvas(960, 540);
	const ctx = canvas.getContext("2d");

	const gradient = ctx.createLinearGradient(0, 0, 960, 540);

	const colorAvt = await getColor(displayAvtUrl);

	colorAvt[0].rgb();

	gradient.addColorStop(
		0,
		`rgb(${colorAvt[0].rgb()[0]}, ${colorAvt[0].rgb()[1]}, ${
			colorAvt[0].rgb()[2]
		})`
	);
	gradient.addColorStop(
		2,
		`rgb(${colorAvt[1].rgb()[0]}, ${colorAvt[1].rgb()[1]}, ${
			colorAvt[1].rgb()[2]
		})`
	);
	ctx.fillStyle = gradient;

	ctx.fillRect(0, 0, 960, 540);

	const bg = await loadImage("./assets/BG.png");
	const avt = await loadImage(displayAvtUrl ?? "");

	ctx.drawImage(bg, 0, 0);
	ctx.save();

	ctx.beginPath();
	ctx.arc(80 + 295 / 2, 125 + 295 / 2, 295 / 2, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	ctx.drawImage(avt, 80, 125, 295, 295);
	ctx.restore();

	return canvas.toBuffer();
}
