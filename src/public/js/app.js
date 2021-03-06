const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')


//Query selector matches the first element it finds.

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //stops brower from refreshing after pressing the submit button

    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""
    fetch(`/weather/?address=?${location}`).then((response) =>{
        response.json().then((data) => {
            if (data.errorMessage){
                console.log(data.errorMessage)
                messageOne.textContent = data.errorMessage
                messageTwo.textContent = ""
            } else {
                console.log(data.location)
                console.log(data.Forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.Forecast
                messageThree.textContent = data.rain
                messageFour.textContent = data.humidity
                console.log(data.humidity)
            }
        })
    })

})