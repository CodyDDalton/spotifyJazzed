import axios from 'axios';

//setup storage_keys object and create properties for accessToken, refreshToken, expireTime, and timestamp
const STORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp'
}
//store values for accessToken, refreshToken, expireTime, and timestamp from local storage
const STORAGE_VALUES = {
    accessToken: window.localStorage.getItem(STORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(STORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(STORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(STORAGE_KEYS.timestamp)
};
//export search function to get logged in user details
export const getUserProf = () => axios.get('/me')

const hasTokenExpired = () => {
    //checking whether the current accessToken has expired
    const { accessToken, timestamp, expireTime } = STORAGE_VALUES;
    if (!accessToken || !timestamp) {
        return false;
    }
    const msElapsed = Date.now() - Number(timestamp);
    return (msElapsed / 1000) > Number(expireTime);
};

export const logout = () => {
    //logging the user out and removing keys from local storage
    for(const property in STORAGE_KEYS) {
        window.localStorage.removeItem(STORAGE_KEYS[property])
    }

    window.location = window.location.origin;
}

const refreshToken = async () => {
    //checking if there is a refresh token available
    try {
        if(!STORAGE_VALUES.refreshToken ||
            STORAGE_VALUES.refreshToken === 'undefined' ||
            (Date.now() - Number(STORAGE_VALUES.timestamp) / 1000) < 1000
            ) {
                console.error('Refresh token unavailable');
                logout();
            }
            //Getting the refresh token
            const { data } = await axios.get(`/refresh_token?refresh_token=${STORAGE_VALUES.refreshToken}`);
            //Switching out the old access token
            window.localStorage.setItem(STORAGE_KEYS.accessToken, data.access_token);
            window.localStorage.setItem(STORAGE_KEYS.timestamp, Date.now());

            window.location.reload();
        } catch (e) {
            console.error(e)
        }
};

const gainAccess = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [STORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [STORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [STORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
  const hasError = urlParams.get('error');

  if (hasError || hasTokenExpired() || STORAGE_VALUES.accessToken === 'undefined') {
    refreshToken();
  }

  if (STORAGE_VALUES.accessToken && STORAGE_VALUES.accessToken !== 'undefined') {
    return STORAGE_VALUES.accessToken;
  }

  if (queryParams[STORAGE_KEYS.accessToken]) {

    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }

    window.localStorage.setItem(STORAGE_KEYS.timestamp, Date.now());
    return queryParams[STORAGE_KEYS.accessToken];
  }

return false;
};

export const accessToken = gainAccess();

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';