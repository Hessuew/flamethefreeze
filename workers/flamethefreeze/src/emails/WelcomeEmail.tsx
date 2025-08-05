import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from '@react-email/components';

export const WelcomeEmail = () => {
  const baseUrl = 'https://urfit-child.com';

  return (
    <Html>
      <Head />
      <Preview>Welcome to urFIT-child Research Publications</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={h1}>Welcome to urFIT-child Research</Heading>

            <Text style={text}>Dear Colleague,</Text>

            <Text style={text}>
              Thank you for subscribing to our research publications. You will now receive updates on our latest
              peer-reviewed findings in pediatric cardiometabolic health, physical activity, and obesity research.
            </Text>

            <Text style={highlight}>
              Our research has been recognized by the American Heart Association as one of the World's Most Significant
              Advances in Cardiovascular Research for 2024.
            </Text>

            <Text style={text}>
              Each notification will provide direct access to our latest publications, ensuring you stay at the
              forefront of pediatric health research.
            </Text>

            <div style={websiteBox}>
              <Text style={websiteText}>
                Visit our{' '}
                <Link style={websiteLink} href={baseUrl}>
                  website
                </Link>{' '}
                to explore more of our research and stay updated with our latest findings.
              </Text>
            </div>

            <div style={footer}>
              <Text style={regards}>Best regards,</Text>
              <Text style={teamName}>urFIT-child Research Team</Text>

              <div style={socialLinks}>
                <Link href='https://www.researchgate.net/profile/Andrew-Agbaje' style={socialLink}>
                  ResearchGate
                </Link>
                <Text style={bullet}>•</Text>
                <Link href='https://www.linkedin.com/in/andrew-agbaje-5783b253' style={socialLink}>
                  LinkedIn
                </Link>
                <Text style={bullet}>•</Text>
                <Link href='https://orcid.org/0000-0001-5138-3441' style={socialLink}>
                  ORCID
                </Link>
                <Text style={bullet}>•</Text>
                <Link href='https://pubmed.ncbi.nlm.nih.gov/?term=Agbaje+AO&cauthor_id=36214333' style={socialLink}>
                  PubMed
                </Link>
                <Text style={bullet}>•</Text>
                <Link
                  href='https://uefconnect.uef.fi/en/group/understanding-fitness-and-cardiometabolic-health-in-little-darlings-urfit-child'
                  style={socialLink}
                >
                  UEF
                </Link>
              </div>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: '2rem',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '2rem',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
};

const section = {
  padding: '0',
};

const h1 = {
  color: '#1a202c',
  fontSize: '1.25rem',
  fontWeight: '600',
  textAlign: 'center' as const,
  marginBottom: '1.5rem',
};

const text = {
  color: '#4a5568',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  margin: '0 0 1rem',
};

const highlight = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '0.5rem',
  color: '#0369a1',
  fontSize: '0.875rem',
  lineHeight: '1.5',
  margin: '1rem 0',
  padding: '0.75rem',
  textAlign: 'center' as const,
};

const websiteBox = {
  margin: '2rem 0',
  padding: '1.5rem',
  backgroundColor: '#f7fafc',
  borderRadius: '0.5rem',
};

const websiteText = {
  fontSize: '0.7rem',
  color: '#4a5568',
  margin: '0',
};

const websiteLink = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '0.75rem',
  transition: 'color 0.2s ease !important',
};

const footer = {
  marginTop: '3rem',
  paddingTop: '2rem',
  borderTop: '1px solid #e2e8f0',
  color: '#4a5568',
};

const regards = {
  margin: '0',
  fontSize: '0.875rem',
  color: '#4a5568',
};

const teamName = {
  fontWeight: '600',
  margin: '0.25rem 0 1rem',
  fontSize: '0.875rem',
  color: '#4a5568',
};

const socialLinks = {
  textAlign: 'center' as const,
  margin: '1rem 0 0',
};

const socialLink = {
  color: '#64748b',
  textDecoration: 'none',
  fontSize: '0.875rem',
  display: 'inline-block',
  margin: '0 0.5rem',
  transition: 'color 0.2s ease !important',
};

const bullet = {
  color: '#cbd5e1',
  margin: '0 0.25rem',
  display: 'inline',
};

export default WelcomeEmail;
