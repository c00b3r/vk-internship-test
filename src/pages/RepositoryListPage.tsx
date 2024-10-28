import { useEffect, useState } from "react";

export default function ListOfRepositories() {
  const [dataOfRepos, setDataOfRepos] = useState([]);

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

  console.log(dataOfRepos);
  return <div>lol</div>;
}
