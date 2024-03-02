import React, { useEffect, useState } from "react";
import fetchHouses from "../../api/fetchHouses";
import { House } from "../../types"; // Importing House interface from types.ts

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

  return (
    <div>
      {houses.map((house) => {
        const colors = house.houseColours
          .split(" and ")
          .map((color) => color.trim());
        let gradientStyle = {
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        };

        if (!areColorsRecognized(colors)) {
          gradientStyle = {
            background: `linear-gradient(to right, white, black)`,
          };
        }

        return (
          <div
            key={house.id}
            className="bg-white rounded-[8px] border  shadow-xl p-4 text-black mb-5 w-[400px] font-sans"
          >
            <div className="flex justify-between">
              <span className="font-bold text-base ">{house.name}</span>
              <span className="text-sm text-center">{house.animal}</span>
            </div>
            <div
              className="h-3 w-5/5 mx-auto mt-2 rounded"
              style={gradientStyle}
            ></div>
            <div className="mt-2">
              <span>
                Founder :<span className="font-bold pl-2">{house.founder}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const recognizedColors = [
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
];

const areColorsRecognized = (colors: any[]) => {
  // Check if all colors are included in the recognized colors list
  return colors.every((color: string) =>
    recognizedColors.includes(color.trim().toLowerCase())
  );
};

export default HousesPage;
