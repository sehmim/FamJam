import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const RightRow = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const audio = new Audio();

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}

const Music = ({roomID}) => {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8000");
        socketRef.current.on('audio-stream', stream => {
            console.log('stream ===>', stream);
            audio.src = stream.id
            audio.play()
        });

        socketRef.current.on('play time', stream => {
            console.log('Time ', stream);
            audio.currentTime = stream.time;
            audio.src = stream.src;
            audio.play();
        });

        setTimeout(() => {
            socketRef.current.removeListener('play time');
        }, 1000);

    }, []);

    const playMusic = () => {
        socketRef.current.emit('client-stream-request', {status: 'ok', id: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3'});
        audio.src = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3';
        audio.play();
        setInterval(() => {
            socketRef.current.emit('time', {status: 'time', time: audio.currentTime, src: audio.src})
        }, 1000)
    }

    const volumeControl = (i) => {
        if (audio.volume < 0.1 && i === 'dsc') {
            return;
        }
        if (audio.volume === 1 && i === 'inc') {
            return;
        }
        if(i === 'dsc') {
            audio.volume = audio.volume - 0.10;
        }
        if(i === 'inc') {
            audio.volume = audio.volume + 0.10;
        }
    };
    return (
        <RightRow>
            <button onClick={playMusic}>🎵Play Music🎵</button>
            <div>🔈</div>
            <button onClick={() => {volumeControl('dsc')}}>-</button>
            <button onClick={() => {volumeControl('inc')}}>+</button>
        </RightRow>
    )
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;
    const id = useParams();
    console.log('===>>>>', id);
    

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8000");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        peer
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                const peerObj = {
                    peer,
                    peerID: payload.callerID,
                }
                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("user left", id => {
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if(peerObj) {
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        });
        
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}
            
            <div>
                Share this link with your students: {`http://localhost:3000/${id.roomID}`}
            </div>
            <Music roomID={roomID}/>
        </Container>
    );
};

export default Room;