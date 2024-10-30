import { useCallback, useEffect, useState } from "react";
import { Repository } from "../interface";
import { RepositoryItem } from "../components/RepositoryItem/RepositoryItem";
import styles from "./RepositoryListPage.module.css";
import { observer } from "mobx-react-lite";
import repositoryStore from "../store/RepositoryStore";
import { Box, CircularProgress } from "@mui/material";
import SortItemBar from "../components/SortItemsBar/SortItemsBar";

export const ListOfRepositories = observer(() => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [haveMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState("stars");
  const [order, setOrder] = useState("desc");

  const token = import.meta.env.VITE_TOKEN;

  const getReposData = useCallback(async () => {
    if (loading || error || !haveMoreData) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=javascript&sort=${sort}&order=${order}&page=${page}&per_page=30`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error(`${response.status}`);
      const data = await response.json();
      repositoryStore.setRepository(
        page === 1
          ? data.items
          : [
              ...repositoryStore.repositoryData,
              ...data.items.filter(
                (newItem: { id: number }) =>
                  !repositoryStore.repositoryData.some((item) => item.id === newItem.id),
              ),
            ],
      );
      setHasMoreData(data.items.length > 0);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [error, haveMoreData, loading, order, page, sort, token]);

  const scroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    repositoryStore.setRepository([]);
  }, [sort, order]);

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
    <div>
      <SortItemBar sort={sort} order={order} onSort={setSort} onOrder={setOrder} />
      <div className={styles["repository-wrapper"]}>
        {repositoryStore.repositoryData.map((repoItem) => {
          return (
            <RepositoryItem
              key={repoItem.id}
              repo={repoItem}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        })}
        <Box display={"flex"} justifyContent={"center"} mt={3} minHeight="40px" alignItems="center">
          {loading && !error && (
            <Box display="flex" justifyContent="center" mt={3} margin={0}>
              <CircularProgress />
            </Box>
          )}
          {!haveMoreData && <p>Больше репозиториев не найдено.</p>}
          {error && (
            <div className={styles["error-container"]}>
              <h3>Ошибка получения данных</h3>
              <button onClick={() => setError(false)}>Повторить</button>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
});
