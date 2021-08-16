import { search, save, load } from './services/charachters';
import { debounce } from 'lodash';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Charachters from './components/Charachters';
import Search from './components/Search';
import Pagination from './components/Pagination';

function App() {

  const [charachters, setCharachters] = useState([]);

  const [filter, setFilter] = useState({
    page: 0,
    searchTerm: ''
  });

  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 0,
    total: 0
  })

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {

    setLoaded(false);

    if (filter.searchTerm.length === 0) {
      const data = load();
      setCharachters(data);
      setPageInfo({
        page: 0,
        size: 0,
        totla: 0
      })
      setLoaded(true);
      return;
    }

    const getCharachters = async () => {
      const data = await search(filter.searchTerm, filter.page)
      setCharachters(data.charachters)
      setPageInfo(data.pageInfo)
      setLoaded(true);
    }

    return getCharachters()

  }, [filter])


  const saveCharacter = (charachter) => {
    save(charachter);
    setCharachters(charachters.map(el =>
      el.id === charachter.id ? { ...el, bookmark: !charachter.bookmark } : el
    ))
  }

  const onFilterUpdate = useCallback(
    newFilter => {
      if(newFilter.searchTerm) {
        setFilter({
          searchTerm: newFilter.searchTerm,
          page: 0
        })
      } else {
        setFilter((prevValue) => {
          return {
            ...prevValue,
            ...newFilter
          }
        })
      }
    },
    [setFilter]
  )

  const debouncedFilterUpdate = useMemo(
    () =>
      debounce(val => {
        onFilterUpdate(val)
      }, 500),
    [onFilterUpdate]
  )

  const updateFilter = useCallback(
    value => {
      debouncedFilterUpdate(value)
    },
    [debouncedFilterUpdate]
  )

  return (
    <div>
      <Search onSearchTermChange={updateFilter} />
      {
        !loaded && <p>I'm fetching data for you</p>
      }
      {
        charachters.length > 0 && loaded
          ? <Charachters charachters={charachters} onBookmark={saveCharacter} />
          : <p>Nothing to see here ...</p>
      }
      {
        pageInfo.total > 0 && loaded && <Pagination page={pageInfo.page} 
        size={pageInfo.size} 
        total={pageInfo.total} 
        onPageChange={onFilterUpdate} />
      }
    </div>
  );


}

export default App;
