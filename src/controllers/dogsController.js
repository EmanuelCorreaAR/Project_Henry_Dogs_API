const axios = require("axios");
const { MY_API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

//TRAIGO INFO DE API
const getInfoApi = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`)
    //fetch.get(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`).then(response => response.json())
    // console.log(apiUrl);
    const apiInfo = await apiUrl.data.map(dogs => {
        return {
            id: dogs.id,
            name: dogs.name,
            min_weight: (dogs.weight.metric.slice(0, 2)),//devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.
            max_weight: (dogs.weight.metric.slice(4)),
            min_height: (dogs.height.metric.slice(0, 2)),
            max_height: (dogs.height.metric.slice(4)),
            life_span: dogs.life_span,
            image: dogs.image.url,
            temperament: dogs.temperament,
        };
    });
    // console.log(apiInfo);
    return apiInfo;
};

//TRAIGO INFO DE LA DB.
const getInfoDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

//CONCATENO AMBAS INFORMACION PARA UN TOTAL
const getInfoAll = async () => {
    const apiInfo = await getInfoApi();
    const dbInfo = await getInfoDb();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
}
// const getInfoAll =[...getInfoApi, ...getInfoDb]; investigar con spreed operator 

// CONTROLLER PARA EL POSTEO
const postDog = async (name, min_weight, max_weight, min_height, max_height, life_span, image,review, temperament) => {
    const postDog = await Dog.create({
        name,
        min_weight,
        max_weight,
        min_height,
        max_height,
        life_span,
        image,
        review
    })
    let temperamentDb = await Temperament.findAll({
        where: { name: temperament }
    })
    const allDogs = postDog.addTemperament(temperamentDb)
    // console.log(allDogs);
    return allDogs
}


module.exports = { getInfoAll, postDog };