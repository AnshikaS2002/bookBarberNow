import express from "express";

const app = express();

//Midleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("BookBarberNow backend is running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})