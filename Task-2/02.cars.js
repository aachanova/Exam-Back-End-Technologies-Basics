function solve(cars) {
    function getCarsByBrand(brand) {
        return cars.filter(c => c.brand === brand);
    }

    function addCar(id, brand, model, year, price, inStock) {
        cars.push({id, brand, model, year, price, inStock});
        return cars;
    }

    function getCarById(id) {
        const searchedCar = cars.find(c => c.id === id);
        return (searchedCar ? searchedCar : `Car with ID ${id} not found`);
    }

    function removeCarById(id) {
        const carToRemove = cars.find(c => c.id === id);
        if (!carToRemove) {
            return `Car with ID ${id} not found`;
        } else {
            cars = cars.filter(c => c.id !== id);
            return cars;
        }
    }

    function updateCarPrice(id, newPrice) {
        const searchedCar = cars.find(c => c.id === id);
        if (!searchedCar) {
            return `Car with ID ${id} not found`;
        } else {
            searchedCar.price = newPrice;
            return cars;
        }
    }

    function updateCarStock(id, inStock) {
        const searchedCar = cars.find(c => c.id === id);
        if (!searchedCar) {
            return `Car with ID ${id} not found`;
        } else {
            searchedCar.inStock = inStock;
            return cars;
        }
    }

    return {
        getCarsByBrand,
        addCar,
        getCarById,
        removeCarById,
        updateCarPrice,
        updateCarStock
    };
}

let cars = [
    { id: 1, brand: "Toyota", model: "Corolla", year: 2020, price: 20000, inStock: true },
    { id: 2, brand: "Honda", model: "Civic", year: 2019, price: 22000, inStock: true },
    { id: 3, brand: "Ford", model: "Mustang", year: 2021, price: 35000, inStock: false }
];

const dealership = solve(cars);
// console.log(dealership.getCarsByBrand("Toyota"));

// console.log(dealership.addCar(4, "Tesla", "Model S", 2022, 80000, true));

// console.log(dealership.getCarById(2));

// console.log(dealership.removeCarById(3));
// console.log(cars);


// console.log(dealership.updateCarPrice(1, 85000));

// console.log(dealership.updateCarStock(10, false));