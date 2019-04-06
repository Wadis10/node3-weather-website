console.log('Client side javascript file is loaded!');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//Query selector matches the first element it finds.

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //stops brower from refreshing after pressing the submit button

    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ""
    fetch(`http://localhost:3000/weather/?address=?${location}`).then((response) =>{
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
            }
        })
    })

})