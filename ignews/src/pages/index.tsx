import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    productId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | igNews</title>
      </Head>
      
      <main className={styles.container}>
        <section className={styles.welcome}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br/>the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton productId = {product.productId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}


export const getStaticProps : GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JHcAOFFHFI5228pEkfXTtnD');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product,
    },

    revalidate: 60 * 60 * 24 // 24 Horas
  }
}