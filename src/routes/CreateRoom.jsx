import React from "react";
import { v1 as uuid } from "uuid";
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import {useHistory} from 'react-router-dom';
import '../App.css';

const CreateRoom = () => { 
    let history = useHistory();
    function create() {
        const id = uuid();
        history.push(`/room/${id}`);
    }

    return (
        <div className="room">
            <h1>Welcome To Stradio 🏃‍♀️</h1>
            <button onClick={create}>Create Class</button>

            <div>
                <button>🎼 Upload Your Music 🎼</button>
                <div>
                    <h2>🔀 Your Playlist 🔀</h2>
                    <ul>
                        <li>Track 1</li>
                        <li>Track 2</li>
                        <li>Track 3</li>
                    </ul>
                </div>
            </div>
            {/* <AmplifySignOut /> */}
        </div>
    );
};

// export default withAuthenticator(CreateRoom);
export default CreateRoom;
