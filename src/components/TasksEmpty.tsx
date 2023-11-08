import styles from './TasksEmpty.module.css';

import clipboard from '../assets/clipboard.svg';

export function TasksEmpty() {
	return (
		<div className={styles.tasksEmpty}>
			<img src={clipboard} alt='Não há tarefas' />
			<div>
				<strong>Você ainda não tem tarefas cadastradas</strong>
				<p>Cire tarefas e organize seus itens a fazer</p>
			</div>
		</div>
	);
}
