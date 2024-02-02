import React from 'react'
import { apiLinks } from '../api_links'
import styled from 'styled-components'
//import axios from 'axios'

interface apiProps {
  name: string
  date: string
  countryCode: string
}

const UsHolidays = () => {
  const [apiData, setApiData] = React.useState<apiProps[]>([])

  React.useEffect(() => {
    fetchDataApi()
  }, [])

  //*fetching the api data using async await
  //   const fetchDataApi = async () => {
  //     try {
  //       const response = await fetch(apiLinks)
  //       const data = await response.json()
  //       setApiData(data)
  //     } catch (error) {
  //       console.log('Something Went Wrong Please Try Again', error)
  //     }
  //   }

  //!fetching the api data using axios
  //   const fetchDataApi = () => {
  //     axios.get(apiLinks)
  //       .then((response) => {
  //         const fetchData = response.data
  //         setApiData(fetchData)
  //       })
  //       .catch((error) => {
  //         console.error('Something Went Wrong', error)
  //       })
  //   }

  //!fetching the api data using fetch Promises
  const fetchDataApi = () => {
    fetch(apiLinks)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No Response From the server')
        }
        return response.json()
      })
      .then((fetchedData) => {
        setApiData(fetchedData)
      })
      .catch((error) => {
        console.error('No data found', error)
      })
  }

  //!function to change the date format
  function changeDateFormat(dateString: string | number | Date) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <HolidaysWrapper>
      {apiData && apiData.length > 0 && (
        <h1>Public Holidays {apiData[0].countryCode}</h1>
      )}

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Holiday Type</th>
          </tr>
        </thead>

        <tbody>
          {apiData &&
            apiData?.map((info, index) => (
              <tr key={index}>
                <td>{changeDateFormat(info.date)}</td>
                <td>{info.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </HolidaysWrapper>
  )
}

export default UsHolidays

const HolidaysWrapper = styled.div`
    font-size: 1.2rem;
    h1 {
        margin-top: 3rem;
        text-align: center;
    }
    table {
        border-collapse: collapse;
        margin: auto
        width: 100%;
    }
    th {
        background-color: #f2f2f2;
        border: 1px solid red;
        padding: 8px;
    }
    td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }
`
