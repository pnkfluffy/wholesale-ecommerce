import React from 'react'

const AuthField = ({
  widthCSS,
  icon,
  name,
  value,
  type,
  changeField,
  placeholder,
  error
}) => {
  return (
    <div className={widthCSS}>
      <div className={`auth_field_container  + ${error && 'input_error'}`}>
        {icon}
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => changeField(e)}
          className='auth_input'
        />
      </div>
    </div>
  )
}

export default AuthField
