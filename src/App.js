import Summary from './Summary'
import TableRow from './TableRow'

import './styles.scss'

function App() {
  return (
    <>
      <main>
        <h1>Carrinho de compras</h1>
        <div className="content">
          <section>
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
                <TableRow />
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
