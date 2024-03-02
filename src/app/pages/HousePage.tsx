import React, { useEffect, useState } from 'react';
import fetchHouses from '../../api/fetchHouses';
import { House } from '../../types'; // Importing House interface from types.ts

const HousesPage: React.FC = () => {
    const [houses, setHouses] = useState<House[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
  
    useEffect(() => {
      const fetchHousesData = async () => {
        setLoading(true); 
        const fetchedHouses = await fetchHouses(); 
        setHouses(fetchedHouses); 
        setLoading(false); 
      };
  
      fetchHousesData(); 
    }, []); 
  
    if (loading) {
      return <div>Loading...</div>; 
    }
  return(
    <div>
        {houses.map(house =>{
            return (
                <div key='house.id'>
                    {house.name}
                </div>
            )
        })}
    </div>
  )
};

export default HousesPage;
