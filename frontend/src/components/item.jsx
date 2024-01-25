import React from 'react'
import { useNavigate } from 'react-router-dom'

const Item = ({ data }) => {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/buyprod')} className='overflow-hidden items-center text-center w-[20rem] h-[31rem]'>
      <img src="/d1.jpeg" alt="" />
      <h2>{data.product_name}</h2>
      <h2>{data.price}</h2>
    </div>
  )
}

export default Item