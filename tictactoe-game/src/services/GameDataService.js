import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: proxy,
//     timeout: 5000
// });

export const getAllData = async () => {
    try {
      const response = await axios.get('/gameData/');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

export const postGameData = async (data) => {
  try {
    const response = await axios.post('/gameData/', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};