import SearchIcon from "@mui/icons-material/Search";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={style.searchBarContainer}>
      <SearchIcon className={style.searchIcon} />
      <input className={style.searchBar} placeholder="Search..." type="text" />
    </div>
  );
};

export default SearchBar;
