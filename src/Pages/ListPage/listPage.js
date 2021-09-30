import {  useState, useEffect } from "react";
import "./listPage.css";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import { Header, SubmitLink, LinkItem } from "../../Components"
import {useSelector, useDispatch} from 'react-redux';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

const options = [
  { value: 'MostVoted', label: 'Most Voted (Z A)' },
  { value: 'LessVoted', label: 'Less Voted (A Z)' },
];

const ListPage = () => {
  const dispatch = useDispatch();
  const addLinkPageState = useSelector((state) => state.addLinkPage);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange  = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  const addLinkResultLinkName = [];

  const preparedAddLinkResult = addLinkPageState?.addLinkResult?.map((addLinkResultItem) => {
        if (!addLinkResultLinkName.includes(addLinkResultItem.linkName)) {
          addLinkResultLinkName.push(addLinkResultItem.linkName);
          const count = addLinkPageState?.addLinkResult?.filter(
            (innerAddLinkResultItem) => innerAddLinkResultItem.linkName === addLinkResultItem.linkName
          ).length;

          return {
            ...addLinkResultItem,
            points: count,
          };
        }
      })
      .filter((filterItem) => filterItem);

    const itemList = preparedAddLinkResult.slice().reverse()
    const sortedMostList = preparedAddLinkResult.slice().sort((a,b) =>  b.points - a.points );
    const sortedMostListCopy = preparedAddLinkResult.slice().sort((a,b) =>  b.points - a.points );
    const sortedLessList = sortedMostListCopy.reverse()

    const [items, setItems] = useState([]);
    const [sortedMostItems, setSortedMostItems] = useState([]);
    const [sortedLessItems, setSortedLessItems] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
      setItems(itemList.slice());
      setSortedMostItems(sortedMostList.slice());
      setSortedLessItems(sortedLessList.slice());
    }, [addLinkPageState?.addLinkResult]);

    const itemsPerPage = 5;
    const pagesVisited = pageNumber * itemsPerPage;

    const displayItemsFunction = (param) => {
      const linkItemList =
      param
      .slice(pagesVisited, pagesVisited + itemsPerPage)
      .map((item) => 
          <LinkItem item={item} key={item.name}/>
      );
      return linkItemList
    }

    displayItemsFunction(items);
    displayItemsFunction(sortedMostItems);
    displayItemsFunction(sortedLessItems);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="list-page-container">
      <Header />
      <SubmitLink />
      <div className="select-container">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder={"Order By"}
        />
      </div>
    <div>
      {
        selectedOption?.value === "MostVoted" ? ( displayItemsFunction(sortedMostItems) )
      : selectedOption?.value === "LessVoted" ? ( displayItemsFunction(sortedLessItems) )
      : displayItemsFunction(items)
      }
      {preparedAddLinkResult.length !== 0 ?(
      <ReactPaginate
        previousLabel={<KeyboardArrowLeft/>}
        nextLabel={<KeyboardArrowRight/>}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination-bttns"}
        activeClassName={"pagination-active"}
      />
      ):(
        <div>
        </div>
      )}
      </div>
  </div>
  );
}

export default ListPage