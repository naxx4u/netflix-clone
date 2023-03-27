import React, { useCallback, useEffect, useState } from 'react'
import NavbarItem from './NavbarItem'

import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs'
import MobileMenu from './MobileMenu'
import AccountMenu from './AccountMenu'

const TOP_OFFSET = 66

const Navbar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const  toogleMobileMenu = useCallback(() => {
        setShowMobileMenu(curr => !curr)
    }, [])

    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const  toogleAccountMenu = useCallback(() => {
        setShowAccountMenu(curr => !curr)
    }, [])

    const [showBG, setShowBG] =useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBG(true)
            }else {
                setShowBG(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
        
    }, [])

    return (
        <nav className='w-full fixed z-40'>
            <div className={`
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-500       
        ${showBG ? ' bg-zinc-900/80 ' : ''}
        `}>
        <img className='h-4 lg:h-7' src="/images/logo.png" alt="logo" />
            <div className=' flex-row ml-8 gap-7 hidden lg:flex'>
                <NavbarItem label={'Home'} />
                <NavbarItem label={'Series'} />
                <NavbarItem label={'Films'} />
                <NavbarItem label={'New & Popular'} />
                <NavbarItem label={'My list'} />
                <NavbarItem label={'Browse by Languages'} />
            </div>

                <div onClick={toogleMobileMenu} className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
                    <p className='text-white text-sm'>Browse</p>
                    <BsChevronDown  className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className='flex ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsSearch />
                    </div>

                    <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
                        <BsBell />
                    </div>

                    <div onClick={toogleAccountMenu} className='flex flex-row items-center gap-2 cursor-pointer relative'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                            <img src="/images/default-red.png" alt="logo" />
                        </div>
                        <BsChevronDown  className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>   
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar