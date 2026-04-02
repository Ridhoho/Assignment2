require("dotenv").config()
const express = require("express")
const app = express()
const routes = require("./routes")
const sequelize = require("./models")

app.use(express.json())
app.use("/", routes)

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})

const startServer = async() => {
    try{
        await sequelize.authenticate()
        console.log("Database Connected");

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (err) {
        console.error("Database connection failed:", err)
    }
}

startServer()