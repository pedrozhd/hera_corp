import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { MedicoFormData } from "../interfaces";
import { useToast } from "../contexts/ToastContext";

const MedicoForm = () => {
  const [loading, setLoading] = useState(false);
  const [, setErro] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState<MedicoFormData>({
    nome: "",
    crm: "",
    especialidade: "",
    status: "ativo",
    dataCadastro: new Date().toISOString().split("T")[0],
    ultimaAtualizacao: new Date().toISOString().split("T")[0],
    telefoneDDD: "",
    telefoneNumero: "",
    tipoTelefone: "celular",
    email: "",
    contatoPreferencial: "whatsapp",
    horarioAtendimento: "",
  });

  // Manipulador de mudança de inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      if (!formData.nome || !formData.crm || !formData.email) {
        toast.warning("Preencha todos os campos obrigatórios!");
        setLoading(false);
        return;
      }

      // ✅ Monta payload conforme backend espera
      const payload = {
        nome: formData.nome,
        crm: formData.crm,
        especialidade: formData.especialidade,
        email: formData.email,
        status: formData.status,
        telefone: {
          ddd: formData.telefoneDDD,
          numero: formData.telefoneNumero,
          tipoDeTelefone: formData.tipoTelefone,
        },
        contatoPreferencial: formData.contatoPreferencial,
        horarioAtendimento: formData.horarioAtendimento,
      };

      // ✅ Chamada à API
      await api.medicos.criar(payload);

      toast.success("Médico cadastrado com sucesso!");

      // ✅ Reseta o formulário
      setFormData({
        nome: "",
        crm: "",
        especialidade: "",
        status: "ativo",
        dataCadastro: new Date().toISOString().split("T")[0],
        ultimaAtualizacao: new Date().toISOString().split("T")[0],
        telefoneDDD: "",
        telefoneNumero: "",
        tipoTelefone: "celular",
        email: "",
        contatoPreferencial: "whatsapp",
        horarioAtendimento: "",
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao cadastrar médico:", err);
      const msg = err instanceof Error ? err.message : "Erro ao cadastrar médico.";
      setErro(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Cadastro de Médico
                </h1>
                <p className="text-gray-600">Preencha os dados do médico</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Profissionais */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  1
                </span>
                Dados Profissionais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CRM *
                  </label>
                  <input
                    type="text"
                    name="crm"
                    value={formData.crm}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="CRM/UF 000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidade *
                  </label>
                  <select
                    name="especialidade"
                    value={formData.especialidade}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  >
                    <option value="">Selecione</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Dermatologia">Dermatologia</option>
                    <option value="Fisioterapia">Fisioterapia</option>
                    <option value="Neurologia">Neurologia</option>
                    <option value="Ortopedia">Ortopedia</option>
                    <option value="Pediatria">Pediatria</option>
                    <option value="Psiquiatria">Psiquiatria</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DDD *
                  </label>
                  <input
                    type="text"
                    name="telefoneDDD"
                    value={formData.telefoneDDD}
                    onChange={handleChange}
                    required
                    maxLength={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    name="telefoneNumero"
                    value={formData.telefoneNumero}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Telefone *
                  </label>
                  <select
                    name="tipoTelefone"
                    value={formData.tipoTelefone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    required
                  >
                    <option value="celular">Celular</option>
                    <option value="fixo">Fixo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contato Preferencial
                  </label>
                  <select
                    name="contatoPreferencial"
                    value={formData.contatoPreferencial}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="ligacao">Ligação</option>
                    <option value="email">E-mail</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status / Datas / Horário */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  required
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="ferias">Férias</option>
                  <option value="afastado">Afastado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Cadastro
                </label>
                <input
                  type="date"
                  name="dataCadastro"
                  value={formData.dataCadastro}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Última Atualização
                </label>
                <input
                  type="date"
                  name="ultimaAtualizacao"
                  value={formData.ultimaAtualizacao}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  4
                </span>
                Horário de Atendimento
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário
                  </label>
                  <input
                    type="text"
                    name="horarioAtendimento"
                    value={formData.horarioAtendimento}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="Ex: Segunda a Sexta, 08:00 - 18:00"
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-800 transition shadow-lg hover:shadow-xl"
              >
                {loading ? "Salvando..." : "Salvar Médico"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicoForm;