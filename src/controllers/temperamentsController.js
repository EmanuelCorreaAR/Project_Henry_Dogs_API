const axios = require("axios");
const { MY_API_KEY } = process.env;
const { Temperament } = require("../db.js");

const getAllTemps = async () => {
    const temperamentApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`)

    const temperament = temperamentApi.data.map(el => el.temperament).join(", ").split(", ").filter(el => el != "") //recorro el array => separo cada uno de los elementos del arreglo => devuelvo un nuevo array => devuelvo un nuevo array con los elementos ue cumplan con la condicion de que no sea igual a string vacio.

    temperament.forEach(el => { //ejecuto la funcion una vez por cada elemento del array.
        Temperament.findOrCreate({ //busco o creo el temperaemento, donde? en el name.
            where: { name: el }
        })
    });

    const dogTemperament = await Temperament.findAll();//agregamos al modelo
    return dogTemperament

}

module.exports = { getAllTemps };