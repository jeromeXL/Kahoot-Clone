import React from 'react';

export default function FunFacts () {
  const facts = [
    'If you shuffle a deck of cards properly, chances are that the exact sequence of cards you just shuffled has never been seen before in the history of the world.',
    'The first computer mouse was made of wood.',
    'There are more possible iterations of a game of chess than there are atoms in the observable universe.',
    'Honey never spoils, and you can eat honey that is thousands of years old and still safe to consume.',
    'The heart of a blue whale is so large that a human could swim through its arteries',
    'Cats have five toes on their front paws, but only four on their back paws.',
    'The human brain is the most complex structure in the known universe.',
    'In Japan, there are more pets than children',
    'The Great Wall of China is not visible from space.',
    'An octopus has three hearts.'
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>Fun Fact:</h2>
      <p>{randomFact}</p>
    </div>
  );
}
