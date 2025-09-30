import { useState } from 'react'

type FAQItem = {
  id: number
  question: string
  answer: string
}

const FaqPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Como agendar a sua consulta?",
      answer: "Você pode agendar sua teleconsulta através do site ou aplicativo do IMREA, selecionando a especialidade desejada, o profissional disponível e um horário que atenda às suas necessidades. Após o agendamento, você receberá um e-mail ou mensagem com o link de acesso à consulta."
    },
    {
      id: 2,
      question: "O que fazer se tiver problemas técnicos?",
      answer: "Caso enfrente dificuldades como falha de conexão ou áudio/vídeo, tente reiniciar o dispositivo ou reconectar-se à plataforma. Se o problema persistir, entre em contato com o suporte técnico do IMREA pelo e-mail/telefone ou utilize o chat de ajuda disponível no site/app."
    },
    {
      id: 3,
      question: "Quais equipamentos ou preparos são necessários para a teleconsulta?",
      answer: "Você precisará de um dispositivo (celular, tablet ou computador) com câmera, microfone e acesso à internet. Recomendamos testar a conexão antes da consulta, fechar outros aplicativos para evitar lentidão e, se possível, estar em um ambiente tranquilo e bem iluminado."
    }
  ]

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <main className="bg-gray-50 pt-24 pb-8 min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">Bem-vindo ao nosso FAQ!</h2>

        <div className="space-y-4">
          {faqData.map((item) => {
          const isOpen = openItems.includes(item.id)
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <h4 className="text-xl font-semibold text-gray-800 pr-4">{item.question}</h4>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-6 pb-4 pt-2">
                  <p className="text-lg leading-relaxed text-gray-700">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </main>
  )
}
  
  export default FaqPage