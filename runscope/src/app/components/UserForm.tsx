'use client'

import { useState } from 'react'
import '../styles.css' // Importe le fichier CSS

export default function UserForm() {
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, age: Number(age)}),
      })

      if (!res.ok) throw new Error('Erreur création utilisateur')

      const user = await res.json()
      alert('Utilisateur créé avec ID : ' + user.id)

      setEmail('')
      setAge('')
    } catch (error) {
      alert((error as Error).message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        className="formInput"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        className="formInput"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        required
        onChange={e => setAge(e.target.value)}
        className="formInput"
      />
      <button type="submit" className="formButton">Créer utilisateur</button>
    </form>
  )
}