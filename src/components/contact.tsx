import { useState } from 'react'
import FloatingElements from './FloatingElements'

const Contact = () => {
  const [form, setForm] = useState({ nome: '', email: '', tel: '', mensagem: '' })
  const [errors, setErrors] = useState({ nome: '', email: '', tel: '', mensagem: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  function validateForm() {
    const newErrors = { nome: '', email: '', tel: '', mensagem: '' }
    let isValid = true

    if (!form.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
      isValid = false
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email é obrigatório'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email inválido'
      isValid = false
    }

    if (!form.tel.trim()) {
      newErrors.tel = 'Telefone é obrigatório'
      isValid = false
    }

    if (!form.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log('Enviado:', form)
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
      setForm({ nome: '', email: '', tel: '', mensagem: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <section className="py-20 px-5 lg:px-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden" id="contato">
      <FloatingElements theme="light" density="medium" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-bold text-xl mb-2">Fale conosco</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Estamos aqui para ajudar você!
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Entre em contato conosco para tirar dúvidas, solicitar informações ou compartilhar sugestões sobre nossos serviços de saúde digital.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Entre em contato</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">contato@heracorp.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Telefone</h3>
                    <p className="text-gray-600">(11) 9999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Localização</h3>
                    <p className="text-gray-600">São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Segunda - Sexta</span>
                  <span>08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span>09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Envie sua mensagem</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="fnome" className="text-sm font-semibold text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Nome <span className="text-red-500 ml-1">*</span>
              </label>
              <input 
                type="text" 
                id="fnome" 
                name="nome" 
                placeholder="Digite seu nome completo"
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.nome 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300 focus:border-blue-500 focus:bg-white'
                }`}
                value={form.nome} 
                onChange={handleChange} 
              />
              {errors.nome && (
                <p className="text-red-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.nome}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="femail" className="text-sm font-semibold text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input 
                type="email" 
                id="femail" 
                name="email" 
                placeholder="seu@email.com"
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.email 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300 focus:border-blue-500 focus:bg-white'
                }`}
                value={form.email} 
                onChange={handleChange} 
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="ftel" className="text-sm font-semibold text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Telefone <span className="text-red-500 ml-1">*</span>
              </label>
              <input 
                type="tel" 
                id="ftel" 
                name="tel" 
                placeholder="(11) 99999-9999"
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.tel 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300 focus:border-blue-500 focus:bg-white'
                }`}
                value={form.tel} 
                onChange={handleChange} 
              />
              {errors.tel && (
                <p className="text-red-500 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.tel}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="mensagem" className="text-sm font-semibold text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Mensagem <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea 
                id="mensagem" 
                name="mensagem" 
                maxLength={500} 
                placeholder="Conte-nos como podemos ajudar você..." 
                className={`w-full p-4 border-2 rounded-xl h-32 resize-vertical transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.mensagem 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300 focus:border-blue-500 focus:bg-white'
                }`}
                value={form.mensagem} 
                onChange={handleChange} 
              />
              <div className="flex justify-between items-center">
                {errors.mensagem ? (
                  <p className="text-red-500 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.mensagem}
                  </p>
                ) : <div></div>}
                <span className="text-sm text-gray-500">{form.mensagem.length}/500</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Enviar Mensagem
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Contact