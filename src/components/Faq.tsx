import { Link } from 'react-router-dom'

const Faq = () => {
  return (
    <section className="flex justify-center lg:justify-end py-16 lg:py-24 px-5 lg:px-16 bg-white" id="faq">
      <div className="flex flex-col text-center lg:text-right max-w-lg">
        <p className="text-xl mb-4 text-blue-600 font-bold">Perguntas frequentes</p>
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Está com dúvida?</h2>
        <p className="text-lg mb-8 text-gray-700">Não se preocupe, clique no botão abaixo.</p>
        <Link 
          to="/faqpage" 
          className="inline-block self-center lg:self-end bg-blue-600 text-white py-3 px-6 font-semibold rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:translate-y-0.5 shadow-sm"
        >
          FAQ
        </Link>
      </div>
    </section>
  )
}

export default Faq