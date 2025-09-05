import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowDownIcon } from "../../icons";
import { TaskFilter } from "../../../../entities/task";
import styles from "./filter-dropdown.module.css";

type Props = {
  value: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

const filterLabels: Record<TaskFilter, string> = {
  [TaskFilter.ALL]: "Все",
  [TaskFilter.COMPLETE]: "Завершенные",
  [TaskFilter.INCOMPLETE]: "Незавершенные",
};

export const FilterDropdown: FC<Props> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterSelect = (filter: TaskFilter) => {
    onChange(filter);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.filterText}>
          {filterLabels[value].toUpperCase()}
        </span>
        <ArrowDownIcon
          className={`${styles.arrowIcon} ${
            isOpen ? styles.arrowUp : styles.arrowDown
          }`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {Object.values(TaskFilter).map((filter) => (
            <button
              key={filter}
              className={`${styles.dropdownItem} ${
                filter === value ? styles.dropdownItemActive : ""
              }`}
              onClick={() => handleFilterSelect(filter)}
              type="button"
            >
              {filterLabels[filter]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
