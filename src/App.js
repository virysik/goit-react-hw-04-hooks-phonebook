import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Container, Title, TitleContacts } from './App.styles'
import { TiContacts } from 'react-icons/ti'
import { IoIosContacts } from 'react-icons/io'
import { GiButterflyWarning } from 'react-icons/gi'
import toast, { Toaster } from 'react-hot-toast'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import useLocalStorage from './hooks/useLocaleStorage'

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [filter, setFilter] = useState('')

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
      return toast(`${contact.name} is already in contacts`, {
        style: { color: '#456173' },
        icon: <GiButterflyWarning />,
      })
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
      <Toaster />
    </Container>
  )
}

export default App
