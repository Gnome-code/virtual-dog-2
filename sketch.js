
var database
var dog, hDog, nDog, foodS, foodSt, feed, addF, foodObj, fedTime, lastFed
function preload()
{
  //load images here
  nDog = loadImage("images/Dog.png")
  hDog = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  

  foodSt = database.ref('food');
  foodSt.on("value", readStock)
  
  feed = createButton("Feed the Dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addF = createButton("Add Food")
  addF.position(800, 95)
  addF.mousePressed(addFood)
  
  foodObj = new Food()

  dog = createSprite(750, 250, 50, 50)
  dog.addImage(nDog)
  dog.scale = 0.35
 
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  
  text("Food left:" + foodS, 250, 430)
  //add styles here
  foodObj.display();
  fedTime = database.ref('feedTime')
  fedTime.on("value", function(data){
    lastFed = data.val()
  })
  fill(255, 255, 254)
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:   "+ lastFed%12 + "PM", 350, 30)
  }else if(lastFed == 0){
    text("Last Feed:  12 AM", 350, 30)
  }else {
    text("Last Feed:  "+ lastFed + "AM", 350, 30)

  }
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodSt(foodS)
}

function feedDog(){
  dog.addImage(hDog)
  foodObj.updateFoodSt(foodObj.getFoodSt() - 1)
  database.ref('/').update({
    food: foodObj.getFoodSt(),
    feedTime: hour()

  })
}


function addFood(){
  foodS = foodS + 1;
  database.ref('/').update({
    food: foodS
  })
}