"use client";

import React from "react";
import styles from "./SearchBar.module.css"; // CSS 파일 연결

interface SearchBarProps {
  isNight: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const SearchBar = ({ isNight, searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className={`${styles.searchContainer} ${isNight ? styles.night : ""}`}>
      <input
        type="text"
        placeholder="어떤 테스트를 찾으시나요?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <span className={styles.searchIcon}>🔍</span>
    </div>
  );
};

export default SearchBar;