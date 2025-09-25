const boat = document.getElementById("boat");
const aboutMe = document.getElementById("AboutMe");
const hometown = document.getElementById("Hometown");
const localFood = document.getElementById("LocalFood");
const touristPlaces = document.getElementById("TouristPlaces");

const speed = 20; // movement step
let rect = boat.getBoundingClientRect();
let x = rect.left, y = rect.top; // target position
let currentX = x, currentY = y; // actual rendered position

const originalSources = {
  aboutMe: aboutMe.src,
  hometown: hometown.src,
  localFood: localFood.src,
  touristPlaces: touristPlaces.src
};

function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function animate() {
  // interpolate positions (smooth transition)
  currentX += (x - currentX) * 0.15; 
  currentY += (y - currentY) * 0.15;

  // update boat position
  boat.style.left = currentX + "px";
  boat.style.top = currentY + "px";

  // scroll smoothly towards boat
  window.scrollTo({
    top: currentY - window.innerHeight / 2 + boat.offsetHeight / 2,
    left: currentX - window.innerWidth / 2 + boat.offsetWidth / 2,
    behavior: "auto" // disable CSS smooth, we handle it manually
  });


  // collision check
  const boatRect = boat.getBoundingClientRect();

  // reset all images first
  aboutMe.src = originalSources.aboutMe;
  hometown.src = originalSources.hometown;
  localFood.src = originalSources.localFood;
  touristPlaces.src = originalSources.touristPlaces;

  // check in order cuz only one can be active
  if (isColliding(boatRect, aboutMe.getBoundingClientRect())) {
    aboutMe.src = "assets/AboutMe_Selected.png";
  } 
  else if (isColliding(boatRect, hometown.getBoundingClientRect())) {
    hometown.src = "assets/Hometown_Selected.png";
  } 
  else if (isColliding(boatRect, localFood.getBoundingClientRect())) {
    localFood.src = "assets/LocalFood_Selected.png";
  } 
  else if (isColliding(boatRect, touristPlaces.getBoundingClientRect())) {
    touristPlaces.src = "assets/TouristPlaces_Selected.png";
  }

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);



document.addEventListener("keydown", (event) => {
  const boatWidth = boat.offsetWidth;
  const boatHeight = boat.offsetHeight;
  const pageWidth = document.documentElement.scrollWidth;
  const pageHeight = document.documentElement.scrollHeight;

  const maxX = pageWidth - boatWidth;
  const maxY = pageHeight - boatHeight;

  switch (event.key.toLowerCase()) {
    case "w": if (y - speed >= 0) y -= speed; boat.src = "assets/Boat_Front.png"; break;
    case "s": if (y + speed <= maxY) y += speed; boat.src = "assets/Boat_Front.png"; break;
    case "a": if (x - speed >= 0) x -= speed; boat.src = "assets/Boat_Left.png"; break;
    case "d": if (x + speed <= maxX) x += speed; boat.src = "assets/Boat_Right.png"; break;
  }

  if (event.key.toLowerCase() === "e") {
    const boatRect = boat.getBoundingClientRect();

    if (isColliding(boatRect, aboutMe.getBoundingClientRect())) {
      window.location.href = "profile/";
    } 
    else if (isColliding(boatRect, hometown.getBoundingClientRect())) {
        window.location.href = "hometown/";
    } 
    else if (isColliding(boatRect, localFood.getBoundingClientRect())) {
        window.location.href = "food/";
    } 
    else if (isColliding(boatRect, touristPlaces.getBoundingClientRect())) {
        window.location.href = "tourist/";
    }
  }
  
});
