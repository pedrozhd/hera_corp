import { useState } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Agendar consulta para o Marcos Aurélio', completed: true },
    { id: 2, text: 'Mandar guia para Fernanda Campos', completed: true },
    { id: 3, text: 'Mandar mensagem para Felipe Trindade', completed: false },
    { id: 4, text: 'Reagendar consulta do Lucas Alves', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Bom dia, Pedro!</h2>
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold cursor-pointer hover:bg-blue-600 transition">
                ?
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base">Você tem consultas para marcar hoje. Vamos lá?</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-5 py-3 rounded-full font-semibold text-sm md:text-base whitespace-nowrap">
            Consulta para o Marcos! / Fisioterapia
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Progresso da Jornada */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Progresso da Jornada</h3>
            <p className="text-gray-600 mb-6 text-lg font-semibold">{completedTasks}/{totalTasks} concluídas</p>
            <div className="space-y-3">
              {tasks.map((task) => (
                <label 
                  key={task.id} 
                  className={`flex items-start p-4 rounded-lg cursor-pointer transition-all ${
                    task.completed 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5 flex-shrink-0 cursor-pointer"
                  />
                  <span className={`ml-3 text-base ${
                    task.completed 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-800 font-medium'
                  }`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Conquistas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Conquistas</h3>
            <div className="space-y-4">
              {/* Conquistado */}
              <div className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-5 flex items-center gap-4 hover:shadow-md transition">
                <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">Conquistado</p>
                  <p className="text-gray-600 text-sm">21/out/2024</p>
                </div>
              </div>
              
              {/* Explorador Fiduciário */}
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 rounded-lg p-5 hover:shadow-md transition">
                <p className="font-bold text-blue-900 text-lg">Explorador Fiduciário</p>
                <p className="text-blue-700 text-sm mt-1">Conquista desbloqueada</p>
              </div>
              
              {/* Bloqueado */}
              <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-5 flex items-center gap-3 opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="font-bold text-gray-600 text-lg">Bloqueado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações CRUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Paciente', 
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
              gradient: 'from-blue-500 to-blue-700'
            },
            { 
              title: 'Médico', 
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              gradient: 'from-indigo-500 to-indigo-700'
            },
            { 
              title: 'Consulta', 
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              gradient: 'from-purple-500 to-purple-700'
            },
          ].map((card, index) => (
            <div key={index} className={`bg-gradient-to-br ${card.gradient} rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold">{card.title}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/90">Operação</label>
                  <select className="w-full p-3 rounded-xl text-gray-800 font-medium focus:ring-4 focus:ring-white/30 focus:outline-none bg-white shadow-md transition">
                    <option value="create">📝 Cadastrar</option>
                    <option value="read">👁️ Visualizar</option>
                    <option value="update">✏️ Editar</option>
                    <option value="delete">🗑️ Excluir</option>
                  </select>
                </div>
                
                <button className="w-full bg-white text-gray-800 py-3 px-4 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                  <span>Confirmar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;