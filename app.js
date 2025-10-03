require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_PASSWORD)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('error de conexión:', error));


const superheroSchema = new mongoose.Schema({
    id: {type: Number, Unique: true}, 
    nombreSuperheroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    nombreSociedad: { type: String, default: 'Desconocido' },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: [String],
    poder: [String],
    habilidadEspecial: [String],
    aliado: [String],
    enemigo: [String],
    createdAt: { type: Date, default: Date.now },
    creador: [String],
}, {collection: 'Grupo-19'});

const SuperHero = mongoose.model('SuperHero', superheroSchema);

async function insertSuperHero(){
    const hero = new SuperHero({
        id: 1,
        nombreSuperheroe: 'Spooderman',
        nombreReal: 'Peter Parker',
        nombreSociedad: 'Avenger',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: ['Radioactiva'],
        poder: ['Trepar paredes', 'Super fuerza', 'Agilidad', 'Sentido arácnido'],
        habilidadEspecial: ['Trepar paredes', 'Lanzar telarañas'],
        aliado: ['Tony Stark', 'Capitán América'],
        enemigo: ['Duende Verde', 'Doctor Octopus'],
        creador: ['Ibañez Rodrigo']
    });
    await hero.save();
    console.log('Superhéroe insertado:', hero);
}

// LLAMAR FUNCION INSERTAR UN SUPERHEROE
//insertSuperHero();

async function updateSuperHero(nombreSuperheroe){
    const result = await SuperHero.updateOne(
        { nombreSuperheroe: nombreSuperheroe },
        { $set: { edad: 31 } }
    );
    console.log('Superhéroe actualizado:', result);
}

// LLAMAR FUNCION ACTUALIZAR UN SUPERHEROE
updateSuperHero('Spooderman');

async function deleteSuperHero(nombreSuperheroe){
    const result = await SuperHero.deleteOne({ nombreSuperheroe: nombreSuperheroe });
    console.log('Superhéroe eliminado:', result);
}

// LLAMAR FUNCION ELIMINAR UN SUPERHEROE
//deleteSuperHero('Spooderman');

async function findSuperHeroes(){
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('Superhéroes encontrados:', heroes);
}

// LLAMAR FUNCION BUSCAR SUPERHEROES
//findSuperHeroes();