// src/pages/ExcluirConsulta.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmacaoExclusao from '../components/ConfirmacaoExclusaoProps';

const ExcluirConsulta = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [consulta, setConsulta] = useState({ paciente: '', data: '' });

  useEffect(() => {
    // Simulando busca da consulta
    const buscarConsulta = async () => {
      try {
        // TODO: Substituir por chamada real à API
        const dadosMock = { 
          id, 
          paciente: 'Paciente de Exemplo', 
          data: '10/11/2023',
          horario: '14:30'
        };
        setConsulta(dadosMock);
      } catch (erro) {
        console.error('Erro ao carregar consulta:', erro);
      }
    };

    if (id) {
      buscarConsulta();
    }
  }, [id]);

  const handleExcluir = async () => {
    try {
      setCarregando(true);
      // TODO: Substituir por chamada real à API
      console.log(`Excluindo consulta ${id}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula espera
      navigate('/consulta', { state: { mensagem: 'Consulta excluída com sucesso!' } });
    } catch (erro) {
      console.error('Erro ao excluir consulta:', erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <ConfirmacaoExclusao
      titulo="Cancelar Consulta"
      mensagem={`Tem certeza que deseja cancelar a consulta de ${consulta.paciente} marcada para ${consulta.data}? Esta ação não pode ser desfeita.`}
      rotaRetorno="/consulta"
      onConfirmar={handleExcluir}
      carregando={carregando}
    />
  );
};

export default ExcluirConsulta;