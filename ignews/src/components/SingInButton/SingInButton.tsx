import {FaGithub} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';
import styles from './singInButton.module.scss';

export default function SingInButton() {
    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#04D361"/>
            Gabriel Nascimento
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) :
    (
        <button type="button" className={styles.signInButton}>
            <FaGithub color="#eba417"/>
            Sing in with Github
        </button>
    )
    ;
}