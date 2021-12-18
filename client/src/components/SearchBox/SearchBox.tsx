import './SearchBox.less';

export type SearchBoxProps = {
  onSearch: (search: string) => void;
}

// TODO: debounce
const SearchBox : React.FC<SearchBoxProps> = ({ onSearch }) => {
  return (
    <input className="search-box" type="text" placeholder="Search..." onChange={(e) => onSearch(e.target.value)}/>
  );
};

export default SearchBox;
