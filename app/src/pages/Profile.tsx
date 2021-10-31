import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Profile = () => {

    //@ts-ignore 
    const { username } = useParams();

    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        //@ts-ignore 
        if (location && location.state && location.state.user) {
            //@ts-ignore 
            setUser(location.state.user);
        } else {
            // api call for user info 
            setUser({
                //@ts-ignore 
                username: username,
            })
        }
    }, [])

    return (
        <div>
            {
                user &&
                <div>
                    {/* @ts-ignore */}
                    <h1>{user.username}</h1>
                </div>
            }
        </div>
    )
}

export default Profile; 
