import axios from 'axios';

const API_BASE_URL = 'http://appnox-tm.it/api';

const getAccessToken = async () => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      user: 'AdminPro',
      password: 'Mnop@1234'
    });
    const accessToken = response.data.result.key;
    console.log(accessToken,"access");
    return accessToken;
    
    
  };
  const getMenuTree = async () => {
    const accessToken = await getAccessToken();
    const response = await axios.get('http://appnox-tm.it/api/v1/menu', {
      headers: {
        Authorization: 'Bearer ' + accessToken 
      }
    });
    return response.data.result.data;
  };

export { getAccessToken, getMenuTree };


