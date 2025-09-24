import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

type MemberData = {
  id: string
  name: string
  role: string
}

const Member = () => {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<MemberData | null>(null)

  useEffect(() => {
    // Simulação de fetch
    const fake = { id: id ?? '0', name: 'Integrante ' + id, role: 'Desenvolvedor' }
    setMember(fake)
  }, [id])

  if (!member) return <p>Carregando...</p>

  return (
    <main>
      <h2>{member.name}</h2>
      <p>Função: {member.role}</p>
    </main>
  )
}

export default Member