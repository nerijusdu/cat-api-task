import { useState } from "react";
import { useQuery } from "react-query";
import { Breed } from "../../models/breed";

const apiUrl = 'https://api.thecatapi.com/v1'; // move to env

const useCatBreedsPaged = (page: number, itemsPerPage: number) => {
  const [totalItems, setTotalItems] = useState(0);
  const result = useQuery<Breed[]>(['breeds', page], async() => {
    const result = await fetch(`${apiUrl}/breeds?limit=${itemsPerPage}&page=${page}`);
    setTotalItems(Number(result.headers.get('Pagination-Count')));
    return await result.json();
  });

  return {
    ...result,
    totalItems
  };
}

const useCatBreeds = () => useQuery<Breed[]>('breeds', async() => {
  const result = await fetch(`${apiUrl}/breeds`);
  return await result.json();
});

export { useCatBreeds, useCatBreedsPaged };
