import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles, disable },...btn) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
      disabled={disable}
    >
      {title}
    </button>
  )
}

export default CustomButton