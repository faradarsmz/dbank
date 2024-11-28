import { useEffect, useState } from 'react';
import { dbank_backend } from 'declarations/dbank_backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    dbank_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }


  function handleCheckBalance() {
    dbank_backend.checkBalance().then((currentBalance)=>{
      setBalance(currentBalance);
    })
  }

  useEffect(()=>{
    handleCheckBalance();
  },[])

  function handleTopUp(event) {
    event.preventDefault();
    const topUpAmount = parseFloat(amount);
    dbank_backend.topUp(topUpAmount).then(() =>{
      setAmount(0);
      handleCheckBalance();
    })
    return false;
  }

  function handleWithdraw(event) {
    event.preventDefault();
    const withdrawAmount = parseFloat(balance);
    // const withdrawAmount = parseFloat(amount);
    dbank_backend.withDraw(withdrawAmount).then(() =>{
      setAmount(0);
      handleCheckBalance();
    })
    return false;
  }

  function compound (event) {
    event.preventDefault();
    dbank_backend.compound().then(()=>{
      handleCheckBalance();
    })
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />

      <h2>Current Balance: {balance}</h2>

      <form onSubmit={handleTopUp}>
      <label htmlFor="topup">Top Up: &nbsp;</label>
      <input type="number" id='topup' value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type='submit'>Top Up</button>
      </form>

      <form onSubmit={handleWithdraw}>
      <label htmlFor="withdraw">Withdraw: &nbsp;</label>
      <input type="number" id='withdraw' value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type='submit'>Withdraw</button>
      </form>

      <form>
        <label htmlFor="compound">Compound: &nbsp;</label>
        <button onClick={compound}>Compound</button>
      </form>



    </main>
  );
}

export default App;
