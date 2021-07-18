import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Container, Title, TitleContacts } from './App.styles'
import { TiContacts } from 'react-icons/ti'
import { IoIosContacts } from 'react-icons/io'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  )
  const [filter, setFilter] = useState('')

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleFilterInputChange = (e) => {
    const { name, value } = e.currentTarget

    switch (name) {
      case 'filter':
        return setFilter(value)

      default:
        throw new Error(`there is no such name as ${name}`)
    }
  }

  const addContact = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    }
    const normalizedName = name.toLowerCase()
    const contactExists = contacts.find(
      (contact) => contact.name.toLowerCase() === normalizedName,
    )

    if (contactExists) {
      alert(`${contact.name} is already in contacts`)
      return
    }

    setContacts((prevContacts) => [contact, ...prevContacts])
  }

  const getFilteredContact = () => {
    const normalazedFilter = filter.toLowerCase()

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalazedFilter),
    )
  }

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id),
    )
  }

  return (
    <Container>
      <Title>
        <TiContacts /> Phonebook
      </Title>
      <ContactForm onSubmit={addContact} />
      <TitleContacts>
        <IoIosContacts />
        Contacts
      </TitleContacts>
      <Filter onChange={handleFilterInputChange} />
      <ContactList
        contactsArr={getFilteredContact()}
        onDelete={deleteContact}
      />
    </Container>
  )
}

export default App
