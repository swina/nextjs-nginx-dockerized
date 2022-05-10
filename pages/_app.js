import '../styles/global.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function MyApp({ Component, pageProps }) {
  return (
      <>
        <Navbar/>
        <div className="mt-20 container mx-auto">
        <Component {...pageProps} />
        </div>
        <Footer/>
      </>
  )
}

export default MyApp