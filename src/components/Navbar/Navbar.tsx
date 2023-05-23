import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

export const Navbar = () => {

  return (
      <aside className={styles.aside}>
        <NavLink className={({ isActive, isPending }) => isPending ? `${styles.pendinglink}` : isActive ? `${styles.activelink}` : `${styles.link}`}
          to='/home'>Homepage
        </NavLink>
        <NavLink className={({ isActive, isPending }) => isPending ? `${styles.pendinglink}` : isActive ? `${styles.activelink}` : `${styles.link}`}
          to='/guest'>GuestPage
        </NavLink>
      </aside>
  )
}
