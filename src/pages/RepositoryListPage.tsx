import { useCallback, useEffect, useState } from "react";
import { Repository } from "../interface";
import { RepositoryItem } from "../components/RepositoryItem/RepositoryItem";
import styles from "./RepositoryListPage.module.css";

export default function ListOfRepositories() {
  const [dataOfRepos, setDataOfRepos] = useState<Repository[]>([]);
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
      setDataOfRepos((prevData) => [
        ...prevData,
        ...data.items.filter(
          (newItem: { id: number }) => !prevData.some((item) => item.id === newItem.id),
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

  return (
    <div className={styles["repository-wrapper"]}>
      {dataOfRepos.map((repoItem, index) => {
        return <RepositoryItem key={repoItem.id} repo={repoItem} index={index + 1} />;
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
}
