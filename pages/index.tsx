import { Player, uniqueCountries, top100Players } from "../lib/players"

type HomeProps = {
  players: Player[];
  countries: string[];
}

export default function Home({ players, countries } : HomeProps) {
  const player = players[0]

  return (
    <div className="bg-blue-500">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Tennis Trivia - Next.js Netlify</span>
        </h2>

        <div>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            What country is the following tennis player from?
          </p>
          <h2 className="text-lg font-extrabold text-white my-5">
            Roger Federer
          </h2>

          <form>
            <input
                list="countries"
                type="text"
                className="p-2 outline-none"
                placeholder="Choose Country"
            />
            <datalist id="countries">
              <option>Switzerland</option>
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

          <p className="mt-4 text-lg leading-6 text-white">
            <strong>Current score:</strong> 0
          </p>
        </div>

      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random())
  const players = randomizedPlayers.slice(0, 5)

  return {
    props: {
      players,
      countries: uniqueCountries,
    },
  };
}
