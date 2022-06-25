import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'

const Profile = ({}) => {
    const { loading, isAuthenticated,user } = useSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated])
    return (
        <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            {loading === false &&
                <div>

                    <div>
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{user.role}</p>
                    </div>
                    <div>
                        <Link to="/orders">My Orders</Link>
                    </div>
                </div>}

        </Fragment>
    )
}

export default Profile;