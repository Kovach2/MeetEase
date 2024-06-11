import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const useMediaStream = () => {
    const [stream, setStream] = useState<MediaStream | undefined>(undefined);
    const isStreamSet = useRef(false);

    useEffect(() => {
        if (isStreamSet.current) return;

        const initStream = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setStream(mediaStream);
            } catch (e) {
                console.log("Error in media navigator", e);
                toast.error("Ошибка получения доступа к камере");
            }
        };

        initStream();
        isStreamSet.current = true;
    }, []);

    return { stream };
};

export default useMediaStream;