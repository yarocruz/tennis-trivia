import { Player, uniqueCountries, top100Players } from "../lib/players"
import { useState } from "react";

type HomeProps = {
  players: Player[];
  countries: string[];
}

export default function Home({ players, countries } : HomeProps) {
  const [score, setScore] = useState(0)
  const [pickedCountry, setPickedCountry] = useState("")
  const [status, setStatus] = useState(null)

  // state for logic to have 5 tries
  const [currentStep, setCurrentStep] = useState(0)
  const [playerData, setPlayerData] = useState(players)

  // current tennis player, which it starts at players[0]
  const player = playerData[currentStep]

  // function checks if the country selected is the country where current player (players[0]) is from
  const guessCountry = () => {
    if (player.country.toLocaleLowerCase() === pickedCountry.toLocaleLowerCase()) {
      setStatus({ status: "correct", country: player.country})
      setScore(score + 1)
    } else {
      alert('incorrect')
      setStatus({ status: "incorrect", country: player.country})
    }
  }

  // selects next player by using the currentStep as the index number for playerData
  const nextPlayer = () => {
    setPickedCountry("")
    setCurrentStep(currentStep + 1)
    setStatus(null)
  }

  // logic to restart the game
  const playAgain = async () => {
    // reset state of countries and playerData
    setPickedCountry("")
    setPlayerData([])
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/newGame"
    );

    const data = await response.json()
    setPlayerData(data.players)
    setCurrentStep(0)
    setScore(0)
  }

  return (
    <div className="bg-blue-500">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Tennis Trivia - Next.js Netlify</span>
        </h2>

        {/* if we're still within the 5 tennis players render the jsx below */}
        {player ? (
            <div>
              <p className="mt-4 text-lg leading-6 text-blue-200">
                What country is the following tennis player from?
              </p>
              <h2 className="text-lg font-extrabold text-white my-5">
                {player.full_name}
              </h2>

              {/* conditional here to render elements only if status is truthy, basically once you select a country */}
              {status && (
                  <div className="mt-4 text-lg leading-6 text-white">
                    <p>
                      You are {status.status}. It is {status.country}
                    </p>
                    <p>
                      <button
                          autoFocus
                          onClick={nextPlayer}
                          className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
                      >
                        Next Player
                      </button>
                    </p>
                  </div>
              )}

              {/* making sure the input field doesn't show when we select a country with !status*/}
              {!status && (
                  <form
                      onSubmit={(event => {
                        event.preventDefault()
                        guessCountry()
                      })}
                  >
                    <input
                        list="countries"
                        type="text"
                        value={pickedCountry}
                        onChange={(event => setPickedCountry(event.target.value))}
                        className="p-2 outline-none"
                        placeholder="Choose Country"
                    />
                    <datalist id="countries">
                      {countries.map((country, i) => (
                          <option key={i}>{country}</option>
                      ))}
                    </datalist>
                    <p>
                      <button
                          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
                          type="submit"
                      >
                        Guess
                      </button>
                    </p>
                  </form>
              )}


              <p className="mt-4 text-lg leading-6 text-white">
                <strong>Current score:</strong> {score}
              </p>
            </div>
        ) : (
           // else if player is undefined, falsy, render this jsx
            <div>
              <button
                  autoFocus
                  onClick={playAgain}
                  className="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
              >
                Play Again
              </button>
            </div>
        )}


      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random())
  // cut it down to just 5 tennis players
  const players = randomizedPlayers.slice(0, 5)

  return {
    props: {
      players,
      countries: uniqueCountries,
    },
  };
}
