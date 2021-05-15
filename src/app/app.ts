import express from "express"
import sharp from "sharp"
import dotenv from "dotenv"
import got from "got"
import cors from "cors"
import fs from "fs"
import { Stream } from "stream"

dotenv.config()

export const app = express()
app.use(cors())
app.use(express.static(`./public`))

export async function resizeImageAnMakePng(
	imageFile: Stream,
	width: number,
	quality = 85,
	lossless = false
) {
	const sharpStream = sharp()
	imageFile.pipe(sharpStream)
	return sharpStream
		.pipe(sharpStream)
		.png({
			quality,
		})
		.resize(width)
}

export async function resizeImageAnMakeWebP(
	imageFile: Stream,
	width: number,
	quality = 85,
	lossless = false
) {
	const sharpStream = sharp()
	imageFile.pipe(sharpStream)
	return sharpStream
		.pipe(sharpStream)
		.webp({
			quality,
			lossless,
		})
		.resize(width)
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

const resolutions = [1920, 3840]
const qualities = [80, 90, 100]
const losslessArray = [true, false]

app.get("/local", async (req, res) => {
	fs.readdir("originals", undefined, (err, files) => {
		files.forEach(async (file) => {
			resolutions.forEach(async (resolution) => {
				qualities.forEach(async (quality) => {
					losslessArray.forEach(async (lossless) => {
						const imageStream = fs.createReadStream(`originals/${file}`)
						const image = await resizeImageAnMakeWebP(
							imageStream,
							resolution,
							quality,
							lossless
						)
						image.toBuffer((error, data, info) => {
							fs.writeFile(
								`processed/${file.split(".")[0]}_${resolution}_${quality}_${
									lossless ? "LOSSLESS" : "NOTLOSSLESS"
								}.webp`,
								data,
								{ flag: "w" },
								() => {
									console.log(
										`processed/${file.split(".")[0]}_${resolution}_${quality}_${
											lossless ? "LOSSLESS" : "NOTLOSSLESS"
										}.webp`
									)
								}
							)
						})
					})
				})
			})
		})
	})
	res.status(200).send()
})

app.get("/:imageFile/:lossless/:format/:width", async (req, res) => {
	const { imageFile, lossless, format, width } = req.params
	const isLossless = lossless === "true" ?? false
	console.log(imageFile)
	const finalWidth = getWidthForQueryOrGetDefault(width)
	if (format === "webp") {
		const image = await resizeImageAnMakeWebP(
			got.stream(imageFile),
			Number.parseInt(finalWidth.toString(), 10),
			80,
			isLossless
		)
		return image.pipe(res).status(200)
	}
	const image = await resizeImageAnMakePng(
		got.stream(imageFile),
		Number.parseInt(finalWidth.toString(), 10),
		80,
		isLossless
	)
	return image.pipe(res).status(200)
})
