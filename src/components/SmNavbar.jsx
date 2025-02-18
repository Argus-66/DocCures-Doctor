import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import emergency from '../assets/images/emergency.png'
import logo from '../assets/images/logo.png'
import user from '../assets/images/user.png'
import create from '../assets/images/create.png'
import login from '../assets/images/login.png'
import { Menu, X } from 'lucide-react'
import home from '../assets/images/home.png'
import homeBlack from '../assets/images/homeBlack.png'
import group from '../assets/images/group.png'
import groupBlack from '../assets/images/groupBlack.png'
import infoBlack from '../assets/images/info.png'
import info from '../assets/images/infoP.png'
import contact from '../assets/images/contact.png'
import contactBlack from '../assets/images/contactBlack.png'
import calendar from '../assets/images/calendar.png'
import calendarBlack from '../assets/images/calendarBlack.png'
import logoutIcon from '../assets/images/logout.png'
import IncomponentLoading from './IncomponentLoading'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutDoctor, clearAppointments } from '../redux/DoctorSlice.mjs'

function SmNavbar({ isAuthenticated }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  const server_url = import.meta.env.VITE_DOCCURES_SERVER_URL;
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const activeLink = 'text-primary font-bold w-full flex flex-row gap-3 items-center text-[19px] lg:text-[22px] cursor-pointer bg-white px-4 py-3 shadow-md shadow-darkGray rounded-2xl hover:text-primary transition-all hover:shadow-[#9f9fe9]'
  const inactiveLink = 'text-textp flex flex-row items-center text-[19px] lg:text-[21px] gap-3 w-full px-4 py-3 rounded-2xl font-semibold cursor-pointer hover:text-black hover:bg-white hover:rounded-2xl hover:px-2 hover:text-[20px] transition-all hover:shadow-[#9f9fe9] hover:shadow-md'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${server_url}/logout/doctor`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        dispatch(clearAppointments());
        dispatch(logoutDoctor());
        navigate('/')
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-full z-20'>
      <nav className='h-[65px] flex flex-row items-center md:w-full lg:w-[80%] shadow-md shadow-[#D6D6D6] rounded-3xl bg-[#ffffff] pr-3 justify-between relative'>
        <NavLink to='/' className='flex flex-row items-center h-full'>
          <img src={logo} className='h-[65px]' alt="Logo" />
          <h1 className='font-bold md:text-[24px] lg:text-[28px] text-[#1c2635]'>DocCures</h1>
        </NavLink>
        <button onClick={toggleMenu}>
          <Menu className='z-20 cursor-pointer text-primary' size={35} />
        </button>
        <div className={`fixed top-0 right-0 h-screen w-[220px] bg-softGray shadow-xl px-4 py-4 transition-transform duration-300 ease-in-out transform flex flex-col justify-between ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex flex-col gap-4'>
            <div className='w-full flex flex-row justify-end'>
              <X className='cursor-pointer text-textp hover:text-primary mt-5' size={25} onClick={toggleMenu} />
            </div>
            <ul className='flex flex-col w-full items-start lg:gap-7 gap-4 font-semibold text-textp text-[20px]'>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
                {({ isActive }) => (
                  <>
                    <img src={isActive ? home : homeBlack} className='w-[23px] lg:w-[25px]' alt="Home" />
                    Dashboard
                  </>
                )}
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
                {({ isActive }) => (
                  <>
                    <img src={isActive ? group : groupBlack} className='w-[23px] lg:w-[25px]' alt="All Doctors" />
                    Profile
                  </>
                )}
              </NavLink>
              <NavLink to="/appointments" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
                {({ isActive }) => (
                  <>
                    <img src={isActive ? calendar : calendarBlack} className='w-[23px] lg:w-[25px]' alt="About Us" />
                    Appointments
                  </>
                )}
              </NavLink>
              {!isAuthenticated && (
                <NavLink to="/contact" className={({ isActive }) => isActive ? activeLink : inactiveLink}>
                  {({ isActive }) => (
                    <>
                      <img src={isActive ? contact : contactBlack} className='w-[27px] lg:w-[27px]' alt="Contact" />
                      Contact
                    </>
                  )}
                </NavLink>
              )}
            </ul>
          </div>
          {isAuthenticated ? (
            <div className='flex flex-col gap-4 mt-auto mb-16'>
              <NavLink to='/emergency' className="p-2 bg-white rounded-2xl px-4 py-3 text-black shadow-md shadow-darkGray font-semibold flex flex-row gap-2 justify-between items-center hover:bg-[#f3e5e5]">
                Emergency
                <img src={emergency} className='h-[24px]' alt="Emergency" />
              </NavLink>
              <button className="p-2 bg-white rounded-2xl px-4 py-3 text-black shadow-md shadow-darkGray font-semibold flex flex-row gap-2 justify-between items-center hover:bg-[#f3e5e5]" onClick={logout}
                type='submit'
                disabled={loading}
              >
                <div
                  className=' w-full flex flex-row justify-between '
                  type='submit'
                  disabled={loading}
                >

                  {loading ?
                    <div className='w-full h-full bg-primary flex flex-row items-center justify-center'>
                      <IncomponentLoading isShort={true} />
                    </div> :
                    <div className='flex flex-row items-center justify-between w-full gap-2 h-full'>
                      Logout
                      <img
                        src={logoutIcon}
                        className='w-[22px] transition-transform duration-300 group-hover:translate-x-2'
                        alt="Logout"
                      />
                    </div>
                  }
                </div>
              </button>

            </div>
          ) : (
            <div className='flex flex-col mt-auto mb-16 items-center gap-4 lg:gap-3'>
              <NavLink to='/signup' className="bg-primary rounded-2xl px-4 justify-between py-3 text-white font-semibold flex flex-row gap-2 items-center hover:bg-[#28479c] w-full">
                Sign up
                <img src={create} className='h-[24px]' alt="Sign up" />
              </NavLink>
              <NavLink to='/login' className="bg-primary rounded-2xl px-4 justify-between py-3 text-white font-semibold flex flex-row gap-2 items-center hover:bg-[#28479c] w-full">
                Login
                <img src={login} className='h-[24px]' alt="Login" />
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default SmNavbar