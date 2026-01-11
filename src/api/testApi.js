import axios from "axios";

const BASE_URL = "https://medical-lab-booking.onrender.com/api/tests";

export function getAllTests() {
  return axios.get(BASE_URL);
}
