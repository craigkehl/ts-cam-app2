import React from 'react';
import { ObsConnectionStatus as ObsStatus } from '../../util/obs-http-requests';
import classes from './ObsStatusBanner.module.css';

const ObsStatusBanner: React.FC<{ status: ObsStatus; onReconnect: () => void }> = ({ status, onReconnect }) => {
  if (status === 'connected') return null;

  return (
    <div className={`${classes.banner} ${classes[status]}`}>
      {status === 'connecting' && (
        <>
          <span className={classes.spinner} />
          Connecting to OBS, please wait...
        </>
      )}
      {status === 'unavailable' && (
        <>
          OBS is not running or unreachable.
          <button className={classes.reconnectBtn} onClick={onReconnect}>
            Connect
          </button>
        </>
      )}
    </div>
  );
};

export default ObsStatusBanner;
