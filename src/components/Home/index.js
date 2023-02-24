import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, techList: []}

  componentDidMount() {
    this.getTechList()
  }

  getTechList = async () => {
    this.setState({apiStatus: apiConstants.progress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const {courses} = data

      const fetchedArray = courses.map(e => ({
        id: e.id,
        name: e.name,
        logoUrl: e.logo_url,
      }))
      this.setState({techList: fetchedArray})
      this.setState({apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  viewSuccess = () => {
    const {techList} = this.state
    return (
      <div className="success-cont">
        <h1 className="s-head">Courses</h1>
        <ul className="s-l-cont">
          {techList.map(e => (
            <li key={e.id} className="li-item">
              <Link to={`/courses/${e.id}`}>
                <img src={e.logoUrl} alt={e.name} className="logo-img" />
                <div className="par">
                  <p className="p">{e.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  retryButton = () => {
    this.getTechList()
  }

  viewFailure = () => (
    <div className="f-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="f-img"
      />
      <h1 className="f-head">Oops! Something Went Wrong</h1>
      <p className="f-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="f-butt" onClick={this.retryButton}>
        Retry
      </button>
    </div>
  )

  viewRender = () => (
    <div className="loader-cont" data-testid="loader">
      <Loader type="ThreeDots" color="#1e293b" height={50} width={50} />
    </div>
  )

  allMethods = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.viewSuccess()
      case apiConstants.failure:
        return this.viewFailure()
      case apiConstants.progress:
        return this.viewRender()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.allMethods()}
      </div>
    )
  }
}

export default Home
