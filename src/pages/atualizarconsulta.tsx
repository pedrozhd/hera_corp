// src/pages/AtualizarConsultaForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface Consulta {
  id: number;
  paciente: string;
  medico: string;
  data: string;
  horario: string;
  tipo: string;
  status: string;
  linkTeleconsulta: string;
  observacoes: string;
  dataCadastro: string;
  ultimaAtualizacao: string;
}

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
}

interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
}

const AtualizarConsultaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Consulta | null>(null);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // === Buscar dados da consulta, pacientes e médicos ===
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        setErro("");

        const [consulta, listaPacientes, listaMedicos] = await Promise.all([
          api.consultas.buscarPorId(Number(id)),
          api.pacientes.listar(),
          api.medicos.listar(),
        ]);

        if (!consulta) throw new Error("Consulta não encontrada.");

        setFormData({
          ...consulta,
          paciente: consulta.paciente?.toString() ?? "",
          medico: consulta.medico?.toString() ?? "",
          tipo: consulta.tipo ?? "presencial",
          status: consulta.status ?? "agendada",
          linkTeleconsulta: consulta.linkTeleconsulta ?? "",
          observacoes: consulta.observacoes ?? "",
        });

        setPacientes(listaPacientes || []);
        setMedicos(listaMedicos || []);
      } catch (erro: any) {
        console.error("Erro ao carregar dados da consulta:", erro);
        if (erro.message?.includes("401") || erro.message?.includes("403")) {
          navigate("/dashboard");
          return;
        }
        setErro(erro.message || "Erro ao carregar dados da consulta.");
      } finally {
        setCarregando(false);
      }
    };

    if (id) carregarDados();
  }, [id, navigate]);

  // === Atualizar campos ===
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  // === Submeter atualização ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const agora = new Date().toISOString();

    const payload = {
      paciente: Number(formData.paciente),
      medico: Number(formData.medico),
      data: formData.data,
      horario: formData.horario,
      tipo: formData.tipo,
      status: formData.status,
      linkTeleconsulta: formData.tipo === "telemedicina" ? formData.linkTeleconsulta : "",
      observacoes: formData.observacoes ?? "",
      dataCadastro: formData.dataCadastro || agora,
      ultimaAtualizacao: agora,
    };

    console.log("-> Enviando payload para atualização de consulta:", payload);

    if (!payload.paciente || !payload.medico || !payload.data || !payload.horario) {
      setErro("Preencha todos os campos obrigatórios (paciente, médico, data e horário).");
      return;
    }

    try {
      await api.consultas.atualizar(Number(id), payload);
      alert("Consulta atualizada com sucesso!");
      navigate("/dashboard");
    } catch (erro: any) {
      console.error("Erro ao atualizar consulta (detalhe):", erro);
      setErro(
        erro?.message && typeof erro.message === "string"
          ? `Erro do servidor: ${erro.message}`
          : "Falha ao atualizar a consulta. Tente novamente mais tarde."
      );

      if (erro?.message?.includes("401") || erro?.message?.includes("403")) {
        navigate("/dashboard");
        return;
      }
    }
  };

  // === Estados de carregamento / erro ===
  if (carregando)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-purple-400 border-t-transparent rounded-full"></div>
      </div>
    );

  if (erro)
    return (
      <div className="p-6 text-center text-red-600">
        <p>{erro}</p>
        <button onClick={() => window.location.reload()} className="text-blue-600 mt-2 underline">
          Recarregar
        </button>
      </div>
    );

  if (!formData) return null;

  // === Formulário ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Atualizar Consulta</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* DADOS DA CONSULTA */}
            <section>
              <h2 className="text-lg font-semibold mb-4 text-purple-700">Dados da Consulta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select name="paciente" value={formData.paciente} onChange={handleChange} className="p-3 border rounded-lg" required>
                  <option value="">Selecione o paciente</option>
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} - {p.cpf}
                    </option>
                  ))}
                </select>

                <select name="medico" value={formData.medico} onChange={handleChange} className="p-3 border rounded-lg" required>
                  <option value="">Selecione o médico</option>
                  {medicos.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome} - {m.especialidade}
                    </option>
                  ))}
                </select>

                <input type="date" name="data" value={formData.data} onChange={handleChange} className="p-3 border rounded-lg" required />
                <input type="time" name="horario" value={formData.horario} onChange={handleChange} className="p-3 border rounded-lg" required />

                <select name="tipo" value={formData.tipo} onChange={handleChange} className="p-3 border rounded-lg">
                  <option value="presencial">Presencial</option>
                  <option value="telemedicina">Telemedicina</option>
                </select>

                <select name="status" value={formData.status} onChange={handleChange} className="p-3 border rounded-lg">
                  <option value="agendada">Agendada</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="realizada">Realizada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="faltou">Paciente não compareceu</option>
                </select>

                {formData.tipo === "telemedicina" && (
                  <input
                    type="url"
                    name="linkTeleconsulta"
                    value={formData.linkTeleconsulta}
                    onChange={handleChange}
                    placeholder="Link da teleconsulta"
                    className="md:col-span-2 p-3 border rounded-lg"
                  />
                )}

                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  placeholder="Observações sobre a consulta"
                  className="md:col-span-2 p-3 border rounded-lg"
                  rows={3}
                />
              </div>
            </section>

            {/* AÇÕES */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button type="button" onClick={() => navigate("/dashboard")} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AtualizarConsultaForm;
