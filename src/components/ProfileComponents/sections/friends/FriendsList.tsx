import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FrinedsListInner from './FrinedsListInner'


export interface IFriendsList{
    token: string | undefined
    friendList: {
        username: string
        avatar: string
    }[] | undefined
    ownLogin: string | undefined
}

export interface ISearchData {
    code: number
    success: boolean
    friends: {
        username: string
        avatar: string
    }[]
}

interface IFriendSeacrh{
    value: string
    handleChange: (value: string) => void
}



const FriendSeacrh = ( { value, handleChange } : IFriendSeacrh) =>{
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        handleChange(event.target.value)
    }

    return(
        <div className='flex justify-center items-center mb-[15px]'>
            <div className='relative'>
                <input 
                    type="text" 
                    className={`block bg-inherit focus:outline-none border-b-[1px] placeholder:text-opacity-[.46] placeholder:text-[#000000] placeholder:text-[14px] border-b-black w-full max-w-[250px] pl-[10px] pb-[2px] pr-[30px] font-bold text-[#000000]`}
                    placeholder='Поиск...'
                    value={value}
                    onChange={handleInputChange}
                />
                <svg className='cursor-pointer block absolute bottom-[3px] right-0' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#E8EAED"/>
                </svg>
            </div>
        </div>
    )
}

export default function FriendsList( { token, friendList = [], ownLogin } : IFriendsList ) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const [searchValue, setSearchValue] = useState<string>("")
    const [findFrineds, setFindFrineds] = useState<ISearchData>()
    const [loader, setLoader] = useState<boolean>(false)
    const [newFriendList, setFriendList] = useState<{username: string, avatar: string}[]>(friendList)

    useEffect(() =>{
        let timer : any
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_URL}friend/search`, {searchValue: searchValue})
                const data : ISearchData = response.data
                setFindFrineds(data)
                setLoader(false)
            } catch (error) {
                console.log(error)
            }
        }

        const setNewFriendsList = async () => {
            setLoader(true)
            try {
                const response = await axios.post(`${API_URL}profile`, {token: token})
                const data : ISearchData = response.data
                setFriendList(data.friends)
                setLoader(false)
            } catch (error) {
                console.log(error)
            }
        }

        if(searchValue.length !== 0){
            timer = setTimeout(()=>{
                setLoader(true)
                fetchData()
            },500)
        }else{
            setNewFriendsList()
            setFindFrineds(undefined)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [API_URL,searchValue, token])

    return (
        <div className='w-full h-full bg-[#D8E6EF] bg-opacity-[.41] rounded-[10px] pt-[20px] px-[15px]'>
            <FriendSeacrh value={searchValue} handleChange={setSearchValue}/>
            <FrinedsListInner token={token} loader={loader} friendList={newFriendList} findFriends={findFrineds} searchValue={searchValue} ownLogin={ownLogin}/>
        </div>
    )
}
