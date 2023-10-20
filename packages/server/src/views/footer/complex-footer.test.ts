import { expect, test } from 'bun:test';
import { ComplexFooter } from './complex-footer';
import UnleashService from '../../unleash-service';

const unleashService = new UnleashService({ mock: true });

const links = [
  {
    heading: 'Kontakt',
    children: [
      {
        content: 'Kontakt oss',
        url: '/person/kontakt-oss/nb',
        displayLock: false,
      },
      {
        content: 'NAV i ditt fylke',
        url: '/no/nav-og-samfunn/kontakt-nav/nav-i-ditt-fylke',
        displayLock: false,
      },
      {
        content: 'Kurs fra NAV',
        url: '/no/nav-og-samfunn/kontakt-nav/kurs-fra-nav',
        displayLock: false,
      },
      {
        content: 'Klage, tilbakemelding, ros',
        url: '/person/kontakt-oss/tilbakemeldinger',
        displayLock: false,
      },
    ],
  },
  {
    heading: 'Nyheter og presse',
    children: [
      {
        content: 'Nyheter, pressemeldinger og pressekontakt',
        url: '/samarbeidspartner/presse',
        displayLock: false,
      },
    ],
  },
  {
    heading: 'NAV og samfunn',
    children: [
      {
        content: 'Statistikk, analyse og FoU',
        url: '/no/nav-og-samfunn/statistikk-analyse-og-fou',
        displayLock: false,
      },
      {
        content: 'Lover og regler (lovdata.no)',
        url: 'https://lovdata.no/nav/',
        displayLock: false,
      },
      {
        content: 'Om NAV',
        url: '/no/nav-og-samfunn/om-nav/om-nav',
        displayLock: false,
      },
    ],
  },
  {
    heading: 'Andre språk',
    children: [
      {
        content: 'English',
        url: '/en',
        displayLock: false,
      },
      {
        content: 'Sámegiella',
        url: '/se',
        displayLock: false,
      },
    ],
  },
  {
    children: [
      {
        content: 'Personvern og informasjonskapsler',
        url: '/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten',
        displayLock: false,
      },
      {
        content: 'Tilgjengelighet',
        url: '/tilgjengelighet',
        displayLock: false,
      },
    ],
  },
];

test('renders complex footer', async () => {
  expect(
    ComplexFooter({
      texts: {
        to_top: 'Til toppen',
        share_screen: 'Del skjerm med veileder',
      },
      links,
      features: unleashService.getFeatures(),
    }).render(),
  ).toMatchSnapshot();
});
