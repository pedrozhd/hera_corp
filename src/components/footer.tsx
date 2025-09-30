import FloatingElements from './FloatingElements'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-12 px-5 relative overflow-hidden">
            <FloatingElements theme="dark" density="low" />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 cursor-pointer group relative overflow-hidden">
                        <span className="inline-block transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:rotate-2 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            Hera Corp.
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10"></div>
                    </h3>
                    <p className="text-blue-200 mb-4 transition-all duration-300 group-hover:text-blue-100">Conectando saúde e tecnologia</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
                    <div className="flex space-x-6">
                        <span className="text-blue-300 hover:text-white transition-colors cursor-pointer text-sm">Sobre</span>
                        <span className="text-blue-300 hover:text-white transition-colors cursor-pointer text-sm">Serviços</span>
                        <span className="text-blue-300 hover:text-white transition-colors cursor-pointer text-sm">Contato</span>
                    </div>
                </div>
                
                <div className="border-t border-blue-500 pt-6">
                    <p className="text-blue-100 text-sm">© 2025 Hera Corp. — Transformando o acesso à saúde digital com inovação e cuidado.</p>
                    <p className="text-xs text-blue-300 mt-2">Desenvolvido com  para o futuro da saúde digital</p>
                    <div className="mt-4 text-xs text-blue-300 space-y-1">
                        <p>Desenvolvido por:</p>
                        <p>Pedro Henrique Dias França - RM561940</p>
                        <p>Luiz Gustavo Gonçalves - RM564495</p>
                        <p>Olavo Porto Neves - RM563558</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer