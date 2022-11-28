const { Router } = require("express")
const { getAllTemps } = require("../controllers/temperamentsController")

const router = Router()

//--------------------GET/temperaments---------------------- 
router.get("/", async (req, res) => {
    try {
        const temperament = await getAllTemps();
        res.status(200).send(temperament);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router; 