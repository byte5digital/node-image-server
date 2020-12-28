import express from "express"
import sharp from "sharp"
import dotenv from "dotenv"
import fs from "fs"

dotenv.config()

export const app = express()
export async function resizeImageAnMakeWebP(imageFile, width) {
	return sharp(`./images/${imageFile}`).webp().resize(width)
}

const getWidthForQueryOrGetDefault = (width) => {
	if (
		width === undefined ||
		(typeof width === "string" && Number.isNaN(Number.parseInt(width, 10)))
	) {
		return process.env.DEFAULT_IMAGE_WIDTH
	}
	return width
}

app.get("/:imageFile", async (req, res) => {
	const { imageFile } = req.params
	let { width } = req.query
	if (!fs.existsSync(`./images/${imageFile}`)) {
		return res.status(404).end()
	}
	width = getWidthForQueryOrGetDefault(width)
	const image = await resizeImageAnMakeWebP(
		imageFile,
		Number.parseInt(width.toString(), 10)
	)

	return image.pipe(res).status(200)
})
