import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {id, title, brand, imageUrl, rating, price} = productData

  return (
    //   Wrap with Link from react-router-dom
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <button className="Button" type="button">
          <img src={imageUrl} alt="product" className="thumbnail" />
        </button>
      </Link>
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}
export default ProductCard
