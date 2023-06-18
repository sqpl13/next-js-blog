import axios from "axios";

const sanityClient = axios.create({
  baseURL: `https://fio3qxol.api.sanity.io/v1/data/query/production`,
});

export default sanityClient;
