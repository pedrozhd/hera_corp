import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Interfaces para os tipos
interface Paciente {
  id: string;
  nome: string;
  cpf: string;
}

interface Medico {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
}

interface Consulta {
  id: string;
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

const AtualizarConsultaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [formData, setFormData] = useState<Omit<Consulta, 'id' | 'dataCadastro' | 'ultimaAtualizacao'>>({
    paciente: '',
    medico: '',
    data: '',
    horario: '',
    tipo: '',
    status: 'agendada',
    linkTeleconsulta: '',
    observacoes: '',
  });

  // Simulação de carregamento de dados iniciais
  useEffect(() => {
    // TODO: Substituir por chamadas à API
    const carregarDados = async () => {
      // Dados mockados para exemplo
      const pacientesMock: Paciente[] = [
        { id: '1', nome: 'João da Silva', cpf: '123.456.789-00' },
        { id: '2', nome: 'Maria Oliveira', cpf: '987.654.321-00' },
      ];

      const medicosMock: Medico[] = [
        { id: '1', nome: 'Dr. Carlos Andrade', crm: 'CRM/SP 123456', especialidade: 'Cardiologia' },
        { id: '2', nome: 'Dra. Ana Paula', crm: 'CRM/SP 654321', especialidade: 'Dermatologia' },
      ];

      // Simula carregamento da consulta
      if (id) {
        // TODO: Substituir por chamada à API para buscar a consulta pelo ID
        const consultaMock: Consulta = {
          id,
          paciente: '1',
          medico: '1',
          data: '2023-12-15',
          horario: '14:30',
          tipo: 'presencial',
          status: 'agendada',
          linkTeleconsulta: 'https://meet.heraclinicadigital.com.br/consulta-abc123',
          observacoes: 'Paciente com histórico de alergia a medicamentos',
          dataCadastro: '2023-10-01',
          ultimaAtualizacao: '2023-10-01',
        };
        setConsulta(consultaMock);
        const { id: _, dataCadastro, ultimaAtualizacao, ...dadosConsulta } = consultaMock;
        setFormData(dadosConsulta);
      }

      setPacientes(pacientesMock);
      setMedicos(medicosMock);
    };

    carregarDados();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar chamada à API para atualizar a consulta
    console.log('Dados atualizados da consulta:', { id, ...formData });
    alert('Consulta atualizada com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Atualizar Consulta</h1>
                <p className="text-sm text-gray-500">Atualize os dados da consulta</p>
              </div>
            </div>
          </div>

          {consulta ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados da Consulta */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Dados da Consulta</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paciente *</label>
                    <select
                      name="paciente"
                      value={formData.paciente}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="">Selecione o paciente</option>
                      {pacientes.map((paciente) => (
                        <option key={paciente.id} value={paciente.id}>
                          {paciente.nome} - {paciente.cpf}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Médico *</label>
                    <select
                      name="medico"
                      value={formData.medico}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="">Selecione o médico</option>
                      {medicos.map((medico) => (
                        <option key={medico.id} value={medico.id}>
                          {medico.nome} - {medico.especialidade}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
                    <input
                      type="date"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horário *</label>
                    <input
                      type="time"
                      name="horario"
                      value={formData.horario}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Consulta *</label>
                    <select
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="presencial">Presencial</option>
                      <option value="telemedicina">Telemedicina</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="agendada">Agendada</option>
                      <option value="confirmada">Confirmada</option>
                      <option value="realizada">Realizada</option>
                      <option value="cancelada">Cancelada</option>
                      <option value="faltou">Paciente não compareceu</option>
                    </select>
                  </div>

                  {formData.tipo === 'telemedicina' && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Link da Teleconsulta</label>
                      <input
                        type="url"
                        name="linkTeleconsulta"
                        value={formData.linkTeleconsulta}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="https://meet.heraclinicadigital.com.br/consulta-abc123"
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                    <textarea
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Informações adicionais sobre a consulta"
                    />
                  </div>
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
                  className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando dados da consulta...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AtualizarConsultaForm;