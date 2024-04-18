import axios from 'axios';
import { useState } from 'react';

export default function Import() {
  const [file, setFile] = useState(null);
  const [importedData, setImportedData] = useState([]);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('Nenhum arquivo selecionado.');
        return;
      }

      const formData = new FormData();
      formData.append('csvFile', file);

      const response = await axios.post('http://localhost:3000/api/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImportedData(response.data.data);
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-5 flex flex-col gap-5">
        <label className="sr-only">Enviar arquivo</label>
        <div className="flex gap-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            id="file-input"
            className="block w-full border border-white/10 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-non file:bg-zinc-100 file:border-0 file:me-4 file:py-3 file:px-4"
          />
          <button className="bg-cyan-500 hover:bg-cyan-400 text-sm font-bold py-2 px-4 rounded" onClick={handleUpload}>
            Enviar
          </button>
        </div>

        <div className="border border-white/10 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-sm font-semibold text-left">Nome do Repositório</th>
                <th className="py-3 px-4 text-sm font-semibold text-left">Descrição</th>
                <th className="py-3 px-4 text-sm font-semibold text-center">Data de Criação</th>
                <th className="py-3 px-4 text-sm font-semibold text-center">Linguaguem</th>
                <th className="py-3 px-4 text-sm font-semibold text-center">Link do repositório</th>
              </tr>
            </thead>
            <tbody>
              {importedData.map((row, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-sm">{row['Nome do Repositório']}</td>
                  <td className="py-3 px-4 text-sm">{row['Descrição'] || 'Não especificado'}</td>
                  <td className="py-3 px-4 text-sm text-center">{row['Data de Criação']}</td>
                  <td className="py-3 px-4 text-sm text-center">{row['Linguagem'] || 'Não especificado'}</td>
                  <td className="py-3 px-4 text-sm text-center">
                    <a
                      href={row['Link do repositório']}
                      target="_blank"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Acessar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
