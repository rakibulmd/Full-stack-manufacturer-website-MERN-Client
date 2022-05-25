import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import logoDim from "../../asset/images/logo/logoDim.png";

const MyProfile = () => {
    const [user] = useAuthState(auth);
    return (
        <div
            className="h-screen"
            style={{
                background: `url(${logoDim}) no-repeat center center`,
            }}
        >
            <h2>Welcome {user?.displayName}</h2>
            {user?.photoURL && (
                <div class="avatar">
                    <div class="w-12">
                        <img src={user?.photoURL} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
