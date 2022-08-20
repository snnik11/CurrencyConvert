
import { useEffect , useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const currencyAPI = "https://api.exchangerate.host/latest"

//console.log('this is test ' + currencyAPI)
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyAPI)
  //console.log(currencyOptions)
  const[defaultFromCurrency , setDefaultFromCurrency] = useState();
  const[defaultToCurrency, setDefaultToCurrency] = useState();
  const[amount, setAmount] = useState(1);
  const[amountInFromCurrency, setAmountInFromCurrency] = useState(true) //this will inform which one to update if it is from one it will true
  const[exchangeRate, setExchangeRate] = useState();


  let  fromAmount, toAmount;

  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }
  else 
  {
    toAmount = amount
    fromAmount = amount /exchangeRate
  }
 
  console.log(exchangeRate)
 useEffect(() => {
    fetch(currencyAPI) //get request to the api
    .then(response => //get response object
      response.json() //get parses json into javascript object force
        //this arrow function will return json 
      ) 
   .then(data => {
   // console.log(data)
   // console.log(data.base)
   // console.log(data.date)
  //console.log(data.rates)
   //   console.log(Object.keys(data.rates))

   const defaultToFirstCurrency = Object.keys(data.rates)[0]
    setCurrencyOptions([data.base, ...Object.keys(data.rates)]) //here spread operator copies all parts of existing array in new array
    setDefaultFromCurrency(data.base)
    setDefaultToCurrency(defaultToFirstCurrency)
    setExchangeRate(data.rates[defaultToFirstCurrency])
    }
    )
  }, []) //takes two parameters //second parameter is empty array as we want to call it once only

  useEffect(() => {
    if( defaultFromCurrency !=null && defaultToCurrency != null)
    {
      fetch(`${currencyAPI}?base=${defaultFromCurrency}&symbols=${defaultToCurrency}`)
      .then(response => response.json())
      .then(data => setExchangeRate(data.rates[defaultToCurrency]))
    }
     
  },[defaultFromCurrency,defaultToCurrency])

  function handleFromAmountChange(e){
      setAmount(e.target.value)
      setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
   <>
    <h1> Currency Convert App</h1>
    <CurrencyRow currencyOptions={currencyOptions}
    selectedDefaultCurrency = {defaultFromCurrency}
    onChangeCurrency = {e => setDefaultFromCurrency(e.target.value)}
    amount={fromAmount}
    onChangeAmount = {handleFromAmountChange}
    /> 
    {/* props used above as currencyOptions is an optional input component CurrencyRow csn accept to make it have dynamic input */}
    {/* props are properties (also object) that contains value passed from parent component */}
    <div> =</div>
    <CurrencyRow currencyOptions={currencyOptions}
    selectedDefaultCurrency = {defaultToCurrency}
    onChangeCurrency = {e => setDefaultToCurrency(e.target.value)}
    amount= {toAmount}
    onChangeAmount = {handleToAmountChange}
    />
   </>
  );
}

export default App;
