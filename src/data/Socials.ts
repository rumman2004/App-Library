export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  color: string;
  bg: string;
  glow: string;
  borderHover: string;
  label?: string | null;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@rumman2004',
    url: 'https://github.com/rumman2004',
    color: '#24292f',
    bg: 'rgba(36,41,47,0.07)',
    glow: 'rgba(36,41,47,0.10)',
    borderHover: 'rgba(36,41,47,0.22)',
    label: null,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@rumman.ig',
    url: 'https://instagram.com/rumman.ig',
    color: '#c13584',
    bg: 'rgba(193,53,132,0.08)',
    glow: 'rgba(193,53,132,0.14)',
    borderHover: 'rgba(193,53,132,0.28)',
    label: null,
  },
  {
    id: 'discord',
    name: 'Discord',
    handle: 'rumman2004',
    url: 'https://discord.com/users/rumman2004',
    color: '#5865f2',
    bg: 'rgba(88,101,242,0.08)',
    glow: 'rgba(88,101,242,0.14)',
    borderHover: 'rgba(88,101,242,0.28)',
    label: null,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Rumman Ahmed',
    url: 'https://linkedin.com/in/rummanahmed04',
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.08)',
    glow: 'rgba(10,102,194,0.14)',
    borderHover: 'rgba(10,102,194,0.28)',
    label: 'Open to work',
  },
  {
    id: 'x',
    name: 'X / Twitter',
    handle: '@rumman_tw11',
    url: 'https://twitter.com/rumman_tw11',
    color: '#0f1419',
    bg: 'rgba(15,20,25,0.07)',
    glow: 'rgba(15,20,25,0.10)',
    borderHover: 'rgba(15,20,25,0.20)',
    label: null,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    handle: 'rumman-portfolio-ryuu.vercel.app',
    url: 'https://rumman-portfolio-ryuu.vercel.app/',
    color: '#a6882e',
    bg: 'rgba(166,136,46,0.08)',
    glow: 'rgba(166,136,46,0.14)',
    borderHover: 'rgba(166,136,46,0.28)',
    label: 'Live',
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'rumman.ahmed.work',
    url: 'mailto:rumman.ahmed.work+portfolio@gmail.com',
    color: '#1a7a52',
    bg: 'rgba(26,122,82,0.08)',
    glow: 'rgba(26,122,82,0.14)',
    borderHover: 'rgba(26,122,82,0.28)',
    label: 'Preferred',
  },
];