import { useState } from "react";
import { Repository } from "../../interface";
import styles from "./RepositoryItem.module.css";

interface RepositoryItemProps {
  repo: Repository;
  index: number;
  onEdit: (id: number, updatedData: Partial<Repository>) => void;
  onDelete: (id: number) => void;
}

export const RepositoryItem = ({ repo, index, onEdit, onDelete }: RepositoryItemProps) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(repo.name);
  const [description, setDescription] = useState(repo.description);
  const [htmlUrl, setHtmlUrl] = useState(repo.html_url);

  const handleSave = () => {
    onEdit(repo.id, { name, description, html_url: htmlUrl });
    setEdit(false);
  };

  return (
    <div className={styles["repository-container__item"]}>
      {edit ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
          <input value={htmlUrl} onChange={(e) => setHtmlUrl(e.target.value)} />
        </>
      ) : (
        <>
          <p>{index}</p>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <a href={repo.html_url} target="_blank">
            Ссылка
          </a>
        </>
      )}

      <div className={styles["button-container"]}>
        <button
          className={styles["button-container__edit-button"]}
          onClick={edit ? handleSave : () => setEdit(true)}
        >
          {edit ? "Сохранить" : "Редактировать"}
        </button>
        <button
          className={styles["button-container__delete-button"]}
          onClick={() => onDelete(repo.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
