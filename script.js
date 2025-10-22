let checked = 0
const values = {"fish": 1, "birds": 2, "mammals": 4}

function getAnimals() {
    let animals = {
        "fish": ["Ahven", "Kiiski", "Hauki", "Lahna", "Särki", "Salakka", "Ruutana", "Säyne", "Lohi", "Taimen", "Kirjolohi", "Muikku", "Siika", "Harjus", "Made", "Ankerias", "Nahkiainen"],
        "birds": ["Sinisorsa", "Lapasorsa", "Tukkasotka", "Punasotka", "Pilkkasiipi", "Tavi", "Haapana", "Tukkakoskelo", "Isokoskelo", "Telkkä", "Kyhmyjoutsen", "Laulujoutsen", "Kaakkuri", "Kuikka", "Härkälintu", "Silkkiuikku", "Mustakurkku-uikku", "Töyhtöhyyppä", "Isokuovi", "Rantasipi", "Taivaanvuohi", "Nokikana", "Kalalokki", "Naurulokki", "Harmaalokki", "Merilokki", "Kalatiira", "Merihanhi", "Kanadanhanhi", "Sääksi", "Merikotka", "Kurki"],
        "mammals": ["Majava", "Saukko", "Minkki", "Piisami", "Vesipäästiäinen", "Vesimyyrä"]
    }

    animals.all = animals.fish.concat(animals.birds, animals.mammals)
    return animals
}

function prepare() {
    const checkedTemp = document.querySelectorAll(".startcbox:checked")
    checked = 0

    checkedTemp.forEach((cb) => {
        checked += values[cb.name]
    })

    if (checked === 0) {
        const warntext = document.getElementById("warntext")
        warntext.style.display = "block"
    } else start()
}

function start() {
    const warntext = document.getElementById("warntext")
    warntext.style.display = "none"
    
    const startCont = document.querySelector(".startcontainer")
    const appCont = document.querySelector(".appcontainer")
    startCont.style.display = "none"
    appCont.style.display = "flex"
}