import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmacaoExclusao from '../components/ConfirmacaoExclusaoProps';
import api from '../services/api';

interface Paciente {
  id?: number;
  nome: string;
}

const ExcluirPaciente = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [paciente, setPaciente] = useState<Paciente>({ nome: '' });
  const [mensagemStatus, setMensagemStatus] = useState<string | null>(null);

  // Busca paciente ao carregar
  useEffect(() => {
    const buscarPaciente = async () => {
      if (!id) return;

      try {
        setCarregando(true);
        setMensagemStatus('Carregando informações do paciente...');

        const idNum = Number(id);
        if (Number.isNaN(idNum)) {
          throw new Error('ID inválido do paciente');
        }

        const resposta = await api.pacientes.buscarPorId(idNum);
        setPaciente(resposta);
      } catch (erro) {
        console.error('Erro ao carregar paciente:', erro);
        alert('Não foi possível carregar as informações do paciente.');
        navigate('/paciente');
      } finally {
        setCarregando(false);
        setMensagemStatus(null);
      }
    };

    buscarPaciente();
  }, [id, navigate]);

  // Exclusão real
  const handleExcluir = async () => {
    console.log('🟢 handleExcluir() chamado com ID:', id);
    try {
      setCarregando(true);
      setMensagemStatus('🔄 Enviando requisição para exclusão...');

      // Log para depuração
      console.log(`➡️ Enviando DELETE para /pacientes/${id}`);

      // Converte id para number e valida
      const idNum = Number(id);
      if (Number.isNaN(idNum)) {
        alert('ID do paciente inválido.');
        setMensagemStatus('ID do paciente inválido.');
        return;
      }

      // Chamada real à API
      await api.pacientes.excluir(idNum);

      setMensagemStatus('✅ Paciente excluído com sucesso!');
      alert('✅ Paciente excluído com sucesso!');
      navigate('/paciente', { state: { mensagem: 'Paciente excluído com sucesso!' } });
    } catch (erro) {
      console.error('❌ Erro ao excluir paciente:', erro);
      alert('❌ Ocorreu um erro ao tentar excluir o paciente. Verifique o console.');
      setMensagemStatus('Erro ao excluir paciente. Veja o console.');
    } finally {
      setCarregando(false);
      setTimeout(() => setMensagemStatus(null), 2500);
    }
  };

  return (
    <>
      {mensagemStatus && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
            <p className="text-gray-800 font-semibold">{mensagemStatus}</p>
          </div>
        </div>
      )}

      <ConfirmacaoExclusao
        titulo="Excluir Paciente"
        mensagem={
          paciente.nome
            ? `Tem certeza que deseja excluir o(a) paciente ${paciente.nome}? Esta ação não pode ser desfeita.`
            : 'Carregando informações do paciente...'
        }
        rotaRetorno="/paciente"
        onConfirmar={handleExcluir}
        carregando={carregando}
      />
    </>
  );
};

export default ExcluirPaciente;
