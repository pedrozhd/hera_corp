// src/pages/ListaConsultas.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Consulta } from "../interfaces";

const ListaConsultas = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        setCarregando(true);
        setErro("");

        const dados = await api.consultas.listar();

        if (!Array.isArray(dados)) {
          throw new Error("Resposta inesperada do servidor.");
        }

        setConsultas(dados);
      } catch (erro: any) {
        console.error("Erro ao carregar consultas:", erro);

        if (erro.message?.includes("401") || erro.message?.includes("403")) {
          navigate("/dashboard");
          return;
        }

        setErro(
          erro.message === "Erro de conexão com o servidor"
            ? "Não foi possível conectar ao servidor. Tente novamente mais tarde."
            : erro.message || "Erro ao carregar consultas."
        );
      } finally {
        setCarregando(false);
      }
    };

    carregarConsultas();
  }, [navigate]);

  const handleEditar = (id: number) => navigate(`/consulta/atualizar/${id}`);
  const handleCadastrar = () => navigate("/consulta/cadastrar");
  const handleExcluir = (id: number) => navigate(`/consulta/excluir/${id}`);

  // === ESTADOS DE UI ===
  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-700">{erro}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // === TABELA ===
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Lista de Consultas
          </h1>
          <button
            onClick={handleCadastrar}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Nova Consulta
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {consultas.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nenhuma consulta encontrada.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Paciente",
                      "Médico",
                      "Data",
                      "Horário",
                      "Tipo",
                      "Status",
                      "Ações",
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consultas.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {typeof c.paciente === 'object' ? c.paciente.nome : c.paciente || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof c.medico === 'object' ? c.medico.nome : c.medico || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(c.dataConsulta).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {c.horarioConsulta}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {c.tipoConsulta}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            c.status.toLowerCase() === "agendada"
                              ? "bg-yellow-100 text-yellow-800"
                              : c.status.toLowerCase() === "confirmada"
                              ? "bg-blue-100 text-blue-800"
                              : c.status.toLowerCase() === "realizada"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => c.id && handleEditar(c.id)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => c.id && handleExcluir(c.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaConsultas;
