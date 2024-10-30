import { MenuItem, Select } from "@mui/material";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  sort: string;
  order: string;
  onSort: (value: string) => void;
  onOrder: (value: string) => void;
}

export default function SearchBar({ sort, order, onSort, onOrder }: SearchBarProps) {
  return (
    <div className={styles["search-bar"]}>
      <Select
        size="small"
        sx={{ width: 150 }}
        value={sort}
        onChange={(e) => onSort(e.target.value as string)}
      >
        <MenuItem value="stars">По рейтингу</MenuItem>
        <MenuItem value="created">По дате</MenuItem>
        <MenuItem value="name">По названию</MenuItem>
      </Select>
      <Select
        size="small"
        sx={{ width: 150 }}
        value={order}
        onChange={(e) => onOrder(e.target.value as string)}
      >
        <MenuItem value="asc">По возрастанию</MenuItem>
        <MenuItem value="desc">По убыванию</MenuItem>
      </Select>
    </div>
  );
}
