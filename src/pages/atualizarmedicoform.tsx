import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface para o tipo Medico
interface Medico {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
  status: string;
  telefoneDDD: string;
  telefoneNumero: string;
  tipoTelefone: string;
  email: string;
  contatoPreferencial: string;
  horarioAtendimento: string;
  dataCadastro: string;
  ultimaAtualizacao: string;
}

const AtualizarMedicoForm = () => {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState<string>('');
  const [formData, setFormData] = useState<Omit<Medico, 'id'>>({
    nome: '',
    crm: '',
    especialidade: '',
    status: 'ativo',
    telefoneDDD: '',
    telefoneNumero: '',
    tipoTelefone: 'celular',
    email: '',
    contatoPreferencial: 'whatsapp',
    horarioAtendimento: '',
    dataCadastro: new Date().toISOString().split('T')[0],
    ultimaAtualizacao: new Date().toISOString().split('T')[0],
  });

  // Simulação de carregamento de médicos (substituir por chamada à API)
  useEffect(() => {
    // TODO: Substituir por chamada à API para buscar médicos
    const medicosMock: Medico[] = [
      {
        id: '1',
        nome: 'Dr. João Silva',
        crm: 'CRM/SP 123456',
        especialidade: 'Cardiologia',
        status: 'ativo',
        telefoneDDD: '11',
        telefoneNumero: '987654321',
        tipoTelefone: 'celular',
        email: 'joao.silva@exemplo.com',
        contatoPreferencial: 'whatsapp',
        horarioAtendimento: '08:00 - 18:00',
        dataCadastro: '2023-01-01',
        ultimaAtualizacao: '2023-10-01',
      },
      // Adicione mais médicos mockados se necessário
    ];
    
    setMedicos(medicosMock);
  }, []);

  // Atualiza o formulário quando um médico é selecionado
  useEffect(() => {
    if (medicoSelecionado) {
      const medico = medicos.find(m => m.id === medicoSelecionado);
      if (medico) {
        const { id, ...dadosMedico } = medico;
        setFormData(dadosMedico);
      }
    }
  }, [medicoSelecionado, medicos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar chamada à API para atualizar o médico
    console.log('Dados atualizados do médico:', { id: medicoSelecionado, ...formData });
    alert('Médico atualizado com sucesso!');
    navigate('/dashboard');
  };

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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Atualizar Médico</h1>
          </div>

          {/* Seletor de Médico */}
          <div className="mb-8 bg-indigo-50 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Selecione o Médico</h2>
            <select
              value={medicoSelecionado}
              onChange={(e) => setMedicoSelecionado(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Selecione um médico...</option>
              {medicos.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  {medico.nome} - {medico.especialidade} - {medico.crm}
                </option>
              ))}
            </select>
          </div>

          {medicoSelecionado && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Dados Pessoais</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                      <option value="ferias">Férias</option>
                      <option value="afastado">Afastado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-6 pt-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Contato</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-1/4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">DDD *</label>
                      <input
                        type="text"
                        name="telefoneDDD"
                        value={formData.telefoneDDD}
                        onChange={handleChange}
                        maxLength={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="11"
                        required
                      />
                    </div>
                    <div className="w-3/4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                      <input
                        type="tel"
                        name="telefoneNumero"
                        value={formData.telefoneNumero}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="98765-4321"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Telefone *</label>
                    <select
                      name="tipoTelefone"
                      value={formData.tipoTelefone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="celular">Celular</option>
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contato Preferencial *</label>
                    <select
                      name="contatoPreferencial"
                      value={formData.contatoPreferencial}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: Seg-Sex 08:00-18:00"
                    />
                  </div>
                </div>
              </div>

              {/* Datas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Cadastro</label>
                  <input
                    type="date"
                    name="dataCadastro"
                    value={formData.dataCadastro}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Última Atualização</label>
                  <input
                    type="date"
                    name="ultimaAtualizacao"
                    value={formData.ultimaAtualizacao}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AtualizarMedicoForm;