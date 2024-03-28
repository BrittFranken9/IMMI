import './style.css'

import { OPENAI_API_KEY } from './apiKey.js';

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
const getImage = async (value) => {

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
                        size: "512x512",
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



let ws = new WebSocket('ws://192.168.100.1:1880/websocket');

ws.onopen = function() {
    console.log('Connected to server');
}

ws.onmessage = function(event) {
  console.log('Message from server ', event.data);
  getImage(event.data)


 
}
