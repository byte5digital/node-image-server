import request from "supertest"
import { app, resizeImageAnMakeWebP } from "../app/app"
import imageSize from "image-size"

describe("check the image processing", () => {
	it("should not throw an error when query of width is not set", async () => {
		const result = await request(app).get("/bg-holding-page-dark.png").send()
		expect(result.status).toBe(200)
	})

	it("shoud not throw an error when giving an wrong query param", async () => {
		const result = await request(app)
			.get("/bg-holding-page-dark.png?width=lorem")
			.send()
		expect(result.status).toBe(200)
	})
	it("the image should have the given size", async () => {
		const result = await resizeImageAnMakeWebP("bg-holding-page-dark.png", 800)
		const dimension = imageSize(await result.toBuffer())
		expect(dimension.width).toBe(800)
	})
	it("request should return a 404 Status when origin image was not found", async () => {
		const result = await request(app).get("/image-not-found.png").send()
		expect(result.status).toBe(404)
	})
})
