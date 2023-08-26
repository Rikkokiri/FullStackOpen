import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [
    {
      type,
      value,
      onChange,
    },
    reset,
  ]
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setResources(response.data)
      })
      .catch((err) => {
        setResources(undefined)
        console.log('Error fetching resources: ', err)
      })
  }, [baseUrl])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat(response.data))
    } catch (err) {
      throw err
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}
