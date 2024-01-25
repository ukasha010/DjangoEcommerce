import React from 'react'
import Item from '../components/item'

const Products = ({ AllProducts }) => {
  return (
    <div className='text-center font-semibold bg-gray-800 text-yellow-500'>
      <h1>Dress</h1>
      {console.log(AllProducts)}
      <div className='grid grid-cols-4 gap-4 p-10'>
        {AllProducts.data.map((element) => (
          <Item
            data={element} />
        ))}
      </div>
    </div>
  )
}

export default Products