import type { FC } from "react";
import detectiveImage from "../../../../assets/check-footprint.png";
import styles from "./empty-state.module.css";

type Props = {
  message?: string;
};

export const EmptyState: FC<Props> = ({ message = "Здесь пусто" }) => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.illustration}>
        <img
          src={detectiveImage}
          alt="Детектив с лупой"
          className={styles.detectiveImage}
        />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
