import {signIn, signOut, useSession} from 'next-auth/client';

import {FaGithub} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';
import styles from './singInButton.module.scss';

export default function SingInButton() {
    const [session] = useSession();

    console.log(session)

    return session ? (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGithub color="#04D361"/>
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button
            type="button" 
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417"/>
            Sing in with Github
        </button>
    )
    ;
}