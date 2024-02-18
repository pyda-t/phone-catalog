import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useState,
  memo,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import debounce from 'lodash.debounce';

// Styles
import './Search.scss';

// Icons
import { ReactComponent as SearchIcon } from './assets/search.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';

type Props = {
  withBorder?: boolean;
};

export const Search: FunctionComponent<Props> = memo(({ withBorder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(searchQuery);
  const [isFilled, setIsFilled] = useState(!!searchQuery);
  const params = new URLSearchParams(searchParams);
  const location = useLocation().pathname.slice(1);

  const deleteQuery = () => {
    params.delete('query');
    setSearchParams(params);
    setIsFilled(false);
  };

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        params.set('query', newQuery.toLowerCase());
        setSearchParams(params);
        setIsFilled(true);
      } else {
        deleteQuery();
      }
    }, 500),
    [location],
  );

  const queryHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setQuery(value.trimStart());
    applyQuery(value.trimStart());
  };

  const removeQuery = () => {
    setQuery('');
    deleteQuery();
  };

  return (
    <label className={cn(
      'Search',
      { 'Search--border': withBorder }
    )}>
      <input
        type="text"
        value={query}
        className={cn(
          'Search__Input', {
          'Search__Input--filled': isFilled,
        })}
        placeholder={`Search in ${location}...`}
        onChange={queryHandler}
      />

      {isFilled ? (
        <button
          className="Search__Button"
          type="button"
          onClick={removeQuery}
        >
          <Cross />
        </button>
      ) : (
        <SearchIcon />
      )}
    </label>
  );
})
