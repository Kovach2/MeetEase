"use client"

import React, { useState } from 'react'
import AdminNavbar from './adminNavBar'
import Users from './users'
import Conferences from './conferences'

export default function AdminContainer() {
    const sections = ['Пользователи', "Конференции"]
    const [activeSection, setActiveSection] = useState<string>(sections[0])
    return (
        <div className='mt-[50px] w-full h-[600px] bg-gray rounded-[15px] border border-black p-[30px]'>
            <AdminNavbar setActiveSection={setActiveSection} activeSection={activeSection}/>
            {
                activeSection === sections[0] &&
                <Users/>
            }
            {
                activeSection === sections[1] &&
                <Conferences/>
            }
        </div>
    )
}
