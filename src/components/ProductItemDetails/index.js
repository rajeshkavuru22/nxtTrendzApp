import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    productItem: {},
    similarProductsList: [],
    count: 1,
    apiResponseStatus: '',
    isLoading: false,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const Url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    if (response.ok) {
      const data = await response.json()
      const productItem = {
        id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        description: data.description,
      }
      const similarProductsList = data.similar_products
      this.setState({
        productItem,
        similarProductsList,
        apiResponseStatus: true,
        isLoading: false,
      })
    } else {
      this.setState({apiResponseStatus: false, isLoading: false})
    }
  }

  productCard = each => {
    const Item = {
      id: each.id,
      imageUrl: each.image_url,
      title: each.title,
      brand: each.brand,
      rating: each.rating,
      price: each.price,
    }
    return (
      <li className="Item" key={Item.id}>
        <img src={Item.imageUrl} alt="similar product" className="product" />
        <h1 className="Heading">{Item.title}</h1>
        <p className="keyWord">by {Item.brand}</p>
        <div className="container">
          <p className="price">Rs {Item.price}/-</p>
          <div className="rating-container">
            <p className="rating">{Item.rating}</p>
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

  decreaseItems = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  increaseItems = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderProductDetailsView = () => {
    const {count, productItem, similarProductsList} = this.state
    const {
      imageUrl,
      title,
      price,
      brand,
      totalReviews,
      rating,
      availability,
      description,
    } = productItem
    return (
      <div className="Item-container">
        <div className="top-container">
          <img src={imageUrl} alt="product" className="image" />
          <div className="details-container">
            <h1 className="title">{title}</h1>
            <p className="price">RS {price}/-</p>
            <div className="rating-reviews-container">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews">{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p className="mentions">
              Available: <p className="keyWord">{availability}</p>
            </p>
            <p className="mentions">
              Brand: <p className="keyWord">{brand}</p>
            </p>
            <hr />
            <div className="count-container">
              <button
                className="btn"
                type="button"
                onClick={this.decreaseItems}
                testid="minus"
              >
                <BsDashSquare />
              </button>
              <p className="count">{count}</p>
              <button
                className="btn"
                type="button"
                onClick={this.increaseItems}
                testid="plus"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="button" type="button">
              ADD TO CART
            </button>
          </div>
        </div>

        <div className="products-container">
          <h1 className="Heading">Similar Products</h1>
          <ul className="items-container">
            {similarProductsList.map(each => this.productCard(each))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="BallTriangle" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="error-msg">Product Not Found</h1>
      <button className="button" type="button" onClick={this.continueShopping}>
        Continue Shopping
      </button>
    </div>
  )

  renderResults = () => {
    const {apiResponseStatus} = this.state
    if (apiResponseStatus) {
      return this.renderProductDetailsView()
    }
    return this.renderFailureView()
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="product-details-container">
          {isLoading ? this.renderLoader() : this.renderResults()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
