import React from 'react';
import { useQuery } from 'react-query';

export default function Characters() {
  const fetchCharacters = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/charactr');
    return response.json();
  }

  const { isLoading, data } = useQuery('characters', fetchCharacters);

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(data.error) {
    return <div>Error...</div>
  }

  return (
    <div>{data.results.map(character => (
      <div key={character.id}>{character.name}</div>
    ))}</div>
  )
}
