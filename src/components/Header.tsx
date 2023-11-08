import styles from './Header.module.css';

import toDoLogo from '../assets/todo-logo.svg';

export function Header() {
	return (
		<header className={styles.header}>
			<img src={toDoLogo} alt='Logo do ToDo' />
		</header>
	);
}
