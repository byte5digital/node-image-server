import express from "express"
import sharp from "sharp"
import dotenv from "dotenv"
import fs from "fs"
import got from "got"
import cors from "cors"

dotenv.config()

export const app = express()
app.use(cors())
app.use(express.static(`./public`))

export async function resizeImageAnMakeWebP(imageFile: string, width: any) {
	const sharpStream = sharp()
	got.stream(imageFile).pipe(sharpStream)
	return sharpStream.pipe(sharpStream).webp().resize(width)
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
	console.log(imageFile)
	width = getWidthForQueryOrGetDefault(width)
	const image = await resizeImageAnMakeWebP(
		imageFile,
		Number.parseInt(width.toString(), 10)
	)

	return image.pipe(res).status(200)
})
