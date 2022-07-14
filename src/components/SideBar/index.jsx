import logo from '../../assets/Spotify-logo.svg';
import { HiHome ,HiSearch} from 'react-icons/hi'
import {NavLink} from 'react-router-dom'
import './SideBar.css'

export const SideBar = () => {
    return (
        <aside className='side-bar'>
            <img className='logo' src={logo} alt='spotify logo' />
        
                <nav className='nav-bar'>
                    <NavLink to='/' className='nav-bar-item'>
                        <span><HiHome /></span>
                        <p>Home</p>
                    </NavLink>
                    <NavLink to='search'className='nav-bar-item'>
                        <span><HiSearch /></span>
                        <p>Search</p>
                    </NavLink>
                </nav>
            
        </aside>
    )
}
