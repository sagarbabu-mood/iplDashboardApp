import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teams: {}, isLoading: true}

  componentDidMount() {
    this.getTeamCards()
  }

  getTeamCards = async () => {
    const url = 'https://apis.ccbp.in/ipl'
    const response = await fetch(url)
    const data = await response.json()
    const formattedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teams: formattedData, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state
    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>

          {isLoading ? (
            <div data-testid="loader" className="loader-container">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
            </div>
          ) : (
            <ul className="teams-list">
              {teams.map(eachTeam => (
                <TeamCard teamDetails={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
