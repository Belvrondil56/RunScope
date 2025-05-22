import UserForm from './components/UserForm'

export default function Home() {
  return (
    <main className="p-8 text-center font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bienvenue sur <span className="text-blue-600">Runscope</span>
      </h1>
      <p className="text-gray-500 mb-6">Crée ton profil pour suivre tes progrès running</p>
      <UserForm />
      <p style={{ marginTop: 20 }}>
        Déjà un compte ?{' '}
      <a href="/login" style={{ color: '#0070f3', textDecoration: 'underline' }}>
        Se connecter
      </a>
</p>

    </main>
  )
}