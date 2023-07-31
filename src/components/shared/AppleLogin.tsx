import React from 'react'
import MetaTag from './MetaTag'
import ScriptTag from './ScriptTag'

interface AppleLoginProps {
  clientId: string
  redirectURI: string
  scope?: string
  state?: string
  nonce?: string
  usePopup?: boolean
}

export default function AppleLogin({ clientId, scope = "name email", state, nonce, redirectURI, usePopup = true }: AppleLoginProps) {
  return (
    <>
      {clientId && <MetaTag name="appleid-signin-client-id" content={clientId} />}
      {scope && <MetaTag name="appleid-signin-scope" content={scope} />}
      {redirectURI && <MetaTag name="appleid-signin-redirect-uri" content={redirectURI} />}
      {state && <MetaTag name="appleid-signin-state" content={state} />}
      {nonce && <MetaTag name="appleid-signin-nonce" content={nonce} />}
      <MetaTag name="appleid-signin-use-popup" content={usePopup ? "true" : "false"} />
      <ScriptTag id="apple-js" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" />
      <div id="appleid-signin" data-color="black" data-border="false" data-type="sign in" style={{ width: 180, height: 40, marginTop: 10 }}></div>
    </>
  )
}
