const { Router } = require("express");
const { Sequelize } = require("sequelize");
const { getInfoAll } = require("../controllers/dogsController");

const router = Router();

//------------------------GET/dogs-------------------------- 
router.get("/", async (req, res) => {
    try {
        const allDogs = await getInfoAll()
        res.status(200).send( allDogs )
    } catch (error) {
        res.send(error.message);
    }
})

//-------------------GET/dogs/name?name=-------------------- 
router.get("/name", async (req, res) => {
    try {
        const { name } = req.query;
        const totalDogs = await getInfoAll();
        if (name) {
            let dogName = totalDogs.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()));//creamos un nuevo array con los elementos que cumplan con la condicion .name todo en minuscula.
            dogName.length ? res.status(200).send(dogName) : res.status(404).json("dog name not found");
        }
    }
    catch (error) {
        res.status(404).send(error.message);
    }
})

//--------------------GET/dogs/id--------------------- 
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const totalDogs = await getInfoAll();
        if (id) {
            let dogId = totalDogs.filter(dog => dog.id == id); //creamos un nuevo array con los elementos que cumplan con la condicion igual id.
            dogId.length ? res.status(200).send(dogId[0]) : res.status(404).json("dog id not found");// condicion hay algo en dogId, si es asi traeme dogId en su posicion [0 para ingresar al array], si no ststaus 400.
        }
    }
    catch (error) {
        res.status(404).send(error.message);
    }
})



module.exports = router;


