import axios from 'axios';

export const getAllData = async () => {
    try {
      const response = await axios.get('https://ttt-sample-app-cc3599fcd617.herokuapp.com/gameData/');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

export const postGameData = async (data) => {
  try {
    const response = await axios.post('https://ttt-sample-app-cc3599fcd617.herokuapp.com/gameData/', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};