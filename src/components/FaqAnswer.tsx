import { useParams } from 'react-router-dom'

const FaqAnswer = () => {
  const { slug } = useParams<{ slug: string }>()
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">FAQ: {slug}</h2>
        <p className="text-lg leading-relaxed text-gray-700">Conteúdo da resposta para {slug}...</p>
      </div>
    </main>
  )
}

export default FaqAnswer