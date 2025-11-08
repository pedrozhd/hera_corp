// src/components/ConfirmacaoExclusao.tsx
import { useNavigate } from 'react-router-dom';

interface ConfirmacaoExclusaoProps {
  titulo: string;
  mensagem: string;
  rotaRetorno: string;
  onConfirmar: () => void;
  carregando?: boolean;
}

const ConfirmacaoExclusao = ({
  titulo,
  mensagem,
  rotaRetorno,
  onConfirmar,
  carregando = false
}: ConfirmacaoExclusaoProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="mt-2 text-lg font-medium text-gray-900">{titulo}</h3>

          <div className="mt-2">
            <p className="text-sm text-gray-500">{mensagem}</p>
          </div>

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            {/* ✅ BOTÃO CORRETO DE EXCLUSÃO */}
            <button
              type="button"
              onClick={() => {
                console.log("🟢 Clique detectado no botão EXCLUIR!");
                onConfirmar();
              }}
              disabled={carregando}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
            >
              {carregando ? 'Excluindo...' : 'Excluir'}
            </button>

            {/* ✅ BOTÃO CANCELAR AGORA SÓ VOLTA */}
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              disabled={carregando}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoExclusao;
