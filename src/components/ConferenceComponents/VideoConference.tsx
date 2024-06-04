"use client"
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const VideoConference: React.FC = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(false);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:3000/api/conference/connect');

    wsRef.current.onmessage = (event) => {
      const videoBlob = new Blob([event.data], { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(videoBlob);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.src = videoUrl;
        remoteVideoRef.current.play();
      }
    };

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const handleVideo = (stream: MediaStream) => {
    setStream(stream);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        wsRef.current?.send(event.data);
      }
    };
    mediaRecorder.start(1000);
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(handleVideo)
      .catch((error) => {
        console.error('Error accessing media devices.', error);
        toast.error('Error accessing media devices.');
      });
  };

  const toggleVideo = () => {
    if (isVideoOn) {
      stream?.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsVideoOn(false);
    } else {
      startVideo();
      setIsVideoOn(true);
    }
  };

  return (
    <div>
      <Toaster />
      <button onClick={toggleVideo}>{isVideoOn ? 'Turn Off Video' : 'Turn On Video'}</button>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <h3>Local Video</h3>
          <video ref={localVideoRef} autoPlay muted style={{ width: '100%' }} />
        </div>
        <div style={{ width: '50%' }}>
          <h3>Remote Video</h3>
          <video ref={remoteVideoRef} autoPlay style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default VideoConference;
