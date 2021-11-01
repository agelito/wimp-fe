import React, { useEffect } from 'react'
import ReactGA from 'react-ga';
import { useHistory } from 'react-router';

export const RouteChangeTracker: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        history.listen(location => {
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname);
        });
    }, [history]);

    return <></>;
};
