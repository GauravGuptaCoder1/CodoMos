// Form validation utilities

export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required'
    }
    return null
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return null
  },

  password: (value) => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter'
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
    return null
  },

  matchField: (fieldName, fieldValue) => (value) => {
    if (value !== fieldValue) {
      return `Does not match ${fieldName}`
    }
    return null
  },

  number: (value) => {
    if (value && isNaN(Number(value))) {
      return 'Please enter a valid number'
    }
    return null
  },

  min: (minValue) => (value) => {
    if (value && Number(value) < minValue) {
      return `Must be at least ${minValue}`
    }
    return null
  },

  max: (maxValue) => (value) => {
    if (value && Number(value) > maxValue) {
      return `Must be no more than ${maxValue}`
    }
    return null
  },

  url: (value) => {
    try {
      if (value) new URL(value)
      return null
    } catch {
      return 'Please enter a valid URL'
    }
  },

  phone: (value) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (value && !phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
    return null
  },
}

export const validateField = (value, rules) => {
  for (const rule of rules) {
    const error = rule(value)
    if (error) return error
  }
  return null
}

export const validateForm = (values, schema) => {
  const errors = {}
  
  Object.keys(schema).forEach((field) => {
    const rules = schema[field]
    const error = validateField(values[field], rules)
    if (error) {
      errors[field] = error
    }
  })
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Hook for form validation
export const useFormValidation = (initialValues, schema) => {
  const [values, setValues] = React.useState(initialValues)
  const [errors, setErrors] = React.useState({})
  const [touched, setTouched] = React.useState({})

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    
    // Validate field on change if it's been touched
    if (touched[field]) {
      const error = validateField(value, schema[field] || [])
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(values[field], schema[field] || [])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault()
    const validation = validateForm(values, schema)
    
    if (validation.isValid) {
      onSubmit(values)
    } else {
      setErrors(validation.errors)
      setTouched(
        Object.keys(schema).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      )
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  }
}

// Add React import at the top
import React from 'react'
