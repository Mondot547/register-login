const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
    .connect("mongodb+srv://admin01:admin@cluster0.r150sih.mongodb.net/Cluster0?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB:", error);
    });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

app.get("/", cors(), (req, res) => {
    res.send("Hello World!");
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            res.json("exist");
        } else {
            res.json("not exist");
        }
    } catch (error) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            res.json("exist");
        } else {
            await User.create({ email: email, password: password });
            res.json("notexist");
        }
    } catch (error) {
        res.json("fail");
    }
});

app.listen(8000, () => {
    console.log("Server connected on http://localhost:8000");
});