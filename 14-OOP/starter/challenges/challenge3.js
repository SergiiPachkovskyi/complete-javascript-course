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


const EV = function(speed, charge) {
    Car.call(this, 'Tesla', speed);
    this.charge = charge;
};

EV.prototype = Object.create(Car.prototype)

EV.prototype.chargeBattery = function(chargeTo) { 
    this.charge = chargeTo;
    this.print();
};

EV.prototype.print = function() { 
    console.log(`Tesla going at ${this.speed} km/h, with a charge ${this.charge}`);
};

EV.prototype.accelerate = function() { 
    this.speed += 20;
    this.charge--;
    this.print();
};

const tesla = new EV(100, 90);
tesla.print();
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(95);