import axios from 'axios';

const instance = axios.create({ baseURL: 'https://api.spotify.com/v1' })

export const getPrivateToken = async (code) => {

    const clientId = '3f182385c47b4459b03bba8df1a09d47';
    const clientSecret = '89b84d2544ac44938950c2fdcca11cd0';
    const AutUrl = 'https://accounts.spotify.com/api/token';

    const result = await axios(
        {
            method: 'post',
            url: AutUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/`


        });
    // console.log(result.data)
    return result.data;
}


export const getRefreshedToken = async () => {

    const refreshToken = localStorage.getItem('refreshToken')
    const clientId = '3f182385c47b4459b03bba8df1a09d47';
    const clientSecret = '89b84d2544ac44938950c2fdcca11cd0';
    const AutUrl = 'https://accounts.spotify.com/api/token';

    const result = await axios(
        {
            method: 'post',
            url: AutUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: `grant_type=refresh_token&refresh_token=${refreshToken}`
        });
    // console.log(result.data)
    return result.data;
}


instance.interceptors.request.use((config) => {
    const newConfig = { ...config }
    const token = localStorage.getItem('token')
    newConfig.headers.Authorization = `Bearer ${token}`
    return newConfig
})

instance.interceptors.response.use((response) => response,
    (error) => {
    
        if (error.response.status === 401) {
            getRefreshedToken()
                .then(res => localStorage.setItem('token', res.access_token))
                .catch(() => localStorage.clear())
                .finally(() => window.location.reload())
        }
        // console.log(error)
        return Promise.reject(error)
    })


//comparar state TO-DO

export function getUserData() {
    return instance.get('/me')
        .then(res => {
            // console.log(res)
            return res.data
        })
}

export function getPrivateData(endpoint, n) {
    return instance.get(endpoint, {
        params: { limit: n }
    })
        .then(res => {  
            // console.log(res)
            return res.data
        })

}

//saveTracks

//removeTracks

//manejo de playback