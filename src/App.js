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

  const handleRemoveItem = item => {
    api.delete(`/cart/${item._id}`).then(response => {
      fetchData()
    })
  }

  const handleUpdateItem = (item, action) => {
    let newQuantity = item.quantity

    if (action === 'increase') {
      newQuantity += 1
    }
    if (action === 'decrease') {
      if (newQuantity === 1) {
        return
      }
      newQuantity -= 1
    }

    const newData = { ...item, quantity: newQuantity }
    delete newData._id

    api.put(`/cart/${item._id}`, newData).then(() => {
      fetchData()
    })
  }

  const getTotal = () => {
    let sum = 0

    for (let item of cart) {
      sum += item.price * item.quantity
    }

    return sum
  }

  const cartTotal = getTotal()

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
                  <TableRow
                    key={item._id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
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
            <Summary total={cartTotal} />
          </aside>
        </div>
      </main>
    </>
  )
}

export default App
