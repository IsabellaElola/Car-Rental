import React from "react";
import CarCard from "./CarCard";
import { carsData } from "../data/cars.js";

const CarListings = ({ filter = "All", onBookingClick }) => {
  const filteredCars =
    filter === "All"
      ? carsData
      : carsData.filter((car) => car.category === filter);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {filter}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onBookingClick={onBookingClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CarListings;
