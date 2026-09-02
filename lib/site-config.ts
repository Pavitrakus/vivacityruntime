export const siteConfig = {
  name: 'Vivacity',
  status: 'Now in public beta',
  email: 'help@tryvivacity.com',
  bookingUrl: '' as string,
};

export const demoHref =
  siteConfig.bookingUrl ||
  `mailto:${siteConfig.email}?subject=${encodeURIComponent('Vivacity technical demo')}`;

export const demoLinkProps = siteConfig.bookingUrl
  ? { target: '_blank' as const, rel: 'noopener noreferrer' }
  : {};
