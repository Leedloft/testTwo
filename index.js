const form = document.querySelector('.first-item')
const input = document.querySelector('.input-item')
const content1 = document.querySelector('.p1')
const city = document.querySelector('.city')
const day = document.querySelector('.day')
const time = document.querySelector('.time')
const image = document.querySelector('.image')
const celc = document.querySelector('.celc')
const sunny = document.querySelector('.sunny')
const feels = document.querySelector('.feels-like')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const p1 = document.querySelector('.p1')
const contentBlockThree = document.querySelector('.content-block-two')

const API = {
    key: "1e1d4ed868e748d68d372120221412",
    base: "http://api.weatherapi.com/v1/current.json"
}
input.addEventListener('keypress', inputSearch)

function getDate(date) {
    let newDate = new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric', weekday: 'long', day: 'numeric' })
    return newDate
}

function inputSearch(event) {
    if (event.keyCode === 13 && input.value) {
        event.preventDefault()
        let query = `${input.value}`
        async function changeWeather(API) {
            try {
                document.querySelector('.content-block-two').classList.add('content-block-three')
                document.querySelector('.p1').classList.add('p2')
                let urlFetch = await fetch(`${API.base}?key=${API.key}&q=${query}`)
                const data = await urlFetch.json()
                city.innerHTML = `${data.location.name}, ${data.location.country}`
                day.innerHTML = `${getDate((data.location.localtime.split(' ').shift()))}`
                time.innerHTML = data.location.localtime.split(' ').pop([])
                celc.innerHTML = `${data.current.temp_c}°C`
                sunny.innerHTML = data.current.condition.text
                feels.innerHTML = `Feels like: ${Math.floor(data.current.feelslike_c)}°c`
                humidity.innerHTML = `Humidity: ${data.current.humidity}%`
                wind.innerHTML = `Wind: ${data.current.wind_kph}kph`
                image.src = `https://${data.current.condition.icon}`
            } catch (e) {
                document.querySelector('.p1').classList.remove('p2')
                p1.innerHTML = 'No matching location found'
                contentBlockThree.classList.remove('content-block-three')
            }
        }
        changeWeather(API)
    }
}



// const API = {
//     key: "1e1d4ed868e748d68d372120221412",
//     base: "http://api.weatherapi.com/v1/current.json"
//   }
//   fetch(`${API.base}?key=${API.key}&q=${query}`)
//   console.log(API)







