import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import pedroFoto from '../assets/pedrofoto.jpg'
import luizFoto from '../assets/luizfoto.jpg'
import olavo from '../assets/OlavoFoto.jpg'
import FloatingElements from './FloatingElements'

type MemberData = {
  id: string
  name: string
  role: string
  image?: string
  bio?: string
  skills?: string[]
  github?: string
  linkedin?: string
}

const Members = () => {
  const [flippedCards, setFlippedCards] = useState<string[]>([])

  const toggleFlip = (memberId: string) => {
    setFlippedCards(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }
  const members: MemberData[] = [
    {
      id: '1',
      name: 'Pedro Costa',
      role: 'Desenvolvedor Frontend',
      image: pedroFoto,
      bio: 'Especialista em React e TypeScript com 3+ anos de experiência. Apaixonado por criar interfaces intuitivas e acessíveis para aplicações de saúde digital.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      github: 'https://github.com/pedro',
      linkedin: 'https://linkedin.com/in/pedro'
    },
    {
      id: '2', 
      name: 'Luiz Santos',
      role: 'Desenvolvedor Backend',
      image: luizFoto,
      bio: 'Desenvolvedor backend focado em APIs robustas e seguras. Experiência em sistemas de saúde e integração com dispositivos médicos.',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/luiz',
      linkedin: 'https://linkedin.com/in/luiz'
    },
    {
      id: '3',
      name: 'Olavo Silva',
      role: 'UI/UX Designer', 
      image: olavo,
      bio: 'Designer com foco em experiência do usuário para aplicações médicas. Especialista em design inclusivo e acessibilidade digital.',
      skills: ['Figma', 'Adobe XD', 'Design System', 'Prototipagem'],
      github: 'https://github.com/olavo',
      linkedin: 'https://linkedin.com/in/olavo'
    }
  ]

  return (
    <section className="py-16 px-5 text-center bg-gradient-to-b from-blue-50 to-indigo-50 relative overflow-hidden" id="integrantes">
      <FloatingElements theme="light" density="low" />
      <div className="mb-12">
        <p className="text-blue-600 text-xl font-semibold mb-2 text-center">Nosso time</p>
        <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-center">Integrantes</h2>
      </div>
      
      <div className="flex flex-wrap gap-8 px-4 lg:px-16 mb-8 items-center justify-center max-w-6xl mx-auto">
        {members.map((member) => {
          const isFlipped = flippedCards.includes(member.id)
          return (
            <div 
              key={member.id}
              className="relative max-w-xs w-full h-[500px] perspective-1000"
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => toggleFlip(member.id)}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-full h-80 overflow-hidden rounded-t-lg">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Foto do {member.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {member.role}
                    </p>
                    <div className="flex justify-center space-x-2">
                      <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Ver mais
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-md text-white">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-center">
                        {member.name}
                      </h3>
                      <p className="text-blue-100 text-sm mb-4 text-center">
                        {member.role}
                      </p>
                      <p className="text-sm leading-relaxed mb-4 text-blue-50">
                        {member.bio}
                      </p>
                      {member.skills && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2 text-blue-200">Habilidades:</h4>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-blue-500 bg-opacity-50 rounded text-xs text-blue-100"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center space-x-3 mt-6">
                      {member.github && (
                        <a 
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub
                        </a>
                      )}
                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
      </div>

    </section>
  )
}

// Individual member component for the route
export const Member = () => {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<MemberData | null>(null)

  useEffect(() => {
    // Simulação de fetch
    const fake = { id: id ?? '0', name: 'Integrante ' + id, role: 'Desenvolvedor' }
    setMember(fake)
  }, [id])

  if (!member) return <p className="text-center py-8">Carregando...</p>

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{member.name}</h2>
      <p className="text-lg text-gray-600">Função: {member.role}</p>
    </main>
  )
}

export default Members