let checked = 0
const values = { plants: 1 }
let species = null
let onStep = 0
let answers = null

const alternates = {
    "Käenkaali": ["Käenkaali", "Ketunleipä"],
    "Keräporonjäkälä": ["Keräporonjäkälä", "Palleroporonjäkälä"]
}

const textinput = document.getElementById("questioninput")
textinput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || (event.key === "ArrowRight" && event.shiftKey)) {
        document.getElementById("nextbutton").click()
    }
    if (event.key === "ArrowLeft" && event.shiftKey) {
        document.getElementById("backbutton").click()
    }
})

function intIfWhole(num) {
    if (Number.isInteger(num)) {
        return num
    }
    
    if (num % 1 === 0) {
        return Math.floor(num)
    }
    
    return num
}

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

function getSpecies() {
    let speciesTemp = {
        plants: [
            "Kuusi", "Mänty", "Kataja",
            "Hieskoivu", "Rauduskoivu", "Vaivaiskoivu", "Harmaaleppä", "Tervaleppä", "Pihlaja", "Haapa",
            "Vaahtera", "Tammi", "Lehmus",
            "Paju", "Tuomi",
            "Mustikka", "Puolukka", "Variksenmarja", "Juolukka", "Kanerva", "Suopursu", "Vanamo",
            "Valkovuokko", "Sinivuokko", "Metsätähti", "Maitohorsma", "Käenkaali", "Kangasmaitikka", "Kultapiisku", "Sudenmarja", "Kielo", "Oravanmarja", "Metsäorvokki",
            "Rahkasammal", "Karhunsammal", "Kynsisammal", "Kerrossammal", "Sulkasammal", "Seinäsammal",
            "Naava", "Torvijäkälä", "Harmaaporonjäkälä", "Keräporonjäkälä", "Hirvenjäkälä",
        ],
    }
    speciesTemp.all = speciesTemp.plants
    // speciesTemp.all = speciesTemp.plants.concat(speciesTemp.birds, speciesTemp.mammals)
    return speciesTemp
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

    species = []
    let speciesBin = checked

    /*
    if (speciesBin >= 4) {
        species = species.concat(getSpecies().mammals)
        speciesBin -= 4
    }
    if (speciesBin >= 2) {
        species = species.concat(getSpecies().birds)
        speciesBin -= 2
    }
    */
    if (speciesBin >= 1) {
        species = species.concat(getSpecies().plants)
        speciesBin -= 1
    }
    species = shuffle(species)

    if (document.getElementById("random20").checked === true) {
        species = species.slice(0, 20)
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
            // PLACEHOLDER TEXT: phtext.textContent = species[onStep]
            quimg.src = "assets/" + species[onStep].toLowerCase() + ".png"
            quinput.value = ""
        }
    } else if (species.length - 1 > onStep) {
        if (onStep >= 0) answers[species[onStep]] = quinput.value.charAt(0).toUpperCase() + quinput.value.toLowerCase().slice(1)
        onStep += 1
        // PLACEHOLDER TEXT: phtext.textContent = species[onStep]
        quimg.src = "assets/" + species[onStep].toLowerCase() + ".png"
        quinput.value = ""
    } else {
        answers[species[onStep]] = quinput.value.charAt(0).toUpperCase() + quinput.value.toLowerCase().slice(1)
        const resCont = document.querySelector(".rescontainer")
        const appCont = document.querySelector(".appcontainer")
        resCont.style.display = "flex"
        appCont.style.display = "none"

        let resultnum = 0
        const resnum = document.getElementById("resnum")
        const restext = document.getElementById("restext")
        restext.textContent = ""
        species.forEach((v) => {
            let correct = false

            if (alternates[v]) {
                if (alternates[v].includes(answers[v])) correct = true
            }

            if (v === answers[v]) {
                correct = true
            }

            if (correct) {
                restext.innerHTML += "🟢 " + v + "<br />"
                resultnum++
            } else {
                restext.innerHTML += "❌ " + v + ", Sinun vastauksesi: " + answers[v] + "<br />"
            }
        })

        resnum.textContent = "Tuloksesi on " + resultnum + "/" + species.length + " (" + intIfWhole((resultnum / species.length * 100).toFixed(1)) + "%)"
    }
}

function finish() {
    const startCont = document.querySelector(".startcontainer")
    const resCont = document.querySelector(".rescontainer")
    startCont.style.display = "flex"
    resCont.style.display = "none"
}