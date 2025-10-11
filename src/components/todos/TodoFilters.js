import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch, MdFilterList, MdSort } from 'react-icons/md';
import { FILTER_TYPES, SORT_TYPES } from '../../types/todo';
import useDebounce from '../../hooks/useDebounce';

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing['2xl']};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.backgroundTertiary};
  color: ${({ theme, $active }) => ($active ? 'white' : theme.colors.text)};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primaryHover : theme.colors.border};
  }
`;

/**
 * TodoFilters Component
 * Advanced filtering and sorting controls
 */
const TodoFilters = React.memo(({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  sortType,
  onSortChange,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  React.useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  return (
    <FilterContainer>
      <SearchBar>
        <SearchIcon size={20} />
        <SearchInput
          type="text"
          value={localSearch}
          onChange={handleSearchChange}
          placeholder="Search todos..."
          aria-label="Search todos"
        />
      </SearchBar>

      <FilterTabs>
        <FilterTab
          $active={filterType === FILTER_TYPES.ALL}
          onClick={() => onFilterChange(FILTER_TYPES.ALL)}
        >
          All
        </FilterTab>
        <FilterTab
          $active={filterType === FILTER_TYPES.ACTIVE}
          onClick={() => onFilterChange(FILTER_TYPES.ACTIVE)}
        >
          Active
        </FilterTab>
        <FilterTab
          $active={filterType === FILTER_TYPES.COMPLETED}
          onClick={() => onFilterChange(FILTER_TYPES.COMPLETED)}
        >
          Completed
        </FilterTab>
        <FilterTab
          $active={filterType === FILTER_TYPES.TODAY}
          onClick={() => onFilterChange(FILTER_TYPES.TODAY)}
        >
          Today
        </FilterTab>
        <FilterTab
          $active={filterType === FILTER_TYPES.WEEK}
          onClick={() => onFilterChange(FILTER_TYPES.WEEK)}
        >
          This Week
        </FilterTab>
        <FilterTab
          $active={filterType === FILTER_TYPES.OVERDUE}
          onClick={() => onFilterChange(FILTER_TYPES.OVERDUE)}
        >
          Overdue
        </FilterTab>
      </FilterTabs>

      <FilterRow>
        <FilterGroup>
          <FilterLabel>
            <MdSort size={16} />
            Sort By
          </FilterLabel>
          <Select value={sortType} onChange={(e) => onSortChange(e.target.value)}>
            <option value={SORT_TYPES.DATE_CREATED}>Date Created</option>
            <option value={SORT_TYPES.DATE_UPDATED}>Date Updated</option>
            <option value={SORT_TYPES.DUE_DATE}>Due Date</option>
            <option value={SORT_TYPES.PRIORITY}>Priority</option>
            <option value={SORT_TYPES.ALPHABETICAL}>Alphabetical</option>
          </Select>
        </FilterGroup>
      </FilterRow>
    </FilterContainer>
  );
});

TodoFilters.displayName = 'TodoFilters';

export default TodoFilters;
