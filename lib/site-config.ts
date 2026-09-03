export const siteConfig = {
  name: 'Vivacity',
  status: 'Private technical access',
  email: 'help@tryvivacity.com',
  bookingUrl: '' as string,
};

export const demoHref =
  siteConfig.bookingUrl ||
  '/schedule';

export const demoLinkProps = siteConfig.bookingUrl
  ? { target: '_blank' as const, rel: 'noopener noreferrer' }
  : {};
