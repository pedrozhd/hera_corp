type AboutCardProps = {
    title: string
    description: string
    imageSrc?: string
  }
  
  const AboutCard = ({ title, description, imageSrc }: AboutCardProps) => {
    return (
      <section className="about-card">
        {imageSrc && <img src={imageSrc} alt={title} />}
        <h4>{title}</h4>
        <p>{description}</p>
      </section>
    )
  }
  
  export default AboutCard