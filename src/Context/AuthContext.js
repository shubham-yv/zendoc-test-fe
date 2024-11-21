import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkTokenExists } from '../Actions/indexedDB'; // Import your token checking function

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const authenticated = await checkTokenExists();
            setIsAuthenticated(authenticated);
        };
        verifyToken();
    }, []);

    if (isAuthenticated === null) {
        // Return a loading indicator while the token is being verified
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default PrivateRoute;
