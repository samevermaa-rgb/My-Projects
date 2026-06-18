import Navbar from "@/app/_Component/Navbar"
import Hero from "@/app/_Component/Home"
import Footer from "@/app/_Component/Footer"
import WelcomeScreen from "@/app/_Component/WelcomeScreen"
export default function home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Footer/>
      <WelcomeScreen children={undefined}/>
    </>
  )
}