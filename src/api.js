import axios from "axios";

const API_KEY = "34233936-07b157599ce71148811fea33a";
const URL = "https://pixabay.com/api/";

const searchParams = new URLSearchParams({
  image_type: "photo",
  orientation: "horizontal",
  per_page: 12,
});

export const getData = async (query, page) => {
  const response = await axios.get(`${URL}?key=${API_KEY}&${searchParams}&q=${query}&page=${page}`);
  return response.data.hits;
}