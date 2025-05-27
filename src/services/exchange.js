export const convertGelToUsd = async (amount) => {
    const url = `https://bankofgeorgia.ge/api/currencies/convert/USD/GEL?amountFrom=${amount}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      return data.data.amount; 
    } catch (error) {
      console.error("Error converting GEL to USD:", error);
      return null;
    }
  };