import {BsFilterRight} from 'react-icons/bs'
import './index.css'

const SortByOption = props => {
  const onChangeSortBy = event => {
    const {changeSortBy} = props
    changeSortBy(event.target.value)
  }
  const {sortByOptions, activeOptionId} = props
  return (
    <div className="sort-by-container">
      <BsFilterRight className="sort-by-icon" />
      <p className="sort-by">Sort by</p>
      <select
        className="sort-by-select"
        value={activeOptionId}
        onChange={onChangeSortBy}
      >
        {sortByOptions.map(eachOption => (
          <option
            key={eachOption.optionId}
            value={eachOption.optionId}
            className="select-option"
          >
            {eachOption.displayText}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortByOption
