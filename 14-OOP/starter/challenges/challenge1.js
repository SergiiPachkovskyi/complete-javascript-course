const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
};


Car.prototype.print = function() { 
    console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function() { 
    this.speed += 10;
    this.print();
};

Car.prototype.brake = function() { 
    this.speed -= 5;
    this.print();
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.print();
car2.print();

car1.brake();
car2.accelerate();
