
import Typography from '@/components/shared/typography'
import NavBar from '@/components/shared/NavBar'

const Home = () => {
  return (
    <div>
      <NavBar>
      <h1 className="text-xl font-bold">Netflix</h1>
      <div>
        <button className="bg-red-600 px-4 py-2 rounded-lg">Sign In</button>
      </div>
    </NavBar>
      <Typography size="text-xl" weight="font-bold" color="text-white">
          The best movies and TV shows, all in one place.
        </Typography>

        <Typography size="text-lg" weight="font-normal" color="text-gray-300">
          Watch anywhere. Cancel anytime.
        </Typography>

        <Typography size="text-md" weight="font-light" color="text-gray-500">
         Ready to watch? Enter your email to create or restart your membership.
        </Typography>
    </div>
    
  )
}

export default Home