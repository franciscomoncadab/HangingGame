let words: string[] = [
     'COMPUTADORA',
     'CARRO',
     'HELIO',
     'CACHON',
     'DORMIR',
     'ALMOHADA',
     'PARANGATURIMICUARO',
     'GATITO',
     'PERRO',
     'ZOMBIES'
];



export function getRandomWorld() {
     const randomIndex = Math.floor(Math.random() * words.length);
     return words[randomIndex]
};