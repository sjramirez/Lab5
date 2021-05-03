// script.js

const img = new Image(); // used to load image from <input> and draw to canvas

  const canvas = document.getElementById("user-image");
  const ctx = canvas.getContext("2d");
  let submit = document.querySelector("button[type = 'submit']");

  let clear = document.querySelector("button[type='reset']");
  let readText = document.querySelector("button[type ='button'");
  let voiceSelection = document.querySelector("#voice-selection");
  let form = document.querySelector("#generate-meme");
  let topText = document.querySelector("#text-top");
  let botText = document.querySelector("#text-bottom");
  let volume = document.querySelector("input[type='range']");
  let icon = document.querySelector("#volume-group > img");
  let voices = document.querySelector("#voice-selection");


  let voiceOptions = speechSynthesis.getVoices();
 

  let imgInput = document.querySelector("#image-input");

  imgInput.addEventListener('change', () => {
    console.log(imgInput.files);
    let url = URL.createObjectURL(imgInput.files[0]);
    console.log(url);
    img.src = url;
    img.alt = imgInput.files[0].name;

  });


clear.addEventListener('click', () => 
{
  readText.disabled = true;
  voiceSelection.disabled = true;
  clear.disabled = true;

  imgInput.value = '';
  ctx.clearRect(0,0,canvas.width,canvas.height);
});

form.addEventListener('submit', () => {
 
  event.preventDefault();
  clear.disabled = false;
  readText.disabled = false;
  voiceSelection.disabled = false;
  setTimeout(()=>{console.log(voiceOptions);},3000);
  
  ctx.font= "50px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(topText.value,canvas.width/2,50);
  ctx.fillText(botText.value,canvas.width/2, canvas.height - 10);

  ctx.strokeStyle = "black";
  ctx.strokeText(topText.value,canvas.width/2,50);
  ctx.strokeText(botText.value,canvas.width/2, canvas.height - 10);
});




// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
 console.log("did it");
 

 ctx.rect(0,0,400,400);
 ctx.fillStyle = "black";
 ctx.fill();

 let positionValues = getDimmensions(canvas.width, canvas.height, img.width, img.height);
 ctx.drawImage(img, positionValues.startX, positionValues.startY,positionValues.width, positionValues.height);
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});


volume.addEventListener('change', () => {
    if(volume.value >= 67)
    {
      icon.src = "icons/volume-level-3.svg";
      icon.alt = "Volume level 3";
    }
    else if(volume.value >= 34)
    {
      icon.src = "icons/volume-level-2.svg";
      icon.alt = "Volume level 2";
    }
    else if(volume.value >= 1)
    {
      icon.src = "icons/volume-level-1.svg";
      icon.alt = "Volume level 1";
    }
    else
    {
      icon.src = "icons/volume-level-0.svg";
      icon.alt = "Volume level 0";
    }
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
