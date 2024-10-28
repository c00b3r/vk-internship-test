import { Repository } from "../../interface";

export default function RepositoryItem({ repo }: { repo: Repository }) {
  return (
    <div
      key={repo.id}
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <a>{repo.url}</a>
      <div
        className="button-container"
        style={{ display: "flex", gap: "5px", justifyContent: "center" }}
      >
        <button
          style={{
            background: "green",
            borderRadius: "8px",
          }}
        >
          Редактировать
        </button>
        <button
          style={{
            background: "red",
            borderRadius: "8px",
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
