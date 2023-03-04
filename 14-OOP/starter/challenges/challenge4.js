class CarCl {
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
        return this;
    }

    get speedUS() {
        return this.speed = this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
};


class EVCl extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery = function(chargeTo) { 
        this.#charge = chargeTo;
        this.print();
        return this;
    };

    print = function() { 
        console.log(`${this.make} going at ${this.speed} km/h, with a charge ${this.#charge}`);
    };

    accelerate = function() { 
        this.speed += 20;
        this.#charge--;
        this.print();
        return this;
    };
    
};

const tesla = new EVCl('Tesla', 100, 90);
tesla.print();
tesla.accelerate().brake().chargeBattery(95);