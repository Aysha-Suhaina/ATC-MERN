import { assets } from '../../assets/assets'
import "./Home.css"
import Login from './Login'
const Home = () => {
  return (
    <div className="homepage-div">
      <div className="homeContainer"> 
        <div className="login-div">
          <Login />
        </div>
        <div className="bg-img">
          <img src={assets.school_bg} alt="bg" />
        </div>
      </div>
    </div>
  )
}
export default Home
