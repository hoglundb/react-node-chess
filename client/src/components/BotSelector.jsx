import React from "react";
import styles from "../styles/BotSelector.module.css";

const bots = [
  { id: "bot1", name: "Bruton Gaster", rating: 900, level: 1, image: "/bots/Avatar1.png" },
  { id: "bot2", name: "Miss Whittlebury", rating: 1200, level: 2, image: "/bots/Avatar2.png" },
  { id: "bot3", name: "Homeskillet", rating: 1500, level: 3, image: "/bots/Avatar3.png" },
  { id: "bot4", name: "Earnest Lambert Watkins", rating: 1800, level: 4, image: "/bots/Avatar4.png" },
  { id: "bot5", name: "Felicia Fancybottom", rating: 2000, level: 6, image: "/bots/Avatar5.png" },
  { id: "bot6", name: "Ghee Buttersnaps aka “The Heater”", rating: 2400, level: 8, image: "/bots/Avatar6.png" },
];

export default function BotSelector({ value, onChange }) {
  return (
    <div>
      <div className={styles.botSelectorWrapper}>
  <div className={styles.BotSelector}>
    {bots.map((bot) => (
      <div
        key={bot.id}
        className={`${styles.botCard} ${value === bot.level ? styles.selected : ""}`}
        onClick={() => onChange(bot.level)}
      >
        <img src={bot.image} alt={bot.name} />
        <div className={styles.botInfo}>
          <strong>{bot.name}</strong>
          <div>FIDE Rating: {bot.rating}</div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

