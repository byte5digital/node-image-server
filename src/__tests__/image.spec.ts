import request from "supertest"
import { app, resizeImageAnMakeWebP } from "../app/app"
import imageSize from "image-size"

const originalImage =
	"https://pcloudstorage.blob.core.windows.net/producercloud/assets/_default_upload_bucket/Mainstream_RnB_Vol1_[600x600].jpg"
describe("", () => {
	it("should not throw an error when query of width is not set", async () => {
		const result = await request(app)
			.get(`/${encodeURIComponent(originalImage)}`)
			.send()
		expect(result.status).toBe(200)
	})

	it("shoud not throw an error when giving an wrong query param", async () => {
		const result = await request(app)
			.get(`/${encodeURIComponent(originalImage)}?width=lorem`)
			.send()
		expect(result.status).toBe(200)
	})

	it("should process the image with the given query param when integer", async () => {
		const result = await request(app)
			.get(`/${encodeURIComponent(originalImage)}?width=800`)
			.send()
		expect(result.status).toBe(200)
	})
	it("the image should have the given size", async () => {
		const result = await resizeImageAnMakeWebP(originalImage, 800)
		const dimension = imageSize(await result.toBuffer())
		expect(dimension.width).toBe(800)
	})
})
