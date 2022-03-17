const easyBtn = document.querySelector("#easyBtn");
const mediumBtn = document.querySelector("#mediumBtn");
const hardBtn = document.querySelector("#hardBtn");
const instructionsBtn = document.querySelector("#instructionsBtn");
const mainDiv = document.querySelector("#mainDiv");
let dotes = document.querySelectorAll(".theDote");
let img = document.querySelector("#theImg");
const instructionsSection = document.getElementById("instructions");
const closeInstructions = document.getElementById("closeInstructions");
// handle instructions display
// show ins on clicking on instructionsBtn
instructionsBtn.addEventListener("click", () => {
  instructionsSection.style.display = "flex";
});
//close  ins on clicking on closeInstructions
closeInstructions.addEventListener("click", () => {
  instructionsSection.style.display = "none";
});

// the function that creates the dotes
function create(numOfDotes) {
  //erase all dotes before creating new
  dotes = document.querySelectorAll(".theDote");
  if (dotes.length > 0) {
    for (let z = 0; z < dotes.length; z++) {
      dotes[z].remove();
    }
  }
  // get game div width and height
  let width = mainDiv.offsetWidth - 50;
  let height = mainDiv.offsetHeight - 50;
  for (let i = 0; i < numOfDotes; i++) {
    let left = Math.floor(Math.random() * (width - 50) + 50);
    let top = Math.floor(Math.random() * (height - 50) + 50);
    let red = Math.floor(Math.random() * 250) + 50;
    let green = Math.floor(Math.random() * 250) + 50;
    let blue = Math.floor(Math.random() * 250) + 50;
    let dote = `<p class="theDote" style=" top: ${top}px; left: ${left}px; background-color:rgb(${red},${green},${blue})" >`;
    mainDiv.innerHTML += dote;
  }
}

// set difficulty
easyBtn.addEventListener("click", () => create(10));
mediumBtn.addEventListener("click", () => create(20));
hardBtn.addEventListener("click", () => create(30));
// erase the dotes function
function erase() {
  for (let z = 0; z < dotes.length; z++) {
    if (
      parseInt(dotes[z].style.top) < parseInt(img.style.top) + img.height &&
      parseInt(dotes[z].style.top) > parseInt(img.style.top) &&
      parseInt(dotes[z].style.left) < parseInt(img.style.left) + img.width &&
      parseInt(dotes[z].style.left) > parseInt(img.style.left)
    ) {
      dotes[z].remove();
    }
  }
  dotes = document.querySelectorAll(".theDote");
}
// declare the setIntervals
let moveRight;
let moveLeft;
let moveUp;
let moveDown;

//handle the key events
window.addEventListener("keyup", (event) => {
  img = document.querySelector("#theImg");
  let divWidth = mainDiv.getBoundingClientRect().width;
  let divHeight = mainDiv.getBoundingClientRect().height;
  // clear all intervals before start a new one
  clearInterval(moveRight);
  clearInterval(moveLeft);
  clearInterval(moveUp);
  clearInterval(moveDown);
  // handle alert if there is no dotes before moving the pac man img
  dotes = document.querySelectorAll(".theDote");
  if (dotes.length === 0) {
    return alert("Please chose a difficulty first!");
  }
  // read the img start top and start left
  let prevTop = parseInt(img.style.top, 10);
  let prevLeft = parseInt(img.style.left, 10);

  // handle moving right
  if (event.key === "ArrowRight") {
    img.style.transform = "";
    moveRight = setInterval(() => {
      erase();
      prevLeft = parseInt(img.style.left, 10);
      if (prevLeft >= divWidth) {
        console.log("in if");
        prevLeft = 0;
      }
      img.style.left = prevLeft + 4 + "px";
    }, 30);
  }
  // handle moving left
  if (event.key === "ArrowLeft") {
    img.style.transform = "scaleX(-1)";
    moveLeft = setInterval(() => {
      erase();
      prevLeft = parseInt(img.style.left, 10);
      if (prevLeft <= 0) {
        prevLeft = divWidth;
      }
      img.style.left = prevLeft - 4 + "px";
    }, 30);
  }
  // handle moving up
  if (event.key === "ArrowUp") {
    img.style.transform = "rotate(-90deg)";
    moveUp = setInterval(() => {
      erase();
      prevTop = parseInt(img.style.top, 10);
      if (prevTop <= 0) {
        prevTop = divHeight;
      }
      img.style.top = prevTop - 4 + "px";
    }, 30);
  }
  // handle moving down
  if (event.key === "ArrowDown") {
    img.style.transform = "rotate(90deg)";
    moveDown = setInterval(() => {
      erase();
      prevTop = parseInt(img.style.top, 10);
      if (prevTop >= divHeight) {
        prevTop = 0;
      }
      img.style.top = prevTop + 4 + "px";
    }, 30);
  }
});
