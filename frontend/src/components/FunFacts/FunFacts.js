import { React, useEffect, useState } from 'react';
export const facts = [
  'If you shuffle a deck of cards properly, chances are that the exact sequence of cards you just shuffled has never been seen before in the history of the world.',
  'The first computer mouse was made of wood.',
  'There are more possible iterations of a game of chess than there are atoms in the observable universe.',
  'Honey never spoils, and you can eat honey that is thousands of years old and still safe to consume.',
  'The heart of a blue whale is so large that a human could swim through its arteries',
  'Cats have five toes on their front paws, but only four on their back paws.',
  'The human brain is the most complex structure in the known universe.',
  'In Japan, there are more pets than children',
  'The Great Wall of China is not visible from space.',
  'An octopus has three hearts.',
  'There are 293 ways to make change for a dollar.',
  'The average person`s left hand does 56% of the typing (when using the proper position of the hands on the keyboard; Hunting and pecking doesn`t count!).',
  'Almonds are a member of the peach family.',
  'The Eiffel Tower can be 15 cm taller during the summer, due to thermal expansion meaning the iron heats up, the particles gain kinetic energy and take up more space.',
  'Australia is wider than the moon. The moon sits at 3400km in diameter, while Australia’s diameter from east to west is almost 4000km.',
  'The Ancient Romans used to drop a piece of toast into their wine for good health - hence why we "raise a toast".'
];

export default function FunFacts () {
  const [randomFact, setRandomFact] = useState(facts[Math.floor(Math.random() * facts.length)]);
  useEffect(() => {
    setInterval(() => {
      setRandomFact(facts[Math.floor(Math.random() * facts.length)]);
    }, 3000);
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} data-testid='FunFacts-element'>
      <h2>Fun Fact:</h2>
      <p style={{ textAlign: 'center' }}>{randomFact}</p>
    </div>
  );
}
