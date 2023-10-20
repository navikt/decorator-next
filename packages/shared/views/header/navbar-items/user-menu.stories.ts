import type { StoryObj, Meta } from '@storybook/html';
import type { UserMenuProps } from './user-menu';
import { UserMenu } from './user-menu';

const meta: Meta<UserMenuProps> = {
  title: 'header/user-menu',
  tags: ['autodocs'],
  render: UserMenu,
};

export default meta;
type Story = StoryObj<UserMenuProps>;

export const Default: Story = {
  args: {
    name: 'Ola Nordmann',
    links: [
      {
        heading: 'Din oversikt',
        children: [
          {
            content: 'Dokumentarkiv',
            url: 'https://person.nav.no/mine-saker',
            displayLock: true,
          },
          {
            content: 'Din innboks',
            url: 'https://innboks.nav.no/',
            displayLock: true,
          },
          {
            content: 'Dine utbetalinger',
            url: 'https://tjenester.nav.no/utbetalingsoversikt/',
            displayLock: false,
          },
          {
            content: 'Endre kontonummer/adresse',
            url: '/person/personopplysninger/nb/#utbetaling',
            displayLock: true,
          },
          {
            content: 'Send ny søknad',
            url: '/soknader',
            displayLock: true,
          },
          {
            content: 'Ettersend vedlegg',
            url: '/ettersendelse',
            displayLock: true,
          },
          {
            content: 'Send beskjed til NAV',
            url: '/person/kontakt-oss/',
            displayLock: false,
          },
          {
            content: 'Personopplysninger',
            url: '/person/personopplysninger',
            displayLock: true,
          },
        ],
      },
      {
        heading: 'Arbeid',
        children: [
          {
            content: 'Registrer deg som arbeidssøker',
            url: 'https://www.nav.no/arbeid/registrering/',
            displayLock: true,
          },
          {
            content: 'Send meldekort',
            url: '/meldekort/',
            displayLock: false,
          },
          {
            content: 'Finn ledige stillinger',
            url: 'https://arbeidsplassen.nav.no/stillinger',
            displayLock: false,
          },
          {
            content: 'Din CV',
            url: 'https://arbeidsplassen.nav.no/minside',
            displayLock: false,
          },
          {
            content: 'Dine lagrede søk',
            url: 'https://arbeidsplassen.nav.no/stillinger/lagrede-sok',
            displayLock: false,
          },
          {
            content: 'Din aktivitetsplan',
            url: 'https://aktivitetsplan.nav.no',
            displayLock: true,
          },
          {
            content: 'Dialog med veilederen din',
            url: 'http://nav.no/arbeid/dialog',
            displayLock: true,
          },
          {
            content: 'Ditt jobbspor',
            url: 'https://jobbsporet.nav.no/',
            displayLock: true,
          },
        ],
      },
      {
        heading: 'Flere tjenester',
        children: [
          {
            content: 'Din pensjon',
            url: 'https://www.nav.no/pselv/publisering/dinpensjon.jsf?context=pensjon',
            displayLock: false,
          },
          {
            content: 'Din uføretrygd',
            url: 'https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut',
            displayLock: false,
          },
          {
            content: 'Ditt sykefravær',
            url: 'https://www.nav.no/syk/sykefravaer',
            displayLock: true,
          },
          {
            content: 'Dine foreldrepenger',
            url: 'https://foreldrepenger.nav.no',
            displayLock: true,
          },
          {
            content: 'Dine fullmakter',
            url: 'https://www.nav.no/person/pdl-fullmakt-ui',
            displayLock: true,
          },
          {
            content: 'Dine pleiepenger',
            url: 'https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn',
            displayLock: false,
          },
          {
            content: 'Dine hjelpemidler',
            url: 'https://www.nav.no/hjelpemidler/dinehjelpemidler/',
            displayLock: false,
          },
          {
            content: 'Økonomisk sosialhjelp',
            url: 'https://www.nav.no/sosialhjelp/innsyn/',
            displayLock: false,
          },
        ],
      },
    ],
    texts: {
      share_screen: 'Del skjerm med veileder',
      to_top: 'Til toppen',
      menu: 'Meny',
      close: 'Lukk',
      did_you_find: 'Fant du det du lette etter?',
      search: 'Søk',
      sok_knapp_sokefelt: 'Søk på nav.no',
      login: 'Logg inn',
      logout: 'Logg ut',
      logged_in: 'Logget inn',
      notifications: 'Varsler',
      notifications_empty_list: 'Du har ingen nye varsler',
      notifications_empty_list_description: 'Vi varsler deg når noe skjer',
      notifications_show_all: 'Tidligere varsler',
      notifications_messages_title: 'Beskjeder',
      notified_EPOST: 'Varslet på e-post',
      notified_SMS: 'Varslet på SMS',
      earlier_notifications: 'Tidligere varsler',
      masked_message_text:
        'Du har fått en melding, logg inn med høyere sikkerhetsnivå for å se meldingen.',
      masked_task_text:
        'Du har fått en oppgave, logg inn med høyere sikkerhetsnivå for å se oppgaven.',
      archive: 'Arkiver',
      notifications_tasks_title: 'Oppgaver',
      token_warning_title: 'Du blir snart logget ut automatisk',
      token_warning_body: 'Vil du fortsatt være innlogget?',
      session_warning_title: 'Du blir logget ut automatisk om ca $1 minutter',
      session_warning_body: 'Avslutt det du jobber med og logg inn igjen.',
      yes: 'Ja',
      no: 'Nei',
      ok: 'OK',
      hensikt_med_tilbakemelding:
        'Du får dessverre ikke svar på tilbakemeldingen din. Har du spørsmål eller trenger du hjelp?',
      hensikt_med_tilbakemelding_lenke: 'Ring, chat eller skriv til oss',
      send_undersokelse_takk: 'Takk!',
      rolle_privatperson: 'Privat',
      rolle_arbeidsgiver: 'Arbeidsgiver',
      rolle_samarbeidspartner: 'Samarbeidspartner',
      meny_bunnlenke_minside_stikkord:
        'Dine saker, utbetalinger, meldinger, meldekort, aktivitetsplan, personopplysninger og flere tjenester',
      meny_bunnlenke_arbeidsgiver_stikkord:
        'Dine sykmeldte, rekruttering, digitale skjemaer',
      meny_bunnlenke_samarbeidspartner_stikkord:
        'Helsepersonell, tiltaksarrangører, fylker og kommuner',
      loading_notifications: 'Laster varslinger',
      notifications_error: 'Feil ved lasting av varsler',
      til_forsiden: 'Til forsiden',
      how_can_we_help: 'Hva kan vi hjelpe deg med?',
      my_page: 'Min side',
      to_my_page: 'Til Min side',
    },
  },
};
