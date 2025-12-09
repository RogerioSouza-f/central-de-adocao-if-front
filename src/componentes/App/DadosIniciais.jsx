
import {useState} from "react";

/* DADOS INICIAIS */

const initialAnimals = [
    {
        id: 1,
        name: "Luna",
        species: "Cachorro",
        breed: "Golden Retriever",
        age: "2 anos",
        gender: "Fêmea",
        description: "Luna é uma cadela muito carinhosa e energética.",
        available: true,
        photos: ["https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png"]
    },
    {
        id: 2,
        name: "Milo",
        species: "Gato",
        breed: "Persa",
        age: "1 ano",
        gender: "Macho",
        description: "Milo é um gatinho muito dócil e carinhoso.",
        available: true,
        photos: ["https://petitgato.com.br/img/webp/gatos-persas-em-sao-paulo-img-3779.webp"]
    },
    {
        id: 3,
        name: "Bella",
        species: "Cachorro",
        breed: "Vira-lata",
        age: "4 anos",
        gender: "Fêmea",
        description: "Bella é uma cadelinha muito inteligente e leal.",
        available: true,
        photos: ["https://virapet.ong.br/wp-content/uploads/2025/05/o-que-e-um-cachorro-vira-lata-1024x585.webp"]
    }
];

export default initialAnimals;
