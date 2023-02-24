import './index.css'

import Header from '../Header'

const NotFound = () => (
  <div>
    <Header />
    <div className="nf-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="f-img"
      />
      <h1 className="f-head">Page Not Found</h1>
      <p className="f-para">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
