import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PacienteForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    status: 'ativo',
    dataCadastro: new Date().toISOString().split('T')[0],
    ultimaAtualizacao: new Date().toISOString().split('T')[0],
    
    // Contato
    telefoneDDD: '',
    telefoneNumero: '',
    tipoTelefone: 'celular',
    email: '',
    contatoPreferencial: 'whatsapp',
    
    // Endereço
    endereco: '',
    complemento: '',
    bairro: '',
    estado: '',
    cep: '',
    
    // Dados adicionais
    consultasRestantes: 0,
    faltas: 0,
    possuiDeficiencia: false,
    tipoDeficiencia: '',
    videoEnviado: false,
    
    // Acompanhante
    acompanhante: {
      nome: '',
      ddd: '',
      telefone: '',
      grauParentesco: '',
      email: '',
      dataCadastro: new Date().toISOString().split('T')[0]
    }
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do paciente:', formData);
    alert('Paciente cadastrado com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
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
                <h1 className="text-3xl font-bold text-gray-800">Cadastro de Paciente</h1>
                <p className="text-gray-600">Preencha os dados do paciente</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Digite o nome completo"
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
                    placeholder="000.000.000-00"
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
              </div>
            </div>

            {/* Contato */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                  <input
                    type="text"
                    name="telefoneNumero"
                    value={formData.telefoneNumero}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Telefone *</label>
                  <select
                    name="tipoTelefone"
                    value={formData.tipoTelefone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  >
                    <option value="celular">Celular</option>
                    <option value="fixo">Fixo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contato Preferencial</label>
                  <select
                    name="contatoPreferencial"
                    value={formData.contatoPreferencial}
                    onChange={handleChange}
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
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Endereço
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Rua, número"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Apartamento, bloco, etc."
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
                    placeholder="Bairro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                    <option value="">Selecione</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>

            {/* Dados Adicionais */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Dados Adicionais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="em_espera">Em espera</option>
                  </select>
                </div>
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
                    Possui Deficiência
                  </label>
                </div>
                {formData.possuiDeficiencia && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Deficiência</label>
                    <input
                      type="text"
                      name="tipoDeficiencia"
                      value={formData.tipoDeficiencia}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Especifique o tipo de deficiência"
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
                    Vídeo Enviado
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Cadastro</label>
                  <input
                    type="date"
                    name="dataCadastro"
                    value={formData.dataCadastro}
                    onChange={handleChange}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Última Atualização</label>
                  <input
                    type="date"
                    name="ultimaAtualizacao"
                    value={formData.ultimaAtualizacao}
                    onChange={handleChange}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Dados do Acompanhante */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                Dados do Acompanhante
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
                    placeholder="Nome completo do acompanhante"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">DDD</label>
                  <input
                    type="text"
                    name="acompanhante.ddd"
                    value={formData.acompanhante.ddd}
                    onChange={handleChange}
                    maxLength={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="text"
                    name="acompanhante.telefone"
                    value={formData.acompanhante.telefone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grau de Parentesco</label>
                  <input
                    type="text"
                    name="acompanhante.grauParentesco"
                    value={formData.acompanhante.grauParentesco}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Ex: Pai, Mãe, Filho(a), etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail do Acompanhante</label>
                  <input
                    type="email"
                    name="acompanhante.email"
                    value={formData.acompanhante.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Cadastro</label>
                  <input
                    type="date"
                    name="acompanhante.dataCadastro"
                    value={formData.acompanhante.dataCadastro}
                    onChange={handleChange}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
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
              >
                Salvar Paciente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PacienteForm;