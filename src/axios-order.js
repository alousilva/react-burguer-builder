import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burguer-e3d22.firebaseio.com/'
});

export default instance;
