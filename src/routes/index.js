const { Router } = require("express");
const dogsRoutes = require("./dogsRoutes");
const temperamentsRoutes = require("./temperamentsRoutes");
const postDogRoutes = require("./postDogRoutes");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/temperaments", temperamentsRoutes);
router.use("/dogs", dogsRoutes);
router.use("/name", dogsRoutes);
router.use("/:id", dogsRoutes);
router.use("/dog", postDogRoutes); 


module.exports = router;
