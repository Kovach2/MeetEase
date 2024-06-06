import Peer from "peerjs";
import { useState, useEffect, useRef } from "react";

const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null)
    const [myId, setMyId] = useState<string>("")
    const isPeerSet = useRef(false)

    useEffect(() =>{
        if(isPeerSet.current) return
        isPeerSet.current = true
        const initPeer = async () => {
            const myPeer = new (await import("peerjs")).default()
            setPeer(myPeer)

            myPeer.on('open', (id: string) => {
                console.log("yout peer id is " + id)
                setMyId(id)
            })
        }
        initPeer()
    }, [])

    return{
        peer,
        myId
    }
}

export default usePeer