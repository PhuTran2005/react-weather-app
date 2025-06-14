const geokey = import.meta.env.VITE_GEO_DB_API_KEY || "";

export const getLocation = async (value) => {
  if (value.length < 2) return;

  const response = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix=${value}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": geokey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

const geoImgKey = import.meta.env.VITE_GEO_IMG_API_KEY || "";
export const getImageFromUnsplash = async (location) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${location}&client_id=${geoImgKey}`
  );
  const data = await res.json();
  return data.results[0]?.urls?.regular;
};
