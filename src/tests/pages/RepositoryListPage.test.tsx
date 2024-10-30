import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ListOfRepositories } from "../../pages/RepositoryListPage";
import repositoryStore from "../../store/RepositoryStore";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Repository } from "../../interface";

interface RepositoryStore {
  repositoryData: Repository[];
  setRepository: (repositories: Repository[]) => void;
  editRepository: (id: number, updatedData: Partial<Repository>) => void;
  deleteRepository: (id: number) => void;
}

vi.mock("../../store/RepositoryStore", async (importOriginal) => {
  const actual = (await importOriginal()) as RepositoryStore;
  return {
    ...actual,
    setRepository: vi.fn(),
    editRepository: vi.fn(),
    deleteRepository: vi.fn(),
  };
});

describe("ListOfRepositories", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;

    repositoryStore.setRepository([]);
  });

  it("should display error message", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Fetch error"));

    render(<ListOfRepositories />);

    await waitFor(() => {
      expect(screen.getByText(/Ошибка получения данных/i)).toBeInTheDocument();
    });
  });

  it("should render repository items", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [{ id: 1, name: "Репозиторий 1" }],
      }),
    });

    render(<ListOfRepositories />);

    await waitFor(() => expect(screen.getByText(/Репозиторий 1/i)).toBeInTheDocument());
  });
  it("should display essage no repositories are found", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [],
      }),
    });

    render(<ListOfRepositories />);

    await waitFor(() =>
      expect(screen.getByText(/Больше репозиториев не найдено/i)).toBeInTheDocument(),
    );
  });

  it("should fetch more repositories when scrolled", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [{ id: 1, name: "Репозиторий 1" }],
      }),
    });

    render(<ListOfRepositories />);

    await waitFor(() => expect(screen.getByText(/Репозиторий 1/i)).toBeInTheDocument());

    window.scrollY = document.documentElement.scrollHeight;
    window.dispatchEvent(new Event("scroll"));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [{ id: 2, name: "Репозиторий 2" }],
      }),
    });

    await waitFor(() => expect(screen.getByText(/Репозиторий 2/i)).toBeInTheDocument());
  });

  it("should recover from an error when retrying", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Fetch error"));

    render(<ListOfRepositories />);

    await waitFor(() => {
      expect(screen.getByText(/Ошибка получения данных/i)).toBeInTheDocument();
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [{ id: 1, name: "Репозиторий 1" }],
      }),
    });

    fireEvent.click(screen.getByText(/Повторить/i));

    await waitFor(() => expect(screen.getByText(/Репозиторий 1/i)).toBeInTheDocument());
  });
});
