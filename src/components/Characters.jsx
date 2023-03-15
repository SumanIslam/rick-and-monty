import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Character from './Character';

export default function Characters() {
  const [page, setPage] = useState(2);

  const fetchCharacters = async ({ queryKey }) => {
		const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
		return response.json();
	};

  const { isLoading, data, isPreviousData } = useQuery(['characters', page], fetchCharacters, {
    keepPreviousData: true
  });

  console.log(data);

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(data.error) {
    return <div>Error...</div>
  }

  return (
    <div className='characters'>
      {data.results.map(character => (
        <Character key={character.id} character={character} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage((prevPage) => prevPage -1)}>Previous</button>
        <button disabled={isPreviousData && !data.info.next} onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
      </div>
    </div>
  )
}
