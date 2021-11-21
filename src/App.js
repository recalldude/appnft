import './App.css'
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import MonkeMint from './utils/MonkeMint.json'
import img1 from './img/1.png'
import img2 from './img/2.png'
import img3 from './img/10.png'
import img4 from './img/12.png'
import img5 from './img/13.png'
import img6 from './img/14.png'
import img7 from './img/15.png'
import img8 from './img/16.png'
import img9 from './img/17.png'
import img10 from './img/100.png'

const CONTRACT_ADDRESS = '0xE237b0307c61232a5574C5F71dB21eA3dEDFe279'

function App() {

  const [error, setError] = useState('')
  const [data, setData] = useState({})

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MonkeMint.abi, provider)
      try{
          const cost = 80000000000000000
          const totalSupply = await contract.actualSupply() 
          const object = {"cost": String(cost), "totalSupply": String(totalSupply)}
          setData(object)
      } catch(err) {
        setError(err.message)
      }
    }
  }

  async function mint() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method : 'eth_requestAccounts'})
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MonkeMint.abi, signer)
      try {
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.mintMonke(1, overrides)
        await transaction.wait()
        fetchData()
      } catch(err) {
        setError(err.message)
      }
    }
  }

  return (
    <div className="App">
      <div className="contqiner">
        <div className="banniere">
          <img src={img1} alt="img"/>
          <img src={img2} alt="img"/>
          <img src={img3} alt="img"/>
          <img src={img4} alt="img"/>
          <img src={img5} alt="img"/>
          <img src={img6} alt="img"/>
          <img src={img7} alt="img"/>
          <img src={img8} alt="img"/>
          <img src={img9} alt="img"/>
          <img src={img10} alt="img"/>
        </div>
        {error && <p>{error}</p>}
        <h1>Mint a MonkeNFT🐵🍌</h1>
        <p className="count">{data.totalSupply}/100</p>
        <p className="cost">Each Monke costs {data.cost / 10**18} eth (excluding gas fees)</p>
        <button onClick={mint}>BUY one MonkeNFT</button>
      </div>
    </div>
  );
}

export default App;
