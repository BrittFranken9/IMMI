import './style.css';
import { OPENAI_API_KEY } from './apiKey.js';

// variables
const button = document.querySelector("button.submit");
const imageContainer = document.querySelector("selection.imageContainer");
const form = document.querySelector("form");
const input = document.querySelector("input.description");

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

// WebSocket connection
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
        // Stop the original background animation
        cancelAnimationFrame(originalAnimationFrameId);
        // Start the new background animation
        startServerMessageAnimation();
    }
}

// Original background animation
const originalCanvas = document.getElementById('lavalamp');
const originalCtx = originalCanvas.getContext('2d');
let originalAnimationFrameId; // To track the animation frame

// Set canvas size to screen size
originalCanvas.width = window.innerWidth;
originalCanvas.height = window.innerHeight;

// Function to create a bubble
function createOriginalBubble() {
    const radius = Math.random() * 30 + 10; // Random size
    const x = Math.random() * originalCanvas.width;
    const y = originalCanvas.height + radius;
    const color = getRandomColor();
    const speed = Math.random() * 2 + 1; // Random speed

    return { x, y, radius, color, speed };
}

// Generate random colors in purple and blue shades
function getRandomColor() {
    const purpleBlueColors = ['#6A5ACD', '#8A2BE2', '#9370DB', '#7B68EE', '#483D8B', '#4169E1'];
    return purpleBlueColors[Math.floor(Math.random() * purpleBlueColors.length)];
}

// Original Bubbles array
let originalBubbles = [];

// Function to draw original bubbles
function drawOriginalBubbles() {
    originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
    originalBubbles.forEach((bubble, index) => {
        originalCtx.beginPath();
        originalCtx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        originalCtx.fillStyle = bubble.color;
        originalCtx.fill();

        // Bubble randomly grow or shrink
        bubble.radius += Math.random() - 0.5;
        if (bubble.radius < 0.1) bubble.radius = 0.1

        // Move the bubble upwards
        bubble.y -= bubble.speed;

        // If the bubble goes off the screen, reposition it
        if (bubble.y + bubble.radius < 0) {
            originalBubbles.splice(index, 1); // Remove the bubble from the array
        }
    });

    // Regularity of new bubbles
    if (Math.random() < 0.03) {
        originalBubbles.push(createOriginalBubble());
    }

    // Continue drawing bubbles
    originalAnimationFrameId = requestAnimationFrame(drawOriginalBubbles);
}

// Start the original animation
drawOriginalBubbles();

// Animation triggered by server message
function startServerMessageAnimation() {
    const serverMessageCanvas = document.getElementById('lavalamp');
    const serverMessageCtx = serverMessageCanvas.getContext('2d');
    
    // Set canvas size to screen size
    serverMessageCanvas.width = window.innerWidth;
    serverMessageCanvas.height = window.innerHeight;
    
    // Function to create a bubble
    function createServerMessageBubble() {
        const radius = Math.random() * 30 + 10; // Random size
        const centerX = serverMessageCanvas.width / 2;
        const centerY = serverMessageCanvas.height / 2;
        const angle = Math.random() * Math.PI * 2; // Random angle
        const x = centerX + Math.cos(angle) * 200; // Radius of circular motion
        const y = centerY + Math.sin(angle) * 200; // Radius of circular motion
        const color = getRandomColor();
        const speed = Math.random() * 2 + 1; // Random speed
    
        return { x, y, radius, color, speed, angle };
    }
    
    // Server Message Bubbles array
    let serverMessageBubbles = [];
    
    // Function to draw bubbles in circular motion
    function drawServerMessageBubbles() {
        serverMessageCtx.clearRect(0, 0, serverMessageCanvas.width, serverMessageCanvas.height);
        serverMessageBubbles.forEach((bubble, index) => {
            serverMessageCtx.beginPath();
            serverMessageCtx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            serverMessageCtx.fillStyle = bubble.color;
            serverMessageCtx.fill();
    
            // Update angle for circular motion
            bubble.angle += 0.02; // Adjust speed of circular motion
    
            // Update bubble position using circular motion equations
            bubble.x = serverMessageCanvas.width / 2 + Math.cos(bubble.angle) * 200;
            bubble.y = serverMessageCanvas.height / 2 + Math.sin(bubble.angle) * 200;
    
            // Remove bubble if it goes off the screen
            if (bubble.x + bubble.radius < 0 || bubble.x - bubble.radius > serverMessageCanvas.width ||
                bubble.y + bubble.radius < 0 || bubble.y - bubble.radius > serverMessageCanvas.height) {
                serverMessageBubbles.splice(index, 1);
            }
        });
    
        // Regularity of new bubbles
        if (Math.random() < 0.05) { // Adjust this value for more or fewer bubbles
            serverMessageBubbles.push(createServerMessageBubble());
        }
    
        // Continue drawing bubbles
        requestAnimationFrame(drawServerMessageBubbles);
    }
    
    // Start the server message animation
    drawServerMessageBubbles();
}
