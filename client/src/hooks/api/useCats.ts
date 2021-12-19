import { useEffect } from "react";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import { Breed } from "../../models/breed";
import { Cat } from "../../models/cat";
import { PagedList } from "../../models/paged-list";

const apiUrl = 'http://localhost:3000'; // move to env

const useCatsPaged = (page: number, itemsPerPage: number, searchTerm?: string) => {
  const result = useQuery<PagedList<Cat>>(['cats', page, searchTerm || ''], async () => {
    const response = await fetch(`${apiUrl}/cats?pageSize=${itemsPerPage}&page=${page}&searchTerm=${searchTerm || ''}`);
    return await response.json();
  });

  return {
    ...result,
    data: result.data?.items || [],
    totalItems: result.data?.totalItems || 0,
  }
};

const useAddCat = (breeds?: Breed[], options?: UseMutationOptions<any, any, Cat>) => useMutation(async (data: Cat) => {
  const breedName = breeds?.find(breed => breed.id === data.breedId)?.name;
  return await fetch(`${apiUrl}/cats`, {
    method: 'POST',
    body: JSON.stringify({ ...data, breedName }),
    headers: { 'Content-Type': 'application/json' }
  });
}, options);

const useRemoveCat = (options?: UseMutationOptions<any, any, string>) => useMutation(async (id: string) => {
  return await fetch(`${apiUrl}/cats/${id}`, {
    method: 'DELETE'
    });
}, options);

export { useCatsPaged, useAddCat, useRemoveCat };