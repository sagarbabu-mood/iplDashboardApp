import './index.css'

const MatchCard = props => {
  console.log(props)
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  const a = matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`match-status ${a}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
