import { Cat } from "../models/cat";
import { GetListRequest } from "../models/get-list-request";
import { Guid } from "../models/guid";

// TODO: use db
export class CatService {
  private cats: Cat[] = [];

  getAll(request: GetListRequest<Cat> = {}) {
    let cats = this.cats;
    if (request.searchTerm) {
      const searchTerm = request.searchTerm.toLowerCase();
      return cats.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    cats = cats.sort(CatService.sortCats(request.sortBy, request.sortDirection));

    if (request.pageSize) {
      cats = cats.slice(request.page * request.pageSize, (request.page + 1) * request.pageSize);
    }

    return cats;
  }

  getById(id: string) {
    return this.cats.find(cat => cat.id === id);
  }

  create(cat: Cat) {
    const newCat = { ...cat, id: Guid.newGuid() };
    this.cats.push(newCat);
    return newCat;
  }

  delete(id: string) {
    const cat = this.getById(id);
    if (cat) {
      this.cats = this.cats.filter(cat => cat.id !== id);
    }
  }

  search(query: string) {
    const searchTerm = query.toLowerCase();
    return this.cats.filter(cat => cat.name.toLowerCase().includes(searchTerm));
  }

  private static sortCats(sortBy: keyof Cat, sortDirection: 'asc' | 'desc') {
    sortBy = sortBy || 'name';
    sortDirection = sortDirection || 'asc';

    return (a: Cat, b: Cat) => {
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }
  }
}

export default new CatService();