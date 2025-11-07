import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const PacienteForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    sexo: '',
    dataNascimento: '',
    status: 'ativo',
    consultasRestantes: 0,
    faltas: 0,
    possuiDeficiencia: false,
    tipoDeficiencia: '',
    videoEnviado: false,
    preferenciaContato: 'whatsapp',
    dataCadastro: new Date().toLocaleDateString('en-CA'),
    ultimaAtualizacao: new Date().toLocaleDateString('en-CA'),

    telefone: { ddd: '', numero: '', tipoDeTelefone: 'celular' },
    endereco: { cep: '', logradouro: '', complemento: '', bairro: '', estado: '' },
    acompanhante: {
      nome: '',
      email: '',
      parentesco: '',
      dataCadastro: new Date().toLocaleDateString('en-CA'),
      telefone: { ddd: '', numero: '', tipoDeTelefone: 'CELULAR' }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.');

      setFormData(prev => {
        const prevAny = prev as any;
        if (subChild) {
          // Ex: acompanhante.telefone.ddd
          return {
            ...prev,
            [parent]: {
              ...prevAny[parent],
              [child]: {
                ...prevAny[parent][child],
                [subChild]: value
              }
            }
          };
        } else {
          // Ex: telefone.ddd ou endereco.cep
          return {
            ...prev,
            [parent]: {
              ...prevAny[parent],
              [child]: type === 'checkbox' ? checked : value
            }
          };
        }
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converter datas para formato ISO completo
    const agora = new Date().toISOString().split('.')[0]; // remove milissegundos

    const payload = {
      nome: formData.nome,
      email: formData.email,
      sexo: formData.sexo === 'masculino' ? 'M' : formData.sexo === 'feminino' ? 'F' : 'O',
      status: formData.status.toUpperCase(),
      consultasRestantes: Number(formData.consultasRestantes) || 0,
      faltas: Number(formData.faltas) || 0,
      possuiDeficiencia: formData.possuiDeficiencia || false,
      tipoDeficiencia: formData.tipoDeficiencia || null,
      videoEnviado: formData.videoEnviado || false,
      dataNascimento: formData.dataNascimento,
      preferenciaContato: 
        formData.preferenciaContato === 'whatsapp'
          ? 'WhatsApp'
          : formData.preferenciaContato === 'ligacao'
          ? 'Ligacao'
          : formData.preferenciaContato === 'email'
          ? 'Email'
          : 'SMS',
      dataCadastro: agora,
      ultimaAtualizacao: agora,

      telefone: {
        ddd: formData.telefone.ddd,
        numero: formData.telefone.numero,
        tipoDeTelefone: formData.telefone.tipoDeTelefone.toUpperCase(),
      },

      endereco: {
        cep: formData.endereco.cep,
        logradouro: formData.endereco.logradouro,
        complemento: formData.endereco.complemento,
        bairro: formData.endereco.bairro,
        estado: formData.endereco.estado,
      },

      acompanhante: {
        nome: formData.acompanhante.nome,
        email: formData.acompanhante.email,
        parentesco: formData.acompanhante.parentesco,
        telefone: {
          ddd: formData.acompanhante.telefone.ddd,
          numero: formData.acompanhante.telefone.numero,
          tipoDeTelefone: (formData.acompanhante.telefone.tipoDeTelefone || 'CELULAR').toUpperCase(),
        },
        dataCadastro: agora,
      },
    };

    try {
      const response = await api.pacientes.criar(payload);
      console.log('✅ Paciente cadastrado com sucesso:', response);
      alert('Paciente cadastrado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Erro ao cadastrar paciente:', error);
      alert('Erro ao cadastrar paciente. Veja o console para detalhes.');
    }
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
            <section>
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
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Contato
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="telefone.ddd"
                  value={formData.telefone.ddd}
                  onChange={handleChange}
                  placeholder="DDD"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="telefone.numero"
                  value={formData.telefone.numero}
                  onChange={handleChange}
                  placeholder="Número"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <select
                  name="telefone.tipoDeTelefone"
                  value={formData.telefone.tipoDeTelefone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="celular">Celular</option>
                  <option value="fixo">Fixo</option>
                </select>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </section>

            {/* Endereço */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Endereço
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="endereco.logradouro"
                  value={formData.endereco.logradouro}
                  onChange={handleChange}
                  placeholder="Rua, número"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="endereco.bairro"
                  value={formData.endereco.bairro}
                  onChange={handleChange}
                  placeholder="Bairro"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="endereco.complemento"
                  value={formData.endereco.complemento}
                  onChange={handleChange}
                  placeholder="Complemento"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="endereco.cep"
                  value={formData.endereco.cep}
                  onChange={handleChange}
                  placeholder="CEP"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </section>

            {/* Acompanhante */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                Acompanhante
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="acompanhante.nome"
                  value={formData.acompanhante.nome}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  name="acompanhante.email"
                  value={formData.acompanhante.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="acompanhante.telefone.ddd"
                  value={formData.acompanhante.telefone.ddd}
                  onChange={handleChange}
                  placeholder="DDD"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="acompanhante.telefone.numero"
                  value={formData.acompanhante.telefone.numero}
                  onChange={handleChange}
                  placeholder="Número"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="acompanhante.parentesco"
                  value={formData.acompanhante.parentesco}
                  onChange={handleChange}
                  placeholder="Parentesco"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </section>

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
                disabled={loading}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
              >
                {loading ? 'Salvando...' : 'Salvar Paciente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PacienteForm;
