import { useState } from 'react';
import { Trash } from '@phosphor-icons/react';
import { TaskType } from './Tasks';

import styles from './TasksList.module.css';

interface TaskListProps {
	task: TaskType;
	onDeleteTask: (id: string) => void;
	onCountTaskChecked: (id: string, isChecked: boolean) => void;
}

export function TasksList({
	task,
	onDeleteTask,
	onCountTaskChecked,
}: TaskListProps) {
	const [isChecked, setIsChecked] = useState(false);

	function handleOnChange() {
		onCountTaskChecked(task.id, !isChecked);
		setIsChecked(!isChecked);
	}

	function handleDeleteTask() {
		onDeleteTask(task.id);
	}

	const taskIsChecked = isChecked ? styles.taskChecked : styles.taskUnchecked;

	return (
		<>
			<div className={styles.taskItem}>
				<input
					type='checkbox'
					checked={isChecked}
					onChange={handleOnChange}
					className={styles.checkbox}
				/>
				<p className={taskIsChecked}>{task.content}</p>

				<button title='Deletar tarefa' onClick={handleDeleteTask}>
					<Trash size={20} />
				</button>
			</div>
		</>
	);
}
