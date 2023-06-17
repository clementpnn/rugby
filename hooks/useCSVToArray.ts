import Papa from 'papaparse';

export interface FileRow {
  [key: string]: string;
}

const useCSVToArray = () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const csvFileToArray = (csvString: string): Promise<FileRow[]> => {
    return new Promise((resolve) => {
      Papa.parse(csvString, {
        header: true,
        complete: (results) => {
          resolve(results.data as FileRow[])
        }
      })
    })
  }

  return { csvFileToArray };
};

export default useCSVToArray;
