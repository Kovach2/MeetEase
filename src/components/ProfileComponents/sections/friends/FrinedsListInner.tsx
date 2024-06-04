import React, { useEffect, useState } from 'react'
import Loader from '../../loader'
import Image from 'next/image'
import { IFriendsList, ISearchData } from './FriendsList'
import axios from 'axios'
import toast from 'react-hot-toast'

interface IFrinedsListInner extends IFriendsList{
    loader: boolean
    findFriends: ISearchData | undefined
    searchValue: string
    ownLogin: string | undefined
}

interface IFriendItem {
    token: string | undefined
    username: string,
    avatar: string
    notUserFriend?: boolean
    updatedFriendList?: ([]) => void
    setUpdateLoader?: (updateLoader: boolean) => void
}


const FriendItem = ( { token, username, avatar, notUserFriend, updatedFriendList, setUpdateLoader } : IFriendItem) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const handleButtonAddFriend = async () =>{
        toast.remove()
        const sendData = {
            token: token,
            friendData: {
                username: username,
                avatar: avatar
            }
        }

        const response = await axios.post(`${API_URL}friend/add`, sendData)
        const data = response.data

        if(data.success){
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    }

    const handleButtonDeleteFriend = async () =>{
        setUpdateLoader && setUpdateLoader(true)
        toast.remove()
        const sendData = {
            token: token,
            friendUsername: username
        }
        const response = await axios.post(`${API_URL}friend/remove`, sendData)
        const data = response.data
        if(updatedFriendList && setUpdateLoader && data.success){
            updatedFriendList(data.updatedFriendList)
            setUpdateLoader(false)
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    }

    return(
        <div className={`flex justify-between items-center border p-[5px] rounded-2xl`}>
            <div className='flex items-center gap-[15px] select-none'>
                <Image
                    width={40}
                    height={45}
                    alt='avatar'
                    src={"data:image/png;base64," + avatar}
                />
                <div className='text-[16px] font-bold text-[#0F0E0E]'>{username}</div>
            </div>
            <div className='flex justify-center items-center w-[30px] h-[30px] bg-[#C6D6E0] rounded-full cursor-pointer'
                onClick={!notUserFriend ? handleButtonAddFriend : handleButtonDeleteFriend}>
                {
                    notUserFriend ?
                    <svg width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.44175 13.0625L9.50008 11.0042L11.5584 13.0625L12.6667 11.9542L10.6084 9.89583L12.6667 7.8375L11.5584 6.72917L9.50008 8.7875L7.44175 6.72917L6.33341 7.8375L8.39175 9.89583L6.33341 11.9542L7.44175 13.0625ZM5.54175 16.625C5.10633 16.625 4.73359 16.47 4.42352 16.1599C4.11345 15.8498 3.95841 15.4771 3.95841 15.0417V4.75H3.16675V3.16667H7.12508V2.375H11.8751V3.16667H15.8334V4.75H15.0417V15.0417C15.0417 15.4771 14.8867 15.8498 14.5766 16.1599C14.2666 16.47 13.8938 16.625 13.4584 16.625H5.54175ZM13.4584 4.75H5.54175V15.0417H13.4584V4.75Z" fill="black"/>
                    </svg>
                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="black"/>
                    </svg>
                }
               
            </div>
        </div>
    )
}



export default function FrinedsListInner( { token, loader, friendList = [], findFriends, searchValue, ownLogin } : IFrinedsListInner ) {

    const [updateFriendList, setUpdateFriendList] = useState(friendList)
    const [updateLoader, setUpdateLoader] = useState<boolean>(loader)
    const findedFrineds = findFriends?.friends.filter((frined) => frined.username !== ownLogin)

    useEffect(() =>{
        setUpdateFriendList(friendList)
    },[friendList])

    return (
        <div className={`flex flex-col h-full max-h-[356px] gap-[15px] pr-[5px] ${updateFriendList.length >= 6 && "overflow-y-scroll"} scrollbar-h-[10px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 py-[10px]`}>
            {
                updateLoader ?
                (
                    <Loader/>
                )
                :
                (
                    findedFrineds && findedFrineds.length > 0 && searchValue.length > 0 ?
                        (
                            findedFrineds.map((findFriend, index) =>{
                                if(findFriend.username !== ownLogin){
                                    return(
                                        <FriendItem key={index} token={token} username={findFriend.username} avatar={findFriend.avatar}/>
                                    )
                                }
                            })
                        )
                    :
                    (
                        findedFrineds && findedFrineds.length === 0 && searchValue.length > 0 ?
                        (
                            <div className='font-bold text-black text-[18px] text-center'>Ничего не найдено</div>
                        )
                        :
                        (
                            loader ?
                            (<Loader/>)
                            :
                            (
                                updateFriendList.length > 0 ?
                                (
                                    updateFriendList.map((friend, index) =>{
                                        return(
                                            <div>
                                                <FriendItem key={friend.username} token={token} username={friend.username} avatar={friend.avatar} notUserFriend={true} updatedFriendList={setUpdateFriendList} setUpdateLoader={setUpdateLoader}/>
                                            </div>
                                        )
                                    })
                                )
                            :
                                (
                                    <div className='font-bold text-black text-[18px] text-center'>
                                        У тебя нет друзей. Скорее найди их!
                                    </div>
                                )
                            )
                        )
                    )
                )
            }
        </div>
    )
}
