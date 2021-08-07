import { signIn, useSession } from 'next-auth/client';
import styles from './subscribeButton.module.scss';
import { getStripeJs } from '../../services/stripe-js';
import { api } from '../../services/api';

interface SubscribeButtonProps {
    productId: string;
}

export function SubscribeButton({productId}: SubscribeButtonProps){
    const [session] = useSession();

    async function handleSubscribe() {
        if(!session){
            signIn('github')
            return;
        }

        try{
            const response = await api.post('/subscribe');
            const {sessionId} = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId});
        } catch (err){
            alert(err.message);
        }
    }

    return (
        <button 
            type="button"
            className={styles.button}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}