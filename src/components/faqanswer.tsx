import { useParams } from 'react-router-dom'

const FaqAnswer = () => {
  const { slug } = useParams<{ slug: string }>()
  return (
    <main>
      <h2>FAQ: {slug}</h2>
      <p>Conteúdo da resposta para {slug}...</p>
    </main>
  )
}

export default FaqAnswer