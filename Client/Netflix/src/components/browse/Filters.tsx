
const Filters = () => {
  return (
    <div>
        <label>
            Select Your Preferences
            <select>
                <option>Original Language</option>
                <option>Dubbing</option>
            </select>
            <select>
                <option>English</option>
                <option>Hebrew</option>
            </select>
        </label>
        <label>
            Sort By
            <select>
                <option>Suggestions For You</option>
                <option>Top Rated</option>
                <option>Comedy</option>
                
            </select>
        </label>
    </div>
  )
}

export default Filters