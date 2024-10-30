import { useState } from "react";
import { Repository } from "../../interface";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";

interface RepositoryItemProps {
  repo: Repository;
  onEdit: (id: number, updatedData: Partial<Repository>) => void;
  onDelete: (id: number) => void;
}

export const RepositoryItem = ({ repo, onEdit, onDelete }: RepositoryItemProps) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(repo.name);
  const [description, setDescription] = useState(repo.description);
  const [htmlUrl, setHtmlUrl] = useState(repo.html_url);

  const handleSave = () => {
    onEdit(repo.id, { name, description, html_url: htmlUrl });
    setEdit(false);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, marginBottom: 3, padding: 2, borderRadius: 2 }}>
      <CardContent>
        {edit ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Название"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Описание"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              fullWidth
              label="Ссылка"
              variant="outlined"
              value={htmlUrl}
              onChange={(e) => setHtmlUrl(e.target.value)}
            />
          </Box>
        ) : (
          <>
            <Typography variant="h5">{repo.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {repo.description}
            </Typography>
            <Link href={repo.html_url} target="_blank" color="primary">
              Ссылка
            </Link>
          </>
        )}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={edit ? handleSave : () => setEdit(true)}
          color={edit ? "success" : "primary"}
        >
          {edit ? "Сохранить" : "Редактировать"}
        </Button>
        <Button variant="contained" onClick={() => onDelete(repo.id)} color="error">
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};
