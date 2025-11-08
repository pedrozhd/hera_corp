// src/pages/ExcluirConsulta.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmacaoExclusao from '../components/ConfirmacaoExclusao';
import api from '../services/api';
import type { Consulta } from '../interfaces';
import { useToast } from '../contexts/ToastContext';

const ExcluirConsulta = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [carregando, setCarregando] = useState(false);
  const [consulta, setConsulta] = useState<Partial<Consulta>>({ paciente: '', data: '' });
  const [mensagemStatus, setMensagemStatus] = useState<string | null>(null);

  // 🔍 Busca a consulta pelo ID ao carregar
  useEffect(() => {
    const buscarConsulta = async () => {
      if (!id) return;

      try {
        setCarregando(true);
        setMensagemStatus('Carregando informações da consulta...');

        const idNum = Number(id);
        if (Number.isNaN(idNum)) {
          throw new Error('ID inválido da consulta');
        }

        const resposta = await api.consultas.buscarPorId(idNum);
        setConsulta(resposta);
      } catch (erro) {
        console.error('Erro ao carregar consulta:', erro);
        toast.error('Não foi possível carregar as informações da consulta.');
        setTimeout(() => navigate('/consulta'), 1500);
      } finally {
        setCarregando(false);
        setMensagemStatus(null);
      }
    };

    buscarConsulta();
  }, [id, navigate]);

  // 🗑️ Exclusão real
  const handleExcluir = async () => {
    console.log('🟢 handleExcluir() chamado com ID:', id);
    try {
      setCarregando(true);
      setMensagemStatus('🔄 Enviando requisição para exclusão...');

      const idNum = Number(id);
      if (Number.isNaN(idNum)) {
        toast.error('ID da consulta inválido.');
        setMensagemStatus('ID da consulta inválido.');
        return;
      }

      await api.consultas.excluir(idNum);

      setMensagemStatus('✅ Consulta cancelada com sucesso!');
      toast.success('Consulta cancelada com sucesso!');
      setTimeout(() => navigate('/consulta'), 1500);
    } catch (erro) {
      console.error('❌ Erro ao cancelar consulta:', erro);
      toast.error('Ocorreu um erro ao tentar cancelar a consulta.');
      setMensagemStatus('Erro ao cancelar consulta. Veja o console.');
    } finally {
      setCarregando(false);
      setTimeout(() => setMensagemStatus(null), 2500);
    }
  };

  return (
    <>
      {/* 💬 Mensagem flutuante de status */}
      {mensagemStatus && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
            <p className="text-gray-800 font-semibold">{mensagemStatus}</p>
          </div>
        </div>
      )}

      {/* 🧩 Modal de confirmação */}
      <ConfirmacaoExclusao
        titulo="Cancelar Consulta"
        mensagem={
          consulta.paciente && consulta.data
            ? `Tem certeza que deseja cancelar a consulta de ${consulta.paciente} marcada para ${consulta.data}${
                consulta.horario ? ` às ${consulta.horario}` : ''
              }? Esta ação não pode ser desfeita.`
            : 'Carregando informações da consulta...'
        }
        rotaRetorno="/consulta"
        onConfirmar={handleExcluir}
        carregando={carregando}
      />
    </>
  );
};

export default ExcluirConsulta;
