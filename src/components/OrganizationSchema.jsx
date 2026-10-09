import SchemaMarkup from './SchemaMarkup'

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://skillbridgetutors.com/#organization',
  name: 'SkillBridge Tutors',
  url: 'https://skillbridgetutors.com/',
  logo: 'https://skillbridgetutors.com/Images/skillbridge_logo_only.png',
  image: 'https://skillbridgetutors.com/Images/NewHeaderImage.jpg',
  email: 'info@skillbridgetutors.com',
  telephone: '+44 7451 295266',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '76 Carlen Drive, Osmaston',
    addressLocality: 'Derby',
    addressRegion: 'Derbyshire',
    postalCode: 'DE24 8XY',
    addressCountry: 'GB'
  }
}

export default function OrganizationSchema() {
  return <SchemaMarkup data={ORGANIZATION_SCHEMA} />
}
