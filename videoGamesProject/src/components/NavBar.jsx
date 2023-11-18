import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); 

  return (
    <div className='divNavBar'>
      <div>
        <h3 className='neonText neonTextNavBar'>J'games</h3>
      </div>
      {windowWidth <= 730 ? (
        <div className='menuIcon' onClick={toggleMenu} ref={menuRef}>
          ☰
          {menuOpen && (
            <div className='menuDropdown'>
              <Link to='/home' onClick={closeMenu}>
                Home
              </Link>
              <Link to='/reviews' onClick={closeMenu}>
                Reviews
              </Link>
              <Link to='/about' onClick={closeMenu}>
                About
              </Link>
              <Link to='/createVideogame' onClick={closeMenu}>
                Create Videogame
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className='divCreateVideogameButton'>
          <Link to='/home'>
            <button className='buttonNav'>Home</button>
          </Link>
          <Link to='/reviews'>
            <button className='buttonNav'>Reviews</button>
          </Link>
          <Link to='/about'>
            <button className='buttonNav'>About</button>
          </Link>
          <Link to='/createVideogame'>
            <button className='createVideogameButton'>Create Videogame</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;