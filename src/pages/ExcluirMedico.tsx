// src/pages/ExcluirMedico.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmacaoExclusao from '../components/ConfirmacaoExclusaoProps';

const ExcluirMedico = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [medico, setMedico] = useState({ nome: '' });

  useEffect(() => {
    // Simulando busca do médico
    const buscarMedico = async () => {
      try {
        // TODO: Substituir por chamada real à API
        const dadosMock = { id, nome: 'Dr. Médico de Exemplo' };
        setMedico(dadosMock);
      } catch (erro) {
        console.error('Erro ao carregar médico:', erro);
      }
    };

    if (id) {
      buscarMedico();
    }
  }, [id]);

  const handleExcluir = async () => {
    try {
      setCarregando(true);
      // TODO: Substituir por chamada real à API
      console.log(`Excluindo médico ${id}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula espera
      navigate('/medico', { state: { mensagem: 'Médico excluído com sucesso!' } });
    } catch (erro) {
      console.error('Erro ao excluir médico:', erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ConfirmacaoExclusao
      titulo="Excluir Médico"
      mensagem={`Tem certeza que deseja excluir o(a) médico(a) ${medico.nome}? Esta ação não pode ser desfeita.`}
      rotaRetorno="/medico"
      onConfirmar={handleExcluir}
      carregando={carregando}
    />
  );
};

export default ExcluirMedico;