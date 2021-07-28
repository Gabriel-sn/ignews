import styles from './subscribeButton.module.scss';

interface SubscribeButtonProps {
    productId: string;
}

export function SubscribeButton({productId}: SubscribeButtonProps){
    return (
        <button type="button" className={styles.button}>
            Subscribe now
        </button>
    );
}