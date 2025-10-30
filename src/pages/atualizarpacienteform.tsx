import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface para o tipo Paciente
interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  status: string;
  telefoneDDD: string;
  telefoneNumero: string;
  tipoTelefone: string;
  email: string;
  endereco: string;
  complemento: string;
  bairro: string;
  estado: string;
  cep: string;
  consultasRestantes: number;
  faltas: number;
  possuiDeficiencia: boolean;
  tipoDeficiencia: string;
  videoEnviado: boolean;
  contatoPreferencial: string;
  dataCadastro: string;
  ultimaAtualizacao: string;
  acompanhante: {
    nome: string;
    ddd: string;
    telefone: string;
    grauParentesco: string;
    email: string;
    dataCadastro: string;
  };
}

const AtualizarPacienteForm = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<string>('');
  const [formData, setFormData] = useState<Omit<Paciente, 'id'>>({
    nome: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    status: 'ativo',
    telefoneDDD: '',
    telefoneNumero: '',
    tipoTelefone: 'celular',
    email: '',
    endereco: '',
    complemento: '',
    bairro: '',
    estado: '',
    cep: '',
    consultasRestantes: 0,
    faltas: 0,
    possuiDeficiencia: false,
    tipoDeficiencia: '',
    videoEnviado: false,
    contatoPreferencial: 'whatsapp',
    dataCadastro: '',
    ultimaAtualizacao: new Date().toISOString().split('T')[0],
    acompanhante: {
      nome: '',
      ddd: '',
      telefone: '',
      grauParentesco: '',
      email: '',
      dataCadastro: new Date().toISOString().split('T')[0]
    }
  });

  // Simulação de busca de pacientes (substitua por uma chamada à sua API)
  useEffect(() => {
    // Exemplo de dados mockados - substitua por uma chamada à sua API
    const fetchPacientes = async () => {
      try {
        // Substitua esta linha por uma chamada real à sua API
        // const response = await api.get('/api/pacientes');
        // setPacientes(response.data);
        
        // Dados mockados para exemplo
        setPacientes([
          {
            id: '1',
            nome: 'João Silva',
            cpf: '123.456.789-00',
            dataNascimento: '1990-01-01',
            sexo: 'masculino',
            status: 'ativo',
            telefoneDDD: '11',
            telefoneNumero: '987654321',
            tipoTelefone: 'celular',
            email: 'joao@exemplo.com',
            endereco: 'Rua Exemplo, 123',
            complemento: 'Apto 101',
            bairro: 'Centro',
            estado: 'SP',
            cep: '01001-000',
            consultasRestantes: 5,
            faltas: 0,
            possuiDeficiencia: false,
            tipoDeficiencia: '',
            videoEnviado: true,
            contatoPreferencial: 'whatsapp',
            dataCadastro: '2023-01-01',
            ultimaAtualizacao: '2023-10-01',
            acompanhante: {
              nome: 'Maria Silva',
              ddd: '11',
              telefone: '912345678',
              grauParentesco: 'Cônjuge',
              email: 'maria@exemplo.com',
              dataCadastro: '2023-01-01'
            }
          }
          // Adicione mais pacientes conforme necessário
        ]);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  // Carrega os dados do paciente selecionado
  useEffect(() => {
    if (pacienteSelecionado) {
      const paciente = pacientes.find(p => p.id === pacienteSelecionado);
      if (paciente) {
        const { id, ...dadosPaciente } = paciente;
        setFormData(dadosPaciente);
      }
    } else {
      // Limpa o formulário se nenhum paciente estiver selecionado
      setFormData({
        nome: '',
        cpf: '',
        dataNascimento: '',
        sexo: '',
        status: 'ativo',
        telefoneDDD: '',
        telefoneNumero: '',
        tipoTelefone: 'celular',
        email: '',
        endereco: '',
        complemento: '',
        bairro: '',
        estado: '',
        cep: '',
        consultasRestantes: 0,
        faltas: 0,
        possuiDeficiencia: false,
        tipoDeficiencia: '',
        videoEnviado: false,
        contatoPreferencial: 'whatsapp',
        dataCadastro: '',
        ultimaAtualizacao: new Date().toISOString().split('T')[0],
        acompanhante: {
          nome: '',
          ddd: '',
          telefone: '',
          grauParentesco: '',
          email: '',
          dataCadastro: new Date().toISOString().split('T')[0]
        }
      });
    }
  }, [pacienteSelecionado, pacientes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('acompanhante.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        acompanhante: {
          ...prev.acompanhante,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Substitua por uma chamada real à sua API
      // await api.put(`/api/pacientes/${pacienteSelecionado}`, formData);
      alert('Paciente atualizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      alert('Erro ao atualizar paciente. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Cabeçalho */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Atualizar Paciente</h1>
                <p className="text-gray-600">Atualize os dados do paciente selecionado</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seletor de Paciente */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Selecionar Paciente
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Paciente *</label>
                <select
                  value={pacienteSelecionado}
                  onChange={(e) => setPacienteSelecionado(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                >
                  <option value="">Selecione um paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nome} - {paciente.cpf}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dados Pessoais */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sexo *</label>
                  <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="nao_informar">Prefiro não informar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="suspenso">Suspenso</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DDD *</label>
                    <input
                      type="text"
                      name="telefoneDDD"
                      value={formData.telefoneDDD}
                      onChange={handleChange}
                      required
                      maxLength={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="11"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                    <input
                      type="text"
                      name="telefoneNumero"
                      value={formData.telefoneNumero}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="987654321"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Telefone *</label>
                  <select
                    name="tipoTelefone"
                    value={formData.tipoTelefone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="celular">Celular</option>
                    <option value="fixo">Fixo</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contato Preferencial *</label>
                  <select
                    name="contatoPreferencial"
                    value={formData.contatoPreferencial}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="ligacao">Ligação</option>
                    <option value="email">E-mail</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Endereço
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">Selecione</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Dados Adicionais */}
            <div>
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                Dados Adicionais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultas Restantes</label>
                  <input
                    type="number"
                    name="consultasRestantes"
                    value={formData.consultasRestantes}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Faltas</label>
                  <input
                    type="number"
                    name="faltas"
                    value={formData.faltas}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="possuiDeficiencia"
                    name="possuiDeficiencia"
                    checked={formData.possuiDeficiencia}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="possuiDeficiencia" className="ml-2 block text-sm text-gray-700">
                    Possui deficiência
                  </label>
                </div>
                {formData.possuiDeficiencia && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Deficiência</label>
                    <input
                      type="text"
                      name="tipoDeficiencia"
                      value={formData.tipoDeficiencia}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="videoEnviado"
                    name="videoEnviado"
                    checked={formData.videoEnviado}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="videoEnviado" className="ml-2 block text-sm text-gray-700">
                    Vídeo enviado
                  </label>
                </div>
              </div>
            </div>

            {/* Acompanhante */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                Acompanhante
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Acompanhante</label>
                  <input
                    type="text"
                    name="acompanhante.nome"
                    value={formData.acompanhante.nome}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DDD</label>
                    <input
                      type="text"
                      name="acompanhante.ddd"
                      value={formData.acompanhante.ddd}
                      onChange={handleChange}
                      maxLength={2}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="11"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="text"
                      name="acompanhante.telefone"
                      value={formData.acompanhante.telefone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="987654321"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grau de Parentesco</label>
                  <input
                    type="text"
                    name="acompanhante.grauParentesco"
                    value={formData.acompanhante.grauParentesco}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Ex: Mãe, Pai, Filho(a), etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail do Acompanhante</label>
                  <input
                    type="email"
                    name="acompanhante.email"
                    value={formData.acompanhante.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Datas do Sistema */}
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><span className="font-medium">Data de Cadastro:</span> {formData.dataCadastro || 'Não informado'}</p>
                </div>
                <div>
                  <p><span className="font-medium">Última Atualização:</span> {formData.ultimaAtualizacao || 'Não informado'}</p>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
                disabled={!pacienteSelecionado}
              >
                Atualizar Paciente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AtualizarPacienteForm;