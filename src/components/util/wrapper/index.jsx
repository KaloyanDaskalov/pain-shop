import classes from './wrapper.module.css'

export default function Wrapper({ children, addClass }) {

	const classList = [classes.wrapper]

	if (addClass) {
		addClass.split(' ').forEach(c => classList.push(classes[c]))
	}

	return (
		<div className={classList.join(' ')}>
			{children}
		</div>
	)
}