import React, { useState } from 'react';
import './App.css';

const SearchApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)
  const [searchRes, setSearchRes] = useState<any>([])
  const [searchVal, setSearchVal] = useState<string | null>(null)

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value)
    // fetch data from github search api
    fetch(`https://api.github.com/search/repositories?q=${event.target.value}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          setSearchRes(data.items)
        }
      })
  }

  const nextPage = () => {
    indexOfLastRecord < searchRes.length && setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1)
  }

  return (
    <div className="App">
      <div className="App-container">
        <h3>Github Repository Search</h3>
        <input placeholder="search here..." onChange={handleSearch} />
        {searchRes && !!searchRes.length && <p>Showing github repositories for: <b><i>{searchVal}</i></b></p>}
        {searchRes && !!searchRes.length ? (
          <table className='App-table'>
            <thead>
              <tr>
                <th>id</th>
                <th>url</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {searchRes.slice(indexOfFirstRecord, indexOfLastRecord).map((val: { id: number, description: string, html_url: string }, index: number) => (
                <tr key={val.id}>
                  <td>
                    {indexOfFirstRecord+index+1}
                  </td>
                  <td className='App-table-url'>
                    <a className="App-link" href={val.html_url} target="_blank" rel="noopener noreferrer">{val.html_url}</a>
                  </td>
                  <td>
                    {val.description}
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>) : (
          <p>No Results Found</p>
        )}
        <div className='App-page-control'>
          <a onClick={prevPage} href='#'>previous</a>
          <a onClick={nextPage} href='#'>next</a>
        </div>
      </div>
    </div>
  );
}

export default SearchApp;
