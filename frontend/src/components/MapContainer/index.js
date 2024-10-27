import TuneIcon from '@mui/icons-material/Tune';
import { Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { lazy, useState } from 'react';

const Map = lazy(() => import("./Map"));
const MapFilter = lazy(() => import("./MapFilter"));

const useStyle = makeStyles((theme) => ({
	fab: {
		zIndex: 1000,
		position: "absolute !important",
		right: 50,
		top: 50,
	},
}))


const MapContainer = () => {
	const [open, setOpen] = useState(false);
	const classes = useStyle();

	const onFilterClick = () => {
		setOpen(true)
	}
	return (
		<div>
			<MapFilter open={open} handleFilterClose={() => setOpen(false)}/>
			<Map />
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={onFilterClick}>
				<TuneIcon />	
			</Fab>
		</div>
	)
}

export default MapContainer