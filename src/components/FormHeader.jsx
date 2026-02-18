import React from 'react'

const FormHeader = ({title, description}) => {
  return (
    <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto max-sm:text-sm">
            {description}
          </p>
        </div>
  )
}

export default FormHeader