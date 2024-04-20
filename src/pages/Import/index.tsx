import { useState } from 'react';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { uploadCSVFile } from '../../utils/fileUpload';

export default function Import() {
  const [file, setFile] = useState<File | null>(null);
  const [importedData, setImportedData] = useState<any[]>([]);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('Nenhum arquivo selecionado.');
        return;
      }

      const data = await uploadCSVFile(file);
      setImportedData(data);
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
    }
  };

  return (
    <>
      <Container>
        <label className="sr-only">Enviar arquivo</label>
        <div className="flex gap-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            id="file-input"
            className="block w-full border border-white/10 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-non file:bg-zinc-100 file:border-0 file:me-4 file:py-3 file:px-4"
          />
          <Button onClick={handleUpload}>Enviar</Button>
        </div>

        <table className="w-full border border-white/10 rounded-lg">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-sm font-semibold text-left">Nome do Repositório</th>
              <th className="py-3 px-4 text-sm font-semibold text-left">Descrição</th>
              <th className="py-3 px-4 text-sm font-semibold text-center">Data de Criação</th>
              <th className="py-3 px-4 text-sm font-semibold text-center">Linguaguem</th>
              <th className="py-3 px-4 text-sm font-semibold text-center">Estrelas</th>
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
                <td className="py-3 px-4 text-sm text-center">{row['Estrelas'] || '0'}</td>
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
      </Container>
    </>
  );
}
