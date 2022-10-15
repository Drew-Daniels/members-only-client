import Navbar from "../Navbar";
import Main from '../Main';
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <div className='min-h-screen p-10 pt-5 h-100 bg-[#0f1729] relative flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <Navbar />
        <Main>
          {children}
        </Main>
        <Footer />
      </div>
    </div>
)}