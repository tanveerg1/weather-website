const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

const $getLocation = document.querySelector('#get-location');

$getLocation.addEventListener('click', (e) => {
    e.preventDefault();
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    messageContent();

    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/weatherbutton?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`).then((response) => {
            console.log(response)
            promiseData(response);
        });
    });
});

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    
    messageContent();

    fetch('/weather?address=' + location).then((response) => {
       promiseData(response);
    });

});

const messageContent = () =>{
    message1.textContent = 'Loading message';
    message2.textContent = '';
}

const promiseData = (response) => {
    response.json().then((data) => {
        //console.log(data);
        if(data.error) {
            message1.textContent = data.error;
        } else {
            message1.textContent = data.location
            message2.textContent = data.forecast;
        }
    });
}
