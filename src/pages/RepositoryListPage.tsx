import { useCallback, useEffect, useState } from "react";
import { Repository } from "../interface";
import { RepositoryItem } from "../components/RepositoryItem/RepositoryItem";
import styles from "./RepositoryListPage.module.css";
import { observer } from "mobx-react-lite";
import repositoryStore from "../store/RepositoryStore";

export const ListOfRepositories = observer(() => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [haveMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(false);

  const token = import.meta.env.VITE_TOKEN;

  const getReposData = useCallback(async () => {
    if (loading || error || !haveMoreData) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}&per_page=30`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      repositoryStore.setRepository([
        ...repositoryStore.repositoryData,
        ...data.items.filter(
          (newItem: { id: number }) =>
            !repositoryStore.repositoryData.some((item) => item.id === newItem.id),
        ),
      ]);
      setHasMoreData(data.items.length > 0);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [error, haveMoreData, loading, page, token]);

  const scroll = useCallback(() => {
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    getReposData();
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [page, getReposData, scroll]);

  const handleEdit = (id: number, updatedData: Partial<Repository>) => {
    repositoryStore.editRepository(id, updatedData);
  };

  const handleDelete = (id: number) => {
    repositoryStore.deleteRepository(id);
  };

  return (
    <div className={styles["repository-wrapper"]}>
      {repositoryStore.repositoryData.map((repoItem, index) => {
        return (
          <RepositoryItem
            key={repoItem.id}
            repo={repoItem}
            index={index + 1}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      })}
      {loading && !error && <p>Загрузка данных...</p>}
      {!haveMoreData && <p>Больше репозиториев не найдено.</p>}
      {error && (
        <p>
          Ошибка получения данных <button onClick={() => setError(false)}>Повторить</button>
        </p>
      )}
    </div>
  );
});
