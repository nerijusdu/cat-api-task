import './SearchBox.less';

export type SearchBoxProps = {
  onSearch: (search: string) => void;
}

const SearchBox : React.FC<SearchBoxProps> = ({ onSearch }) => {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search..." onChange={(e) => onSearch(e.target.value)}/>
    </div>
  );
};

export default SearchBox;
