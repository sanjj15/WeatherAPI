import Papa from "papaparse";

export const getPastWeather = () => {
  return new Promise((resolve, reject) => {
    Papa.parse("/testset.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};