import {Component} from 'react'

import './index.css'

import Loader from 'react-loader-spinner'

import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class CourseItem extends Component {
  state = {apiStatus: apiConstants.initial, courseItemObject: {}}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiConstants.progress})
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      const fetchedObject = {
        courseDetails: data.course_details,
      }
      const {courseDetails} = fetchedObject
      const newObject = {
        id: courseDetails.id,
        name: courseDetails.name,
        description: courseDetails.description,
        imageUrl: courseDetails.image_url,
      }
      this.setState({courseItemObject: newObject})
      this.setState({apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  viewSuccess = () => {
    const {courseItemObject} = this.state
    return (
      <div className="ci-success">
        <img
          src={courseItemObject.imageUrl}
          alt={courseItemObject.name}
          className="cl-img"
        />
        <div className="card-1">
          <h1 className="cl-head">{courseItemObject.name}</h1>
          <p className="cl-para">{courseItemObject.description}</p>
        </div>
      </div>
    )
  }

  retryButton = () => {
    this.getCourseList()
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

export default CourseItem
