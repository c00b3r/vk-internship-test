import { beforeEach, describe, expect, it } from "vitest";
import repositoryStore from "../../store/RepositoryStore";
import { Repository } from "../../interface";

describe("RepositoryStore", () => {
  beforeEach(() => {
    repositoryStore.setRepository([]);
  });

  it("should set repositories correctly", () => {
    const mockRepositories: Repository[] = [
      {
        id: 1,
        name: "Репозиторий 1",
        description: "aboba",
        html_url: "vk.com",
      },
      {
        id: 2,
        name: "Репозиторий 2",
        description: "aboba",
        html_url: "vk.com",
      },
    ];
    repositoryStore.setRepository(mockRepositories);

    expect(repositoryStore.repositoryData).toEqual(mockRepositories);
  });

  it("should not delete a non-existent repository", () => {
    const mockRepositories: Repository[] = [
      { id: 1, name: "Репозиторий 1", description: "aboba", html_url: "vk.com" },
    ];
    repositoryStore.setRepository(mockRepositories);

    repositoryStore.deleteRepository(2);

    expect(repositoryStore.repositoryData).toEqual(mockRepositories);
  });
});
