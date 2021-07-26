import styles from './subscribeButton.module.scss';

export function SubscribeButton(){
    return (
        <button type="button" className={styles.button}>
            Subscribe now
        </button>
    );
}