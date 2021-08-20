import { signIn, useSession } from 'next-auth/client';
import styles from './subscribeButton.module.scss';
import { getStripeJs } from '../../services/stripe-js';
import { api } from '../../services/api';
import { redirect } from 'next/dist/next-server/server/api-utils';
import { useRouter } from 'next/router';

interface SubscribeButtonProps {
    productId: string;
}

export function SubscribeButton({productId}: SubscribeButtonProps){
    const [session] = useSession();
    const router = useRouter();
    async function handleSubscribe() {
        if(!session){
            signIn('github')
            return;
        }

        if(session.activeSubscription) {
            router.push('/posts')
            return
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