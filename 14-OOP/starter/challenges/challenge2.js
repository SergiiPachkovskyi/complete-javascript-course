class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    print = function() { 
        console.log(`'${this.make}' going at ${this.speed} km/h`);
    }

    accelerate = function() { 
        this.speed += 10;
        this.print();
    }

    brake = function() { 
        this.speed -= 5;
        this.print();
    }

    get speedUS() {
        return this.speed = this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
};

const car1 = new Car('Ford', 120);

car1.print();
car1.brake();
car1.accelerate();

console.log(car1.speedUS);
car1.speedUS = 100;
console.log(car1.speedUS);
console.log(car1.speed);

