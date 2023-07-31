import React, { useEffect } from 'react'

interface ScriptTagProps {
  id: string
  src: string
  async?: boolean
}

export default function ScriptTag({ id, src, async = false }: ScriptTagProps) {
  useEffect(() => {
    const resource = document.createElement('script')
    resource.src = src
    if (id) resource.id = id
    if (async) resource.async = true
    document.body.appendChild(resource)

    return () => {
      if(document.body.contains(resource))
        document.body.removeChild(resource)
    }
  })

  return <></>
}