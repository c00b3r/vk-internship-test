import { Repository } from "../../interface";
import styles from "./RepositoryItem.module.css";

export default function RepositoryItem({ repo }: { repo: Repository }) {
  return (
    <div key={repo.id} className={styles["repository-container__item"]}>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <a>{repo.url}</a>
      <div className={styles["button-container"]}>
        <button className={styles["button-container__edit-button"]}>Редактировать</button>
        <button className={styles["button-container__delete-button"]}>Удалить</button>
      </div>
    </div>
  );
}
