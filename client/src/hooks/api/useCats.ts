import { useEffect } from "react";
import { useMutation, UseMutationOptions, useQuery } from "react-query";
import { Breed } from "../../models/breed";
import { Cat } from "../../models/cat";
import { PagedList } from "../../models/paged-list";
import { SortDirection } from "../../models/sort-direction";

const apiUrl = process.env.API_URL || 'http://localhost:3000';

export type UseCatsPagedProps = {
  page: number;
  itemsPerPage: number;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}

const useCatsPaged = ({ page, itemsPerPage, searchTerm, sortBy, sortDirection }: UseCatsPagedProps) => {
  const result = useQuery<PagedList<Cat>>(['cats', page, searchTerm || ''], async () => {
    const response = await fetch(`${apiUrl}/cats?pageSize=${itemsPerPage}&page=${page}&searchTerm=${searchTerm || ''}&sortBy=${sortBy || ''}&sortDirection=${sortDirection || ''}`);
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