import React, { createContext } from 'react'
import useProduct from './API/ProductApi'

// creating context refernce
export const DataContext = createContext()

// super compoenent
function DataProvider(props) {

    const data = {
          productApi: useProduct()
    }

  return (
    <DataContext.Provider value={data} >
            {props.children}
    </DataContext.Provider>
  )
}

export default DataProvider
