import { Language } from 'decorator-shared/params';
import { Texts } from 'decorator-shared/types';

const nb = {
  share_screen: 'Del skjerm med veileder',
  to_top: 'Til toppen',
  menu: 'Meny',
  close: 'Lukk',
  did_you_find: 'Fant du det du lette etter?',
  search: 'Søk',
  search_nav_no: 'Søk på nav.no',
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
  showing: 'Viser',
  of: 'av',
  results: 'resultater',
  see_all_hits: 'Se alle treff',
} satisfies Texts;

export type LangBaseKeys = keyof typeof nb;

export const texts: Record<Language, Texts> = {
  nb,
  en: {
    share_screen: 'Share screen with your counsellor',
    to_top: 'To the top',
    menu: 'Menu',
    close: 'Close',
    did_you_find: 'Fant du det du lette etter?',
    search: 'Search',
    search_nav_no: 'Search nav.no',
    login: 'Log in',
    logout: 'Log out',
    logged_in: 'Logged in',
    notifications: 'Notifications',
    notifications_empty_list: 'You have no new notifications',
    notifications_empty_list_description: 'Du har ingen nye varsler',
    notifications_show_all: 'Previous notifications',
    notifications_messages_title: 'Beskjeder',
    notified_EPOST: 'Notified by e-mail',
    notified_SMS: 'Notified by SMS',
    earlier_notifications: 'Earlier notifications',
    masked_message_text:
      'You have a message, please log in with a higher security level to read the message.',
    masked_task_text:
      'You have a task, please log in with a higher security level to see the task.',
    archive: 'Archive',
    notifications_tasks_title: 'Tasks',
    token_warning_title: 'You will soon be logged out automatically',
    token_warning_body: 'Would you like to stay logged in?',
    session_warning_title:
      'You will be logged out automatically in about $1 minutes',
    session_warning_body: 'Avslutt det du jobber med og logg inn igjen.',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    hensikt_med_tilbakemelding:
      'Unfortunately you will not get a reply to your feedback. Do you have questions or need help?',
    hensikt_med_tilbakemelding_lenke: 'Call, chat or write to us',
    send_undersokelse_takk: 'Thanks!',
    rolle_privatperson: 'Private',
    rolle_arbeidsgiver: 'Employer',
    rolle_samarbeidspartner: 'Collaborator',
    meny_bunnlenke_minside_stikkord:
      'Your cases, payments, messages, report cards, activity plan, personal information and more services',
    meny_bunnlenke_arbeidsgiver_stikkord:
      'Your sick leave, recruitment, digital forms',
    meny_bunnlenke_samarbeidspartner_stikkord:
      'Health personnel, intervention organizers, counties and municipalities',
    loading_notifications: 'Loading notifications',
    notifications_error: 'Error loading notifications',
    til_forsiden: 'To the frontpage',
    how_can_we_help: 'What can we help you with?',
    showing: 'Showing',
    of: 'og',
    results: 'results',
    see_all_hits: 'See all hits',
  },
  se: nb,
  nn: nb,
  pl: nb,
  uk: nb,
  ru: nb,
};
