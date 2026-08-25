import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  type?: string
  image?: string
  structuredData?: object
}

const SEO = ({
  title = 'Swetha Thanabalan | Product Designer',
  description = 'Product Designer with an HCI background working across user research, interaction design, prototyping, design systems, and AI-assisted product development.',
  path = '',
  type = 'website',
  image = 'https://swethathanabalan.com/PortfolioPictureswetha.jpg',
  structuredData,
}: SEOProps) => {
  const url = `https://swethathanabalan.com${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}

export default SEO
