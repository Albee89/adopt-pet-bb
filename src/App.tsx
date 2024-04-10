import React, { useState } from 'react';
import "./App.css";

interface Pet {
  name: string;
  species: string;
  color: string;
  happiness: number;
  hunger: number;
  energy: number;
}

enum ActionType {
  Feed,
  Play,
  Rest,
}

const bbPetApp: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pets, setPets] = useState<Pet[]>([]);

  const adoptPet = (name: string, species: string, color: string): void => { // Updated adoptPet function
    const pet: Pet = {
      name,
      species,
      color,
      happiness: 50,
      hunger: 50,
      energy: 50,
    
    };
    setPets([...pets, pet]);
    console.log(`${name} the ${species} has been adopted!`);
  };

  const performAction = (petIndex: number, action: ActionType): void => {
    const updatedPets = [...pets];
    const pet = updatedPets[petIndex];
    switch (action) {
      case ActionType.Feed:
        pet.hunger -= 10;
        break;
      case ActionType.Play:
        pet.happiness += 10;
        pet.energy -= 10;
        break;
      case ActionType.Rest:
        pet.energy += 20;
        break;
      default:
        break;
    }
    updatePetStatus(petIndex, updatedPets);
  };

  const updatePetStatus = (petIndex: number, updatedPets: Pet[]): void => {
    const pet = updatedPets[petIndex];
    // Ensure pet status values stay within bounds
    pet.happiness = Math.min(Math.max(pet.happiness, 0), 100);
    pet.hunger = Math.min(Math.max(pet.hunger, 0), 100);
    pet.energy = Math.min(Math.max(pet.energy, 0), 100);
    checkPetStatus(petIndex, updatedPets);
    setPets(updatedPets);
  };

  const checkPetStatus = (petIndex: number, updatedPets: Pet[]): void => {
    const pet = updatedPets[petIndex];
    if (pet.hunger <= 0 || pet.energy <= 0) {
      console.log(`${pet.name} is too tired or hungry!`);
    } else if (pet.happiness <= 0) {
      console.log(`${pet.name} needs love!`);
    }
  };

  // Render pets
  const renderPets = (): JSX.Element[] => {
    return pets.map((pet, index) => (
      <div key={index}>

        <p>Species: {pet.species}</p>
        <p>Color: {pet.color}</p>
        <p>Happiness: {pet.happiness}</p>
        <p>Hunger: {pet.hunger}</p>
        <p>Energy: {pet.energy}</p>
        <button onClick={() => performAction(index, ActionType.Feed)}>Feed</button>
        <button onClick={() => performAction(index, ActionType.Play)}>Play</button>
        <button onClick={() => performAction(index, ActionType.Rest)}>Rest</button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Virtual Pet Game</h1>
      <button onClick={() => adoptPet("Gok", "Pupper", "Gold")}>Adopt Gok</button>
      <button onClick={() => adoptPet("Bean", "Baby Dragon", "Black")}>Adopt Bean</button>
      <button onClick={() => adoptPet("Atticus", "Little Lion", "Slate Brown")}>Adopt Atticus</button>
      <button onClick={()=> adoptPet("Dixie", "Loch Ness", "Dark Brown")}>Adopt Dixie</button>
      <button onClick={()=> adoptPet("Olympe", "Snow Pupper", "White")}>Adopt Olympe</button>
      {renderPets()}
    </div>
  );
};

export default bbPetApp;
