type AboutCardProps = {
  title: string
  description: string
  imageSrc?: string
}

const AboutCard = ({ title, description, imageSrc }: AboutCardProps) => {
  return (
    <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-white rounded-lg shadow-md p-8">
      {imageSrc && (
        <div className="flex-1 flex justify-center">
          <img src={imageSrc} alt={title} className="max-w-full h-auto rounded-lg shadow-sm" />
        </div>
      )}
      <div className="flex-1 text-center lg:text-left">
        <h4 className="text-3xl font-bold mb-6 text-blue-600">{title}</h4>
        <p className="text-lg leading-relaxed text-gray-700">{description}</p>
      </div>
    </section>
  )
}

export default AboutCard