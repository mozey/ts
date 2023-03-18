export interface Contact {
  name: string;
}

export interface Contacts extends Array<Contact>{}

export interface ContactsResp {
  contacts: Contacts;
}