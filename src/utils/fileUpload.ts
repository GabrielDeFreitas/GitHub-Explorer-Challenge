import axios from 'axios';

export async function uploadCSVFile(file: File): Promise<any[]> {
  try {
    const formData = new FormData();
    formData.append('csvFile', file);

    const response = await axios.post('http://localhost:3000/api/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    throw error;
  }
}
