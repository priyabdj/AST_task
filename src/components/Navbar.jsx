import React, { useState } from 'react'

const Navbar = ({ name, picture, email }) => {
    const [userButtonSelected, setUserButtonSelected] = useState(false);

    const logoutHandle = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16">
                    <div className="absolute inset-y-0 left-0 flex sm:hidden">
                    </div>
                    <div className="flex flex-1 sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src="https://e7.pngegg.com/pngimages/127/557/png-clipart-hospital-computer-icons-health-care-medicine-hospital-logo-medicine.png" alt="Your Company" />
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        <div className="relative ml-3">
                            <div className='flex'>
                                <p className="block px-4 py-2 text-sm text-white" role="menuitem" tabIndex="-1" id="user-menu-item-0">{name}</p>
                                <div onClick={() => setUserButtonSelected(prev => !prev)}>
                                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <img className="h-8 w-8 rounded-full" src={`${picture}`} alt="" />
                                    </button>
                                </div>
                            </div>

                            {
                                userButtonSelected &&
                                < div className="absolute right-0 z-10 mt-2 min-w-fit w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">{name}</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">{email}</a>
                                    <button onClick={logoutHandle} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar