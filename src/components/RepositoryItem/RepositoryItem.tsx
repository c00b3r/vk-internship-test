import { Repository } from "../../interface";
import styles from "./RepositoryItem.module.css";

export const RepositoryItem = ({ repo, index }: { repo: Repository; index: number }) => {
  return (
    <div className={styles["repository-container__item"]}>
      <p>{index}</p>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <a href={repo.html_url} target="_blank">
        Ссылка
      </a>
      <div className={styles["button-container"]}>
        <button className={styles["button-container__edit-button"]}>Редактировать</button>
        <button className={styles["button-container__delete-button"]}>Удалить</button>
      </div>
    </div>
  );
};
