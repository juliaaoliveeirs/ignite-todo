import { FormEvent, useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TasksEmpty } from './TasksEmpty';
import { TasksList } from './TasksList';
import { PlusCircle } from '@phosphor-icons/react';

import styles from './Tasks.module.css';

export interface TaskType {
	id: string;
	content: string;
	checked: boolean;
}

export function Tasks() {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [newTaskText, setNewTaskText] = useState<string>('');

	function handleCreateNewTask(event: FormEvent) {
		event.preventDefault();

		const newTask = {
			id: uuidv4(),
			content: newTaskText,
			checked: false,
		};

		setTasks([...tasks, newTask]);
		setNewTaskText('');
	}

	function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
		setNewTaskText(event.target.value);
	}

	function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('Insira uma tarefa');
	}

	function onDeleteTask(id: string) {
		setTasks(tasks.filter((task) => task.id !== id));
	}

	function onCountTaskChecked(id: string, isChecked: boolean) {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, checked: isChecked } : task
			)
		);
	}

	const totalTasks = tasks.length;

	const completedTasks =
		totalTasks === 0
			? 0
			: `${tasks.reduce(
					(count, task) => (task.checked ? count + 1 : count),
					0
			  )} de ${totalTasks}`;

	const isNewTaskEmpty = newTaskText.length === 0;

	return (
		<>
			<form onSubmit={handleCreateNewTask} className={styles.taskForm}>
				<input
					name='task'
					type='text'
					placeholder='Adicione uma nova tarefa'
					onChange={handleNewTaskChange}
					value={newTaskText}
					onInvalid={handleNewTaskInvalid}
					required
				/>

				<button type='submit' disabled={isNewTaskEmpty}>
					Criar
					<PlusCircle size={18} />
				</button>
			</form>
			<div className={styles.tasks}>
				<div className={styles.tasksCount}>
					<p>
						Tarefas Criadas <span>{totalTasks}</span>
					</p>
					<p>
						Concluídas
						<span>{completedTasks}</span>
					</p>
				</div>
				{tasks.length > 0 ? (
					tasks.map((task) => (
						<TasksList
							key={task.id}
							task={task}
							onDeleteTask={onDeleteTask}
							onCountTaskChecked={onCountTaskChecked}
						/>
					))
				) : (
					<TasksEmpty />
				)}
			</div>
		</>
	);
}
