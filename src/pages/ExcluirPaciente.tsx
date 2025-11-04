// src/pages/ExcluirPaciente.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmacaoExclusao from '../components/ConfirmacaoExclusaoProps';

const ExcluirPaciente = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [paciente, setPaciente] = useState({ nome: '' });

  useEffect(() => {
    // Simulando busca do paciente
    const buscarPaciente = async () => {
      try {
        // TODO: Substituir por chamada real à API
        const dadosMock = { id, nome: 'Paciente de Exemplo' };
        setPaciente(dadosMock);
      } catch (erro) {
        console.error('Erro ao carregar paciente:', erro);
      }
    };

    if (id) {
      buscarPaciente();
    }
  }, [id]);

  const handleExcluir = async () => {
    try {
      setCarregando(true);
      // TODO: Substituir por chamada real à API
      console.log(`Excluindo paciente ${id}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula espera
      navigate('/paciente', { state: { mensagem: 'Paciente excluído com sucesso!' } });
    } catch (erro) {
      console.error('Erro ao excluir paciente:', erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ConfirmacaoExclusao
      titulo="Excluir Paciente"
      mensagem={`Tem certeza que deseja excluir o(a) paciente ${paciente.nome}? Esta ação não pode ser desfeita.`}
      rotaRetorno="/paciente"
      onConfirmar={handleExcluir}
      carregando={carregando}
    />
  );
};

export default ExcluirPaciente;