
export async function loadContacts(state, getContactList) {
  const contacts = await getContactList();

  return Object.assign({}, state, { contacts });
}

export async function setSelectedId(state, selectedId) {
  return Object.assign({}, state, { selectedId });
}

export async function loadContactDetails(state, id, getContactDetails, routeConfig) {
  const contact = await getContactDetails(id);
  routeConfig.navModel.setTitle(contact.firstName);

  return Object.assign({}, state, {
    contact,
    originalContact: JSON.parse(JSON.stringify(contact))
  });
}

export async function saveContact(state, modifiedContact, saveContactApi, routeConfig) {
  const contact = await saveContactApi(modifiedContact);

  routeConfig.navModel.setTitle(contact.firstName);

  const idx = state.contacts.findIndex((c) => c.id === contact.id);

  return Object.assign({}, state, {
    contact,
    contacts: [
      ...state.contacts.slice(0, idx),
      Object.assign({}, contact),
      ...state.contacts.slice(idx + 1)
    ],
    originalContact: JSON.parse(JSON.stringify(contact))
  });
}
