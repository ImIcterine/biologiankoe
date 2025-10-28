let checked = 0
const values = {"fish": 1, "birds": 2, "mammals": 4}
let animals = null
let onStep = 0
let answers = null

const textinput = document.getElementById("questioninput")
textinput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === "ArrowRight") {
        document.getElementById("nextbutton").click()
    }
    if (event.key === "ArrowLeft") {
        document.getElementById("backbutton").click()
    }
})

function shuffle(ogarr) {
    let narr = []
    let arr = ogarr.slice()
    for (let i = 0; i < ogarr.length; i++) {
        let j = Math.floor(Math.random() * arr.length)
        narr.push(arr[j])
        arr.splice(j, 1)
    }
    return narr
}

function getAnimals() {
    let animalsTemp = {
        "fish": ["Ahven", "Kiiski", "Kuha", "Hauki", "Lahna", "Särki", "Salakka", "Ruutana", "Säyne", "Lohi", "Taimen", "Kirjolohi", "Muikku", "Siika", "Harjus", "Made", "Ankerias", "Nahkiainen"],
        "birds": ["Sinisorsa", "Lapasorsa", "Tukkasotka", "Punasotka", "Pilkkasiipi", "Tavi", "Haapana", "Tukkakoskelo", "Isokoskelo", "Telkkä", "Kyhmyjoutsen", "Laulujoutsen", "Kaakkuri", "Kuikka", "Härkälintu", "Silkkiuikku", "Mustakurkku-uikku", "Töyhtöhyyppä", "Isokuovi", "Rantasipi", "Taivaanvuohi", "Nokikana", "Kalalokki", "Naurulokki", "Harmaalokki", "Merilokki", "Kalatiira", "Merihanhi", "Kanadanhanhi", "Sääksi", "Merikotka", "Kurki"],
        "mammals": ["Majava", "Saukko", "Minkki", "Piisami", "Vesipäästäinen", "Vesimyyrä"]
    }

    animalsTemp.all = animalsTemp.fish.concat(animalsTemp.birds, animalsTemp.mammals)
    return animalsTemp
}

function prepare() {
    const checkedTemp = document.querySelectorAll(".startcbox:checked:not(#random20)")
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

    animals = []
    let animalsBin = checked
    
    if (animalsBin >= 4) {
        animals = animals.concat(getAnimals().mammals)
        animalsBin -= 4
    }
    if (animalsBin >= 2) {
        animals = animals.concat(getAnimals().birds)
        animalsBin -= 2
    }
    if (animalsBin >= 1) {
        animals = animals.concat(getAnimals().fish)
        animalsBin -= 1
    }
    animals = shuffle(animals)

    if (document.getElementById("random20").checked === true) {
        animals = animals.slice(0, 20)
    }

    onStep = -1
    answers = {}
    step()
}

function step(goback = false) {
    const phtext = document.getElementById("phtext")
    const quinput = document.getElementById("questioninput")
    const quimg = document.getElementById("questionimage")

    if (goback) {
        if (onStep > 0) {
            onStep -= 1
            // phtext.textContent = animals[onStep]
            quimg.src = "assets/" + animals[onStep].toLowerCase() + ".png"
            quinput.value = ""
        }
    } else if (animals.length - 1 > onStep) {
        if (onStep >= 0) answers[animals[onStep]] = quinput.value.charAt(0).toUpperCase() + quinput.value.toLowerCase().slice(1)
        onStep += 1
        // phtext.textContent = animals[onStep]
        quimg.src = "assets/" + animals[onStep].toLowerCase() + ".png"
        quinput.value = ""
    } else {
        answers[animals[onStep]] = quinput.value.charAt(0).toUpperCase() + quinput.value.toLowerCase().slice(1)
        const resCont = document.querySelector(".rescontainer")
        const appCont = document.querySelector(".appcontainer")
        resCont.style.display = "flex"
        appCont.style.display = "none"

        let resultnum = 0
        const resnum = document.getElementById("resnum")
        const restext = document.getElementById("restext")
        restext.textContent = ""
        animals.forEach((v) => {
            if (v === answers[v]) {
                restext.innerHTML += "🟢 " + v + "<br />"
                resultnum++
            } else {
                restext.innerHTML += "❌ " + v + ", Sinun vastauksesi: " + answers[v] + "<br />"
            }
        })

        resnum.textContent = "Tuloksesi on " + resultnum + "/" + animals.length + " (" + (resultnum / animals.length * 100).toFixed(1) + "%)"
    }
}

function finish() {
    const startCont = document.querySelector(".startcontainer")
    const resCont = document.querySelector(".rescontainer")
    startCont.style.display = "flex"
    resCont.style.display = "none"
}