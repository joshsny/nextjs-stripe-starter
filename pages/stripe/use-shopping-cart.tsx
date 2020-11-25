import { NextPage } from 'next'
import Layout from '../../components/stripe/Layout'

import Cart from '../../components/stripe/Cart'
import CartSummary from '../../components/stripe/CartSummary'
import Products from '../../components/stripe/Products'

const DonatePage: NextPage = () => {
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Shopping Cart</h1>
        <p>
          Powered by the{' '}
          <a href="https://useshoppingcart.com">use-shopping-cart</a> React
          hooks library.
        </p>
        <Cart>
          <CartSummary />
          <Products />
        </Cart>
      </div>
    </Layout>
  )
}

export default DonatePage
