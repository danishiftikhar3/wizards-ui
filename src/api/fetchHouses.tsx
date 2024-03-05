import axios from "axios";
import { House } from "../types";

const fetchHouses = async (filter?: string): Promise<House[]> => {
  const fetch = async (): Promise<House[]> => {
    try {
      let url = "https://wizards-api.vercel.app/houses";
      if (filter) {
        url += `?name=${filter}`;
      }
      const response = await axios.get<House[]>(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching houses:", error);
      return [];
    }
  };

  return await fetch();
};

export default fetchHouses;
