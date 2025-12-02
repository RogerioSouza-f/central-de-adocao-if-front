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
        available: false,
        photos: ["https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia10349/racas-de-cachorro-golden-retriever-cpt11.jpg"]
    }
];

const initialAdoptions = [
    {
        id: 1,
        animalId: 3,
        userName: "João Silva",
        userEmail: "joao@email.com",
        userPhone: "(83) 99999-9999",
        userBond: "Estudante",
        date: "15/01/2024"
    }
];

export {initialAnimals, initialAdoptions};
export default initialAnimals;