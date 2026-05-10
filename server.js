import exp from 'express'
import { connect } from 'mongoose'
import { empApp } from './APIs/EmployeeAPI.js'
import {config} from 'dotenv'
import cors from 'cors'
config()
const app = exp()
//Add cors middleware (Cross Origin Resource Sharing - different domains)
app.use(cors({
    origin:"https://empapp-nine.vercel.app/" //accepts reqs from this origin
}))
app.use(exp.json())
app.use("/employee-api", empApp)
const port = process.env.PORT || 9000
//connect to DB server
async function connectDB() {
    try {
        await connect(process.env.DB_URL)
        console.log("DB connected successfully")

        //start server
        app.listen(port, () => console.log("Server on port 9000..."))
    } catch (err) {
        console.log("err in DB connection: ", err)
    }
}
connectDB()

