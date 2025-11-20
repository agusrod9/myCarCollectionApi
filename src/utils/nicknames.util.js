const adjectives = [
    "Speedy", "Rusty", "Shiny", "Drifty", "Boosted", "Turbo", "Loud", "Slick", "Greasy", "Burnt",
    "Rapid", "Vibrant", "Fiery", "Electric", "Neon", "Blazing", "Wild", "Zippy", "Smoky", "Revved",
    "Custom", "Gritty", "Flashy", "Powerful", "Supercharged", "Aggressive", "Thundering", "Lightning",
    "Bold", "Crispy", "Unstoppable", "Screeching", "Rowdy", "Massive", "Compact", "Unbreakable",
    "Unhinged", "Wicked", "Monstrous", "Rebellious", "Shadowy", "Illusive", "Radiant", "Daring",
    "Glowing", "Savage", "Overkill", "Chaotic", "Feral", "Untamed", "Beast", "Lowered", "Stanced", 
    "Stripped", "RaceBuild", "Fanatic", "Lunatic", "Funny", "Stunning", "Focused", "Clean"
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

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNickName() {
    const formatOptions = [
        () => `${getRandomElement(adjectives)}_${getRandomElement(carParts)}`,
        () => `${getRandomElement(adjectives)}_${getRandomElement(carParts)}_${Math.floor(Math.random() * 100)}`,
    ];
    
    return formatOptions[Math.floor(Math.random() * formatOptions.length)]();
}

export {generateNickName}