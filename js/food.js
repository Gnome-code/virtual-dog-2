class Food{
    constructor(){

        this.foodSt = 0
        this.lastFed;
        this.image = loadImage("images/Milk.png")
    }
   





    updateFoodSt(stock){
            this.foodSt = stock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    detectFood(){
        if(this.foodSt > 0){
            this.foodSt = this.foodSt - 1;
        }

    }

    getFoodSt(){
        return this.foodSt
    }

    display(){
        var x= 80, y = 90;

        imageMode(CENTER);
        image(this.image, 620, 220, 70, 70);

        if(this.foodSt != 0){
            for(var i = 0; i < this.foodSt; i++){
                if(i % 10 == 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50)
                x = x + 30
            }

        }

    }


}