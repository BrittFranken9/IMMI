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
  // Hide all elements with the id 'tekst'
  document.querySelector('.text').style.display = 'none';


  // Hide loading spinner
  imageContainer.classList.add('loading');

  // Clear Image
  imageContainer.innerHTML = '';

  try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
              prompt: `Create a beautiful artwork with many blue and purple tints using this description ${value}`,
              n: 1,
              size: "512x512",
          }),
      });

      const result = await response.json();

      // Remove loading spinner
      imageContainer.classList.remove('loading');

      // Show elements with the id 'tekst'
      document.querySelectorAll('#tekst > *').forEach(element => {
          element.style.display = 'block';
      });

      // iterate through the results
      result.data.forEach((item) => {
          if (item.url) {
              const img = new Image();
              img.onload = function() {
                  // Hide all text elements after the image is fully loaded
                  document.querySelectorAll('.loading-text').forEach(element => {
                      element.classList.add('hidden');
                  });
              };
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
  if (event.data === "1") {
      location.reload(); // Refresh the page
  } else {
      getImage(event.data);
  }
}


// background animation

const canvas = document.getElementById('lavalamp');
const ctx = canvas.getContext('2d');

// Canvas grootte instellen op schermgrootte
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Functie om een bubbel te creëren
function createBubble() {
  const radius = Math.random() * 30 + 10; // Willekeurige grootte
  const x = Math.random() * canvas.width;
  const y = canvas.height + radius;
  const color = getRandomColor();
  const speed = Math.random() * 2 + 1; // Willekeurige snelheid

  return { x, y, radius, color, speed };
}

// Willekeurige kleuren genereren in paars- en blauwtinten
function getRandomColor() {
  const purpleBlueColors = ['#6A5ACD', '#8A2BE2', '#9370DB', '#7B68EE', '#483D8B', '#4169E1'];
  return purpleBlueColors[Math.floor(Math.random() * purpleBlueColors.length)];
}

// Bubbels array
let bubbles = [];

// Functie om bubbels te tekenen
function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach((bubble, index) => {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();

    // Bubbel willekeurig laten groeien of krimpen
    bubble.radius += Math.random() - 0.5;
    if (bubble.radius < 0.1) bubble.radius= 0.1

    // Beweeg de bubbel omhoog
    bubble.y -= bubble.speed;

    // Als de bubbel uit het scherm gaat, opnieuw positioneren
    if (bubble.y + bubble.radius < 0) {
      bubbles.splice(index, 1); // Verwijder de bubbel uit de array
    }
  });

  // Regelmaat van nieuwe bubbels
  if (Math.random() < 0.03) {
    bubbles.push(createBubble());
  }

  // Doorgaan met tekenen van bubbels
  requestAnimationFrame(drawBubbles);
}

// Start de animatie
drawBubbles();

