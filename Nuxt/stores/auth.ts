export const useAuth = async (email: string, password: string): Promise<boolean> => {
  const basic = btoa(`${email}:${password}`)

  try {
    const res = await fetch('https://api.dms.keysmash.eu/users/token', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${basic}`,
        Accept: 'application/json',
      },
    })

    if (!res.ok) throw new Error('Neplatné přihlašovací údaje')

    const data = await res.json()

    const expirationDate = new Date(data.access_token_expiration)
    const expirationSeconds = Math.floor((expirationDate.getTime() - Date.now()) / 1000)

    const cookie = useCookie('token', {
      maxAge: expirationSeconds,
      path: '/',
      sameSite: 'strict',
      secure: false,
    })

    cookie.value = data.access_token

    return true
  } catch (err) {
    console.error('Login failed', err)
    return false
  }
}

