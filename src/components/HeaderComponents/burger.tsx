"use client"
import { useState } from 'react';
import Cookies from 'js-cookie';

const BurgerMenu = ({token} : {token: string | undefined}) => {
  const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const signOut = () => {
        Cookies.remove("token")
        window.location.reload()
    }

  return (
    <div className="relative">
      <button
        className="flex flex-col items-center justify-center w-8 h-8 space-y-1"
        onClick={toggleMenu}
      >
        <div className={`w-6 h-0.5 bg-black transition-transform ${isOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black transition-transform ${isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
          <ul className="flex flex-col p-4 space-y-2">
            {
                token ?
                <>
                    <li><a href="/about" className="text-gray-700 hover:text-gray-900">О нас</a></li>
                    <li><a href="/faq" className="text-gray-700 hover:text-gray-900">FAQ</a></li>
                    <li><a href="/profile" className="text-gray-700 hover:text-gray-900">Аккаунт</a></li>
                    <li className="text-gray-700 hover:text-gray-900" onClick={signOut}>Выход</li>
                </>
                :
                <>
                    <li><a href="/about" className="text-gray-700 hover:text-gray-900">О нас</a></li>
                    <li><a href="/faq" className="text-gray-700 hover:text-gray-900">FAQ</a></li>
                    <li><a href="/login" className="text-gray-700 hover:text-gray-900">Войти</a></li>
                    <li><a href="/register" className="text-gray-700 hover:text-gray-900">Зарегистрироваться</a></li>
                </>
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
