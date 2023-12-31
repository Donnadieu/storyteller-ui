import React from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import useTokenHelpers from './useTokenHelpers'
import { TokenizedUser } from 'lib/types'

export default function useAccessToken() {
  const { encrypt, clearCredentials, readTokensFromLocalStorage } = useTokenHelpers()
  const [loading, setLoading] = React.useState(false)
  const [accessToken, setAccessToken] = React.useState<string | null>(null)
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null)
  const [tokenizedUser, setTokenizedUser] = React.useState<TokenizedUser | null>(null)

  const refresh = React.useCallback(async () => {
    // Retrieve the refresh token from localStorage
    const { refreshToken: savedRefreshToken } = readTokensFromLocalStorage()

    try {
      setLoading(true)
      if (!savedRefreshToken) throw new Error('No refresh token found')
      const response = await axios.post('/oauth/token', {
        headers: { 'X-Skip-Authorization-Header': 'yes' },
        grant_type: 'refresh_token',
        refresh_token: savedRefreshToken,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      })

      const user = jwt_decode(response.data.access_token) as TokenizedUser
      // Set access token to state
      setAccessToken(response.data.access_token)
      // Set refresh token to state
      setRefreshToken(response.data.refresh_token)
      // Set tokenized user to state
      setTokenizedUser(user)

      // Encrypt and store the new token in localStorage
      const encryptedToken = encrypt(response.data.access_token)
      localStorage.setItem('token', encryptedToken)

      // Encrypt and Store the new refresh token in localStorage
      const encryptedRefreshToken = encrypt(response.data.refresh_token)
      localStorage.setItem('refreshToken', encryptedRefreshToken)

      // Encrypt and store the user in localStorage
      const encryptedUser = encrypt(JSON.stringify(user))
      localStorage.setItem('user', encryptedUser)
    } catch (error) {
      clearCredentials()
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, accessToken, refreshToken, tokenizedUser, refresh }
}
