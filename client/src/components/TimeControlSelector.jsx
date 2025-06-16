import React from "react";
import styles from "../styles/TimeControlSelector.module.css";

export default function TimeControlSelector({ value, onChange }) {
  return (
    <div className={styles.container}>
      <label htmlFor="time-select" className={styles.label}>
        Time Control
      </label>
      <select
        id="time-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={2}>2 minutes</option>
        <option value={3}>3 minutes</option>
        <option value={5}>5 minutes</option>
        <option value={10}>10 minutes</option>
      </select>
    </div>
  );
}
