import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
