
import Papa from 'papaparse';
import { MathProblem } from '../types/mathProblem';

export const parseCSV = (file: File): Promise<MathProblem[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data as MathProblem[];
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const exportCSV = (data: MathProblem[]): void => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'updated_math_problems.csv');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
