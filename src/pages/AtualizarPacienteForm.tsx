// src/pages/AtualizarPacienteForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

interface Paciente {
  id: number;
  nome: string;
  email: string;
  sexo: string;
  status: string;
  consultasRestantes: number;
  faltas: number;
  possuiDeficiencia: boolean;
  tipoDeficiencia: string | null;
  videoEnviado: boolean;
  dataNascimento: string;
  preferenciaContato: string;
  telefone: {
    ddd: string;
    numero: string;
    tipoDeTelefone: string;
  };
  endereco: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    estado: string;
  };
  acompanhante: {
    nome: string;
    email: string;
    parentesco: string;
    telefone: {
      ddd: string;
      numero: string;
      tipoDeTelefone: string;
    };
  };
}

const AtualizarPacienteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Paciente | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // === Buscar paciente pelo ID ===
  useEffect(() => {
    const carregarPaciente = async () => {
      try {
        setCarregando(true);
        setErro("");
        const paciente = await api.pacientes.buscarPorId(Number(id));
        if (!paciente) throw new Error("Paciente não encontrado.");

        setFormData({
          ...paciente,
          telefone: paciente.telefone || { ddd: "", numero: "", tipoDeTelefone: "CELULAR" },
          endereco: paciente.endereco || { cep: "", logradouro: "", complemento: "", bairro: "", estado: "" },
          acompanhante: paciente.acompanhante || {
            nome: "",
            email: "",
            parentesco: "",
            telefone: { ddd: "", numero: "", tipoDeTelefone: "CELULAR" },
          },
        });
      } catch (erro: any) {
        console.error("Erro ao carregar paciente:", erro);
        if (erro.message.includes("401") || erro.message.includes("403")) {
          navigate("/dashboard");
          return;
        }
        setErro(erro.message || "Erro ao carregar dados do paciente.");
      } finally {
        setCarregando(false);
      }
    };

    if (id) carregarPaciente();
  }, [id, navigate]);

  // === Atualizar campos ===
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;
    const { name, value, type, checked } = e.target as any;

    // Checkbox
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      if (!prev) return prev;

      // Atualiza campos aninhados dinamicamente
      const keys = name.split(".");
      if (keys.length === 1) return { ...prev, [name]: val };

      const [group, subfield, subsubfield] = keys;
      const updated = { ...prev };

      if (group === "telefone" && subfield) {
        updated.telefone = { ...prev.telefone, [subfield]: val };
      } else if (group === "endereco" && subfield) {
        updated.endereco = { ...prev.endereco, [subfield]: val };
      } else if (group === "acompanhante" && subfield) {
        if (subsubfield) {
          updated.acompanhante.telefone = {
            ...prev.acompanhante.telefone,
            [subsubfield]: val,
          };
        } else {
          updated.acompanhante = { ...prev.acompanhante, [subfield]: val };
        }
      }

      return updated;
    });
  };

  // === Submeter atualização ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    // Normaliza e validações mínimas
    const agora = new Date().toISOString();

    // Garantir objetos aninhados existirem
    const telefone = {
      ddd: formData.telefone?.ddd ?? '',
      numero: formData.telefone?.numero ?? '',
      tipoDeTelefone: (formData.telefone?.tipoDeTelefone ?? 'CELULAR').toUpperCase(),
    };

    const endereco = {
      cep: formData.endereco?.cep ?? '',
      logradouro: formData.endereco?.logradouro ?? '',
      complemento: formData.endereco?.complemento ?? '',
      bairro: formData.endereco?.bairro ?? '',
      estado: (formData.endereco?.estado ?? '').toUpperCase(),
    };

    const acompanhanteTelefone = {
      ddd: formData.acompanhante?.telefone?.ddd ?? '',
      numero: formData.acompanhante?.telefone?.numero ?? '',
      tipoDeTelefone: (formData.acompanhante?.telefone?.tipoDeTelefone ?? 'CELULAR').toUpperCase(),
    };

    // Mapeamento preferenciaContato
    const preferenciaContato =
      (formData.preferenciaContato ?? formData.preferenciaContato) === 'whatsapp'
        ? 'WhatsApp'
        : (formData.preferenciaContato ?? '').toLowerCase() === 'ligacao'
        ? 'Ligacao'
        : (formData.preferenciaContato ?? '').toLowerCase() === 'email'
        ? 'Email'
        : 'SMS';

    const payload = {
      nome: formData.nome,
      email: formData.email,
      sexo:
        formData.sexo === 'masculino'
          ? 'M'
          : formData.sexo === 'feminino'
          ? 'F'
          : 'O',
      status: (formData.status ?? 'ATIVO').toString().toUpperCase(),
      consultasRestantes: Number(formData.consultasRestantes) || 0,
      faltas: Number(formData.faltas) || 0,
      possuiDeficiencia: Boolean(formData.possuiDeficiencia),
      tipoDeficiencia: formData.tipoDeficiencia ?? null,
      videoEnviado: Boolean(formData.videoEnviado),
      dataNascimento: formData.dataNascimento ?? null,
      preferenciaContato,
      dataCadastro: agora,
      ultimaAtualizacao: agora,
      telefone,
      endereco,
      acompanhante: {
        nome: formData.acompanhante?.nome ?? null,
        email: formData.acompanhante?.email ?? null,
        parentesco: formData.acompanhante?.parentesco ?? null,
        telefone: acompanhanteTelefone,
        dataCadastro: agora,
      },
    };

    // Log completo antes do envio (essencial para depurar 400)
    console.log('-> Enviando payload para atualização de paciente:', payload);

    // Validações mínimas antes do envio (ajuste conforme regras do backend)
    // Exemplo: nome e email obrigatórios, telefone.ddd e numero se existirem, estado tem 2 chars
    if (!payload.nome || !payload.email) {
      setErro('Nome e e-mail são obrigatórios.');
      return;
    }
    if (endereco.estado && endereco.estado.length !== 2) {
      setErro('Estado deve ser a sigla com 2 caracteres (ex: SP, RJ).');
      return;
    }

    try {
      await api.pacientes.atualizar(Number(id), payload);
      alert('Paciente atualizado com sucesso!');
      navigate('/dashboard');
    } catch (erro: any) {
      // agora api.request já loga o body do erro; aqui mostramos no UI também
      console.error('Erro ao atualizar paciente (detalhe):', erro);
      setErro(
        erro?.message && typeof erro.message === 'string'
          ? `Erro do servidor: ${erro.message}`
          : 'Falha ao atualizar o paciente. Tente novamente mais tarde.'
      );

      // Se backend retornar 401/403 via mensagem, redireciona p/ dashboard
      if (erro?.message?.includes('401') || erro?.message?.includes('403')) {
        navigate('/dashboard');
        return;
      }
    }
  };


  if (carregando)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-400 border-t-transparent rounded-full"></div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Atualizar Paciente</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* DADOS PRINCIPAIS */}
            <section>
              <h2 className="text-lg font-semibold mb-4 text-indigo-700">Dados do Paciente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" className="p-3 border rounded-lg" />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="p-3 border rounded-lg" />
                <select name="sexo" value={formData.sexo} onChange={handleChange} className="p-3 border rounded-lg">
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
                <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" className="p-3 border rounded-lg" />
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="p-3 border rounded-lg" />
                <select name="preferenciaContato" value={formData.preferenciaContato} onChange={handleChange} className="p-3 border rounded-lg">
                  <option value="whatsapp">WhatsApp</option>
                  <option value="ligacao">Ligação</option>
                  <option value="email">E-mail</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
            </section>

            {/* TELEFONE */}
            <section>
              <h2 className="text-lg font-semibold mb-4 text-indigo-700">Telefone</h2>
              <div className="grid grid-cols-3 gap-6">
                <input name="telefone.ddd" value={formData.telefone.ddd} onChange={handleChange} placeholder="DDD" className="p-3 border rounded-lg" />
                <input name="telefone.numero" value={formData.telefone.numero} onChange={handleChange} placeholder="Número" className="p-3 border rounded-lg" />
                <select name="telefone.tipoDeTelefone" value={formData.telefone.tipoDeTelefone} onChange={handleChange} className="p-3 border rounded-lg">
                  <option value="CELULAR">Celular</option>
                  <option value="RESIDENCIAL">Residencial</option>
                  <option value="COMERCIAL">Comercial</option>
                </select>
              </div>
            </section>

            {/* ENDEREÇO */}
            <section>
              <h2 className="text-lg font-semibold mb-4 text-indigo-700">Endereço</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="endereco.cep" value={formData.endereco.cep} onChange={handleChange} placeholder="CEP" className="p-3 border rounded-lg" />
                <input name="endereco.logradouro" value={formData.endereco.logradouro} onChange={handleChange} placeholder="Logradouro" className="p-3 border rounded-lg" />
                <input name="endereco.complemento" value={formData.endereco.complemento} onChange={handleChange} placeholder="Complemento" className="p-3 border rounded-lg" />
                <input name="endereco.bairro" value={formData.endereco.bairro} onChange={handleChange} placeholder="Bairro" className="p-3 border rounded-lg" />
                <input name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} placeholder="Estado" className="p-3 border rounded-lg" />
              </div>
            </section>

            {/* DADOS DE SAÚDE */}
            <section>
              <h2 className="text-lg font-semibold mb-4 text-indigo-700">Informações Adicionais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="number" name="consultasRestantes" value={formData.consultasRestantes} onChange={handleChange} placeholder="Consultas Restantes" className="p-3 border rounded-lg" />
                <input type="number" name="faltas" value={formData.faltas} onChange={handleChange} placeholder="Faltas" className="p-3 border rounded-lg" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="possuiDeficiencia" checked={formData.possuiDeficiencia} onChange={handleChange} />
                  <label>Possui deficiência?</label>
                </div>
                <input name="tipoDeficiencia" value={formData.tipoDeficiencia || ""} onChange={handleChange} placeholder="Tipo de deficiência" className="p-3 border rounded-lg" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="videoEnviado" checked={formData.videoEnviado} onChange={handleChange} />
                  <label>Vídeo enviado?</label>
                </div>
              </div>
            </section>

            {/* ACOMPANHANTE */}
            <section>
              <h2 className="text-lg font-semibold mb-4 text-indigo-700">Acompanhante</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="acompanhante.nome" value={formData.acompanhante.nome} onChange={handleChange} placeholder="Nome" className="p-3 border rounded-lg" />
                <input name="acompanhante.email" value={formData.acompanhante.email} onChange={handleChange} placeholder="E-mail" className="p-3 border rounded-lg" />
                <input name="acompanhante.parentesco" value={formData.acompanhante.parentesco} onChange={handleChange} placeholder="Parentesco" className="p-3 border rounded-lg" />
                <div className="grid grid-cols-3 gap-4">
                  <input name="acompanhante.telefone.ddd" value={formData.acompanhante.telefone.ddd} onChange={handleChange} placeholder="DDD" className="p-3 border rounded-lg" />
                  <input name="acompanhante.telefone.numero" value={formData.acompanhante.telefone.numero} onChange={handleChange} placeholder="Número" className="p-3 border rounded-lg" />
                  <select name="acompanhante.telefone.tipoDeTelefone" value={formData.acompanhante.telefone.tipoDeTelefone} onChange={handleChange} className="p-3 border rounded-lg">
                    <option value="CELULAR">Celular</option>
                    <option value="RESIDENCIAL">Residencial</option>
                    <option value="COMERCIAL">Comercial</option>
                  </select>
                </div>
              </div>
            </section>

            {/* AÇÕES */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button type="button" onClick={() => navigate("/dashboard")} className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AtualizarPacienteForm;
