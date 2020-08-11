import React, {useContext, useEffect} from 'react'
import { AppContext } from '../../context/app/AppContext'
import Store from './Store'

export default ({ match }) => {
  const {storeList, getStoresList,selCatName } = useContext(AppContext)
  
  useEffect(()=> {
    getStoresList(match.params.category)
  },[match.params.category])

  return (
    <div className='store-container'>
      <p className='sel-category-name'>{selCatName}</p>
      <div className='store-list'>
        {storeList.map(store => (
          <Store key={store.id} store={store} />
        ))}
      </div>
    </div>
  )
}
