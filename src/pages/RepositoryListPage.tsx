import { useEffect, useState } from "react";
import { Repository } from "../interface";
import RepositoryItem from "../components/RepositoryItem/RepositoryItem";

export default function ListOfRepositories() {
  const [dataOfRepos, setDataOfRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const token = import.meta.env.VITE_TOKEN;
    async function getReposData() {
      try {
        const response = await fetch("https://api.github.com/search/repositories?q=javascript", {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
        });
        const data = await response.json();
        setDataOfRepos(data.items);
      } catch (error) {
        console.log(error);
      }
    }

    getReposData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {dataOfRepos.map((repoItem) => {
        return <RepositoryItem key={repoItem.id} repo={repoItem} />;
      })}
    </div>
  );
}
