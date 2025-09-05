import type { FC } from "react";
import { SearchInput } from "../../../shared/ui/search-input";
import { FilterDropdown } from "../../../shared/ui/filter-dropdown";
import { TaskFilter } from "../../../entities/task";
import styles from "./header.module.css";

type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

export const Header: FC<Props> = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
}) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>TODO LIST</h1>
      <div className={styles.controls}>
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Поиск задачи..."
        />
        <FilterDropdown
          value={filter}
          onChange={onFilterChange}
        />
      </div>
    </header>
  );
};
