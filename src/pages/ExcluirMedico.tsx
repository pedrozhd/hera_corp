import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmacaoExclusao from '../components/ConfirmacaoExclusaoProps';
import api from '../services/api';

interface Medico {
  id?: number;
  nome: string;
}

const ExcluirMedico = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [medico, setMedico] = useState<Medico>({ nome: '' });
  const [mensagemStatus, setMensagemStatus] = useState<string | null>(null);

  // Busca médico ao carregar
  useEffect(() => {
    const buscarMedico = async () => {
      if (!id) return;

      try {
        setCarregando(true);
        setMensagemStatus('Carregando informações do médico...');

        const idNum = Number(id);
        if (Number.isNaN(idNum)) {
          throw new Error('ID inválido do médico');
        }

        const resposta = await api.medicos.buscarPorId(idNum);
        setMedico(resposta);
      } catch (erro) {
        console.error('Erro ao carregar médico:', erro);
        alert('Não foi possível carregar as informações do médico.');
        navigate('/medico');
      } finally {
        setCarregando(false);
        setMensagemStatus(null);
      }
    };

    buscarMedico();
  }, [id, navigate]);

  // Exclusão real
  const handleExcluir = async () => {
    console.log('🟢 handleExcluir() chamado com ID:', id);
    try {
      setCarregando(true);
      setMensagemStatus('🔄 Enviando requisição para exclusão...');

      const idNum = Number(id);
      if (Number.isNaN(idNum)) {
        alert('ID do médico inválido.');
        setMensagemStatus('ID do médico inválido.');
        return;
      }

      await api.medicos.excluir(idNum);

      setMensagemStatus('✅ Médico excluído com sucesso!');
      alert('✅ Médico excluído com sucesso!');
      navigate('/medico', { state: { mensagem: 'Médico excluído com sucesso!' } });
    } catch (erro) {
      console.error('❌ Erro ao excluir médico:', erro);
      alert('❌ Ocorreu um erro ao tentar excluir o médico. Verifique o console.');
      setMensagemStatus('Erro ao excluir médico. Veja o console.');
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
        titulo="Excluir Médico"
        mensagem={
          medico.nome
            ? `Tem certeza que deseja excluir o(a) médico ${medico.nome}? Esta ação não pode ser desfeita.`
            : 'Carregando informações do médico...'
        }
        rotaRetorno="/dashboard"
        onConfirmar={handleExcluir}
        carregando={carregando}
      />
    </>
  );
};

export default ExcluirMedico;
