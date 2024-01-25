import React, { useState } from 'react'
import Categories from '../components/categories'
import Footer from '../components/footer'
import Dropzone from 'react-dropzone'
import Products from './products'
import Poster from '../components/poster'
import UserPoster from '../components/userPoster'
import Slideshow from '../components/slide'

function Home({ AllProducts }) {
  const [user, setUser] = useState('admin');

  return (
    <div >
      <Slideshow />
      <Categories />
      <Products AllProducts={AllProducts} />

      <Footer />
    </div>
  )
}

export default Home