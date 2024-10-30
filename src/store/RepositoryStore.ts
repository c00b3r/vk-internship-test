import { makeAutoObservable } from "mobx";
import { Repository } from "../interface";

class RepositoryStore {
  repositoryData: Repository[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setRepository(repositories: Repository[]) {
    this.repositoryData = repositories;
  }

  editRepository(id: number, updatedData: Partial<Repository>) {
    const index = this.repositoryData.findIndex((repo) => repo.id === id);
    if (index !== -1) {
      this.repositoryData[index] = { ...this.repositoryData[index], ...updatedData };
    }
  }

  deleteRepository(id: number) {
    const index = this.repositoryData.findIndex((repo) => repo.id === id);
    if (index !== -1) {
      this.repositoryData.splice(index, 1);
    }
  }
}

const repositoryStore = new RepositoryStore();
export default repositoryStore;
