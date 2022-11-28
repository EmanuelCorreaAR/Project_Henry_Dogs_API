const { Router } = require("express");
const { postDog } = require("../controllers/dogsController");

//-----------------------POST/dogs-------------------------- 
const router = Router();


router.post("/", async (req, res) => {
    const { name, min_weight, max_weight, min_height, max_height, life_span, image, temperament } = req.body
    try {
        if (!name || !min_height || !max_height || !min_weight || !max_weight || !temperament) //validacion 
            res.status(400).json("some data is missing")
        await postDog(name, min_weight, max_weight, min_height, max_height, life_span, image, temperament)
        res.status(200).json("new dog create!");
    } catch (error) { }
});


module.exports = router;
