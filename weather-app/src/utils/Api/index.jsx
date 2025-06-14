// const APIKey = "db56dab392f74dd09c7110432241012";
// const API_DOMAIN = `https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${searchInput.value}&days=${numsForcastDay}&aqi=yes&alerts=yes`;

const Request = async (url, method = "GET", body = null, options = {}) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: body && method !== "GET" ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Export các hàm gọi API
export const Get = (url, options) => Request(url, "GET", null, options);
export const Post = (url, body, options) => Request(url, "POST", body, options);
export const Patch = (url, body, options) =>
  Request(url, "PATCH", body, options);
export const Delete = (url, options) => Request(url, "DELETE", null, options);
