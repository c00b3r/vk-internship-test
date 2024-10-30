import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RepositoryItem } from "../../components/RepositoryItem/RepositoryItem";
import { Repository } from "../../interface";

describe("RepositoryItem", () => {
  const mockRepo: Repository = {
    id: 1,
    name: "Test Repository",
    description: "This is a test repository",
    html_url: "https://github.com/test/repo",
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    render(
      <RepositoryItem repo={mockRepo as Repository} onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );
  });

  it("should render correct", () => {
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ссылка/i })).toHaveAttribute(
      "href",
      mockRepo.html_url,
    );
  });

  it("should call onEdit with updated values", () => {
    fireEvent.click(screen.getByText("Редактировать"));

    const newName = "Новое название";
    const newDescription = "Новое описание";
    const newHtmlUrl = "vk.com";

    fireEvent.change(screen.getByLabelText("Название"), { target: { value: newName } });
    fireEvent.change(screen.getByLabelText("Описание"), { target: { value: newDescription } });
    fireEvent.change(screen.getByLabelText("Ссылка"), { target: { value: newHtmlUrl } });

    fireEvent.click(screen.getByText("Сохранить"));

    expect(mockOnEdit).toHaveBeenCalledWith(mockRepo.id, {
      name: newName,
      description: newDescription,
      html_url: newHtmlUrl,
    });
  });

  it("should call onDelete", () => {
    fireEvent.click(screen.getByText("Удалить"));
    expect(mockOnDelete).toHaveBeenCalledWith(mockRepo.id);
  });
});
