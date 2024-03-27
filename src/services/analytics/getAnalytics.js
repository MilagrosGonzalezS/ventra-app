import axios from "axios";
import config from "../../config.json";

//TRAER ANALISIS POR EVENTID
async function getAnalytics(eventId) {
  const res = await axios.get(`${config.apiAnalytics}/${eventId}`);
  return res;
}

export { getAnalytics };
