import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {teamMatches: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/ipl/${id}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const recentMatchesFormattedData = data.recent_matches.map(
      eachRecentMatch => ({
        competingTeam: eachRecentMatch.competing_team,
        competingTeamLogo: eachRecentMatch.competing_team_logo,
        date: eachRecentMatch.date,
        firstInnings: eachRecentMatch.first_innings,
        id: eachRecentMatch.id,
        manOfTheMatch: eachRecentMatch.man_of_the_match,
        matchStatus: eachRecentMatch.match_status,
        result: eachRecentMatch.result,
        secondInnings: eachRecentMatch.second_innings,
        umpires: eachRecentMatch.umpires,
        venue: eachRecentMatch.venue,
      }),
    )
    const latestMatchDetails = data.latest_match_details
    const latestMatchDetailsFormattedData = {
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      id: latestMatchDetails.id,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
      result: latestMatchDetails.result,
      secondInnings: latestMatchDetails.second_innings,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
    }

    const teamBannerUrl = data.team_banner_url
    const formattedData = {
      recentMatchesFormattedData,
      latestMatchDetailsFormattedData,
      teamBannerUrl,
    }
    this.setState({teamMatches: formattedData, isLoading: false})
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading, teamMatches} = this.state
    const {
      latestMatchDetailsFormattedData,
      recentMatchesFormattedData,
      teamBannerUrl,
    } = teamMatches
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div className="responsive-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch latestMatchDetails={latestMatchDetailsFormattedData} />
            <ul className="recent-matches-list">
              {recentMatchesFormattedData.map(eachMatch => (
                <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
