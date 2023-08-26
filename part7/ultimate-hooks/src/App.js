import { useField, useResource } from './hooks'

const App = () => {
  const [content, resetContent] = useField('text')
  const [name, resetName] = useField('text')
  const [number, resetNumber] = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    try {
      await noteService.create({ content: content.value })
      resetContent()
    } catch (err) {
      console.log('Error submitting note: ', err)
      alert('Error submitting note')
    }
  }

  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    try {
      await personService.create({ name: name.value, number: number.value })
      resetName()
      resetNumber()
    } catch (err) {
      console.log('Error submitting new contact: ', err)
      alert('Error submitting new contact')
    }
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes === undefined ? (
        <p>Error fetching notes</p>
      ) : (
        notes.map((n) => <p key={n.id}>{n.content}</p>)
      )}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons === undefined ? (
        <p>Error fetching contacts</p>
      ) : (
        persons.map((n) => (
          <p key={n.id}>
            {n.name} {n.number}
          </p>
        ))
      )}
    </div>
  )
}

export default App
