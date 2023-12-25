import { URL, Method, ServerErrorText, Route } from './constant.js';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ServerErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ServerErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
