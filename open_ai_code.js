import './style.css'

import { OPENAI_API_KEY } from './apiKey.js'

// variables
const button = document.querySelector("button.submit")
const imageContainer = document.querySelector("selection.imageContainer")
const form = document.querySelector("form")
const input = document.querySelector("input.description")



// avoid refresh
function handleForm(event) {
    event.preventDefault();
}

form.addEventListener('submit', handleForm);

// AI image generation
const getImage = async () => {
    const value = input.value.trim(); // trim to remove extra white spaces

    if (!value) {
        return;
    }

    console.log(value);

            // add the loading class
            imageContainer.classList.add('loading');

            // clear Image
            imageContainer.innerHTML = '';
            
            try {

                const response = await fetch("https://api.openai.com/v1/images/generations", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        prompt: `Create an amazing painting using this description ${value}`,
                        n: 1,
                        size: "256x256",
                    }),
                });

                const result = await response.json();
                console.log(result);

                // remove the loading class from image container
                imageContainer.classList.remove('loading');

                // iterate through the results
                result.data.forEach((item) => {
                    if (item.url) { // Changed from item.url to image.url
                        const img = document.createElement("img");
                        img.src = item.url;
                        img.alt = input;
                        imageContainer.appendChild(img);
                    }
                });

                input.value = '';

            } catch (error) {
                console.log(error);
            }
 }


button.addEventListener("click", getImage);

let ws = new WebSocket('ws://10.150.197.78:1880/websocket');

ws.onopen = function() {
    console.log('Connected to server');
}

ws.onmessage = function(event) {
  console.log('Message from server ', event.data);

  if (typeof event.data === 'object') {
    // Assuming the message is a blob
    var reader = new FileReader();
    reader.onload = function() {
        var base64data = reader.result;
        // Use the base64 data as image src
        var img = document.querySelector('#image');
        img.src = base64data;
    };
    reader.readAsDataURL(event.data);
}

 
}

