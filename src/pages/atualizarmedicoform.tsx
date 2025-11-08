// src/pages/AtualizarMedicoForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface Medico {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
  status: string;
  email: string;
  telefone?: {
    ddd: string;
    numero: string;
    tipoDeTelefone: string;
  };
  contatoPreferencial: string;
  horarioAtendimento: string;
  dataCadastro: string;
  ultimaAtualizacao: string;
}

const AtualizarMedicoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Medico | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // === Buscar médico pelo ID ===
  useEffect(() => {
    const carregarMedico = async () => {
      try {
        setCarregando(true);
        setErro("");

        const medico = await api.medicos.buscarPorId(Number(id));
        if (!medico) throw new Error("Médico não encontrado.");

        setFormData({
          ...medico,
          telefone: medico.telefone || { ddd: "", numero: "", tipoDeTelefone: "celular" },
        });
      } catch (erro: any) {
        console.error("Erro ao carregar médico:", erro);

        if (erro.message.includes("401") || erro.message.includes("403")) {
          navigate("/dashboard");
          return;
        }

        setErro(erro.message || "Erro ao carregar dados do médico.");
      } finally {
        setCarregando(false);
      }
    };

    if (id) carregarMedico();
  }, [id, navigate]);

  // === Atualizar campos do formulário ===
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    const { name, value } = e.target;

    // Campos aninhados (telefone)
    if (["ddd", "numero", "tipoDeTelefone"].includes(name)) {
      setFormData(prev => {
        const base = prev ?? formData;
        if (["ddd","numero","tipoDeTelefone"].includes(name)) {
          return {
            ...base,
            telefone: { ...(base.telefone ?? { ddd: "", numero: "", tipoDeTelefone: "celular" }), [name]: value },
          };
        }
        return { ...base, [name]: value };
      });
    }
  };

  // === Enviar atualização ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const payload = {
      nome: formData.nome,
      crm: formData.crm,
      especialidade: formData.especialidade,
      email: formData.email,
      status: formData.status,
      telefone: formData.telefone,
      contatoPreferencial: formData.contatoPreferencial,
      horarioAtendimento: formData.horarioAtendimento,
      ultimaAtualizacao: new Date().toISOString().split("T")[0],
    };

    try {
      await api.medicos.atualizar(Number(id), payload);
      alert("Médico atualizado com sucesso!");
      navigate("/dashboard");
    } catch (erro: any) {
      console.error("Erro ao atualizar médico:", erro);

      if (erro.message.includes("401") || erro.message.includes("403")) {
        navigate("/dashboard");
        return;
      }

      setErro("Falha ao atualizar o médico. Tente novamente mais tarde.");
    }
  };

  // === UI ===
  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm mb-6">
          <p className="text-sm text-red-700">{erro}</p>
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

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Atualizar Médico</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CRM *</label>
                <input
                  type="text"
                  name="crm"
                  value={formData.crm}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade *</label>
                <input
                  type="text"
                  name="especialidade"
                  value={formData.especialidade}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="ferias">Férias</option>
                  <option value="afastado">Afastado</option>
                </select>
              </div>
            </div>

            {/* Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="flex gap-4">
                <div className="w-1/4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">DDD</label>
                  <input
                    type="text"
                    name="ddd"
                    value={formData.telefone?.ddd || ""}
                    onChange={handleChange}
                    maxLength={2}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="w-3/4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.telefone?.numero || ""}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Telefone</label>
                <select
                  name="tipoDeTelefone"
                  value={formData.telefone?.tipoDeTelefone || "celular"}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="celular">Celular</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contato Preferencial</label>
                <select
                  name="contatoPreferencial"
                  value={formData.contatoPreferencial}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="ligacao">Ligação</option>
                  <option value="email">E-mail</option>
                  <option value="sms">SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Atendimento</label>
                <input
                  type="text"
                  name="horarioAtendimento"
                  value={formData.horarioAtendimento}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex: Seg-Sex 08:00-18:00"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AtualizarMedicoForm;
