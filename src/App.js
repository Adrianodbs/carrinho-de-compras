import Summary from './Summary'
import TableRow from './TableRow'

import './styles.scss'
import { useEffect, useState } from 'react'
import { api } from './provider'

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function App() {
  const [cart, setCart] = useState([])

  const productObject = {
    name: 'produto',
    category: 'categoria',
    price: randomNumber(90, 1200),
    quantity: 1
  }

  const fetchData = () => {
    api.get('/cart').then(response => setCart(response.data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddItem = () => {
    api.post('/cart', productObject).then(response => {
      fetchData()
    })
  }

  const handleRemoveItem = () => {
    alert('clicou')
  }

  const handleUpdateItem = () => {
    alert('clicou')
  }

  return (
    <>
      <main>
        <h1 style={{ padding: '40px' }}>Carrinho de compras</h1>
        <div className="content">
          <section>
            <button
              onClick={handleAddItem}
              style={{ padding: '5px 10px', marginBottom: '15px' }}
            >
              add to cart
            </button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <TableRow />
                ))}
                {cart.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>
                      O carrinho de compras está vazio!.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary />
          </aside>
        </div>
      </main>
    </>
  )
}

export default App
