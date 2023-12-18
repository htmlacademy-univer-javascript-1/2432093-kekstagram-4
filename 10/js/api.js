const API_URL = 'https://29.javascript.pages.academy/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const SERVER_ERROR_TEXT = {
  GET_DATA: 'Failed',
  POST_DATA: 'Failed',
};

const load = (route, errorText, method = METHOD.GET, body = null) =>
  fetch(`${API_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(ROUTE.GET_DATA, SERVER_ERROR_TEXT.GET_DATA);

const sendData = async (body) => {
  try {
    const response = await fetch(`${API_URL}${ROUTE.SEND_DATA}`, {
      method: METHOD.POST,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to send data. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(SERVER_ERROR_TEXT.POST_DATA);
  }
};

export { getData, sendData };
