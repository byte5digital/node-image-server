import express from "express"
import sharp from "sharp"
import dotenv from "dotenv"
import { app } from "./app/app"

dotenv.config()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {})
