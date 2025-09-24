import { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ nome: '', email: '', tel: '', mensagem: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: enviar form (fetch/axios)
    console.log('Enviado:', form)
  }

  return (
    <section className="container-mensagem-contato" id="contato">
      <div className="mensagem">
        <p>Fale conosco</p>
        <h1 className="principal-mensagem">Estamos aqui para ajudar você!</h1>
        <form className="campos-texto" onSubmit={handleSubmit}>
          <label htmlFor="fnome">Nome <span>*</span></label><br />
          <input type="text" id="fnome" name="nome" className="fnome" value={form.nome} onChange={handleChange} /><br />

          <label htmlFor="femail">Email <span>*</span></label><br />
          <input type="email" id="femail" name="email" className="femail" value={form.email} onChange={handleChange} /><br />

          <label htmlFor="ftel">Telefone <span>*</span></label><br />
          <input type="tel" id="ftel" name="tel" className="ftel" value={form.tel} onChange={handleChange} /><br />

          <label htmlFor="mensagem">Mensagem <span>*</span></label><br />
          <textarea id="mensagem" name="mensagem" maxLength={100} placeholder="Mensagem até 100 caracteres" value={form.mensagem} onChange={handleChange} /><br />

          <button type="submit" className="texto-enviar">Enviar</button>
        </form>
      </div>
    </section>
  )
}

export default Contact