const adjectives = [
    "Speedy", "Rusty", "Shiny", "Drifty", "Boosted", "Turbo", "Loud", "Slick", "Greasy", "Burnt",
    "Rapid", "Vibrant", "Fiery", "Electric", "Neon", "Blazing", "Wild", "Zippy", "Smoky", "Revved",
    "Custom", "Gritty", "Flashy", "Powerful", "Supercharged", "Aggressive", "Thundering", "Lightning",
    "Bold", "Crispy", "Unstoppable", "Screeching", "Rowdy", "Massive", "Compact", "Unbreakable",
    "Unhinged", "Wicked", "Monstrous", "Rebellious", "Shadowy", "Illusive", "Radiant", "Daring",
    "Glowing", "Savage", "Overkill", "Chaotic", "Feral", "Untamed", "Beast", "Lowered", "Stanced", 
    "Stripped", "RaceBuild", "Fanatic", "Lunatic", "Funny", "Stunning", "Focused", "Clean", "Momosh"
];

const carParts = [
    "Piston", "Tire", "Engine", "Turbo", "Exhaust", "Bumper", "Spoiler", "Clutch", "Axle", "Gearbox",
    "Radiator", "Alternator", "Brakes", "Camshaft", "Cylinder", "Differential", "Driveshaft",
    "Flywheel", "FuelPump", "Gasket", "Grille", "Headlight", "Ignition", "Intercooler", "Muffler",
    "OilFilter", "Overdrive", "RadiatorFan", "Rearview", "Rim", "Rotor", "ShockAbsorber", "SparkPlug",
    "Speedometer", "Starter", "Strut", "Supercharger", "Suspension", "Throttle", "TimingBelt",
    "Transmission", "Valve", "WaterPump", "Windshield", "Wiper", "Chassis", "Frame", "Crankshaft",
    "AirFilter", "Fender", "Odometer", "BodyKit", "AirFreshener", "Rollcage", "Rollbar", "Buckets", "Injector"
];

const conditions = ["New", "Used", "Newish", "Old"];

const carBrands = [
    "Ferrari", "Porsche", "Lamborghini", "Mustang", "Skyline", "Tesla", "McLaren", "Bugatti", "Koenigsegg",
    "Pagani", "AstonMartin", "Jaguar", "Maserati", "Lotus", "Bentley", "RollsRoyce", "BMW", "Mercedes",
    "Audi", "Volkswagen", "Chevrolet", "Dodge", "Ford", "Honda", "Toyota", "Nissan", "Subaru", "Mazda",
    "Lexus", "Hyundai", "Kia", "AlfaRomeo", "Fiat", "Peugeot", "Renault", "Citroen", "Volvo", "Saab",
    "Jeep", "Chrysler", "Cadillac", "GMC", "Buick", "Lincoln", "Ram", "Suzuki", "Acura", "Infiniti",
    "Mitsubishi", "Opel", "Scion", "Seat", "Skoda", "Genesis", "Hummer", "Polestar", "Rivian", "Lucid",
    "Abarth", "Dacia", "Lancia", "Tata", "Mahindra", "GreatWall", "BYD", "Chery", "Geely", "FAW",
    "Lada", "Zotye", "VinFast", "Fisker", "Delorean", "Shelby", "HSV", "Holden", "Perodua", "Proton",
    "SsangYong", "Morgan", "TVR", "Caterham", "Ginetta", "Wiesmann", "Radical", "Nio", "Borgward",
    "Roewe", "Brilliance", "Haval", "Daewoo", "Isuzu", "Scania", "Kamaz", "MAN", "Tatra", "Daihatsu",
    "Maruti", "Chang'an", "Hongqi", "ZAZ", "Plymouth", "Oldsmobile", "Eagle", "Mercury", "Saturn",
    "Packard", "Studebaker", "Riley", "Talbot", "Austin", "Hillman", "Simca", "Triumph", "MG", "Singer",
    "NSU", "Wartburg", "Trabant", "Moskvitch"
];

const animals = [
    "Panda", "Tiger", "Cheetah", "Wolf", "Hawk", "Falcon", "Eagle", "Jaguar", "Lion", "Panther",
    "Leopard", "Viper", "Cobra", "Mustang", "Raptor", "Gazelle", "Ocelot", "Hyena", "Bison", "Rhino",
    "Bull", "Buffalo", "Fox", "Lynx", "Bobcat", "Cougar", "Grizzly", "PolarBear", "Komodo", "Otter",
    "Wolverine", "Mongoose", "Coyote", "Armadillo", "Scorpion", "Python", "Orca", "Dolphin", "Shark",
    "Barracuda", "Manta", "Condor", "Peacock", "Tarantula", "Octopus", "Gorilla", "Chimp", "Turtle",
    "Husky", "Eel", "Rottweiller", "Yorkie"
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNickName() {
    const formatOptions = [
        () => `${getRandomElement(adjectives)}_${getRandomElement(carParts)}`,
        () => `${getRandomElement(adjectives)}_${getRandomElement(carParts)}_${Math.floor(Math.random() * 100)}`,
        () => `${getRandomElement(carBrands)}_${getRandomElement(animals)}`,
        () => `${getRandomElement(carBrands)}_${getRandomElement(animals)}_${Math.floor(Math.random() * 100)}`,
        () => `${getRandomElement(adjectives)}_${getRandomElement(animals)}_${getRandomElement(carParts)}`,
        () => `${getRandomElement(adjectives)}_${getRandomElement(animals)}_${getRandomElement(carParts)}_${Math.floor(Math.random() * 100)}`,
        () => `${getRandomElement(animals)}_${getRandomElement(adjectives)}_${getRandomElement(conditions)}_${getRandomElement(carParts)}`,
        () => `${getRandomElement(animals)}_${getRandomElement(adjectives)}_${getRandomElement(conditions)}_${getRandomElement(carParts)}_${Math.floor(Math.random() * 100)}`
    ];
    
    return formatOptions[Math.floor(Math.random() * formatOptions.length)]();
}

export {generateNickName}