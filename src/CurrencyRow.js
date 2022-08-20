import React from 'react'

function CurrencyRow(props) {
  const { currencyOptions, selectedDefaultCurrency, onChangeCurrency , amount , onChangeAmount} = props //destructred 
  return (
    <div className='currency row'>
        <input type="number" value={amount} onChange={onChangeAmount}></input>
        <select value={selectedDefaultCurrency} onChange= {onChangeCurrency}>
          {currencyOptions.map(optionValue => (
            <option  key ={optionValue} value={optionValue}>{optionValue}</option> //map will create new array with result of calling
        //  <option value = "currency">Currency</option>
          ))}
        </select>
        
    </div>
  )
}

export default CurrencyRow