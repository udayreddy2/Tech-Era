import './index.css'

import {Link} from 'react-router-dom'

const Header = () => (
  <div className="header-cont">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="img-header"
      />
    </Link>
  </div>
)

export default Header
