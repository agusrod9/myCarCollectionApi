const adjectives = [
    "speedy", "rusty", "shiny", "drifty", "boosted", "turbo", "loud", "slick", "greasy", "burnt",
    "rapid", "vibrant", "fiery", "electric", "neon", "blazing", "wild", "zippy", "smoky", "revved",
    "custom", "gritty", "flashy", "powerful", "supercharged", "aggressive", "thundering", "lightning",
    "bold", "crispy", "unstoppable", "screeching", "rowdy", "massive", "compact", "unbreakable",
    "unhinged", "wicked", "monstrous", "rebellious", "shadowy", "illusive", "radiant", "daring",
    "glowing", "savage", "overkill", "chaotic", "feral", "untamed", "beast", "lowered", "stanced",
    "stripped", "racebuild", "fanatic", "lunatic", "funny", "stunning", "focused", "clean"
];

const carParts = [
    "piston", "tire", "engine", "turbo", "exhaust", "bumper", "spoiler", "clutch",
    "axle", "gearbox", "radiator", "alternator", "brakes", "camshaft", "cylinder",
    "differential", "driveshaft", "flywheel", "fuelpump", "gasket", "grille",
    "headlight", "ignition", "intercooler", "muffler", "oilfilter", "overdrive",
    "radiatorfan", "rearview", "rim", "rotor", "shockabsorber", "sparkplug",
    "speedometer", "starter", "strut", "supercharger", "suspension", "throttle",
    "timingbelt", "transmission", "valve", "waterpump", "windshield", "wiper",
    "chassis", "frame", "crankshaft", "airfilter", "fender", "odometer",
    "bodykit", "airfreshener", "rollcage", "rollbar", "buckets", "injector"
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