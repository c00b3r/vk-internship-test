import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ListOfRepositories } from "./pages/RepositoryListPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ListOfRepositories />
  </StrictMode>,
);
