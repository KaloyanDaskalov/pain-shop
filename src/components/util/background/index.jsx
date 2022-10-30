import classes from './background.module.css'

export default function Background({ children }) {
	return (
		<div className={classes.container}>
			{children}
		</div>
	)
}