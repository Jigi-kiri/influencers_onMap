import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Drawer, IconButton, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import React from 'react';

const useStyle = makeStyles((theme) => ({
	drawer: {
		width: 300,
		height: 525,
		marginTop: 60,
		marginRight: 20,
		borderRadius: 10,
	},
	filterIcon: {
		marginBottom: -5,
		marginRight: 5,
		marginLeft: -5,
	},
	filters: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 35,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	},
	title: {
		verticalAlign: "middle",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
}))


const MapFilter = ({open, handleFilterClose}) => {
	const classes = useStyle()

	return (
		<div className='Filterclass'>
			<Drawer open={open} classes={{paper:classes.drawer}} anchor='right'>
				<section className={classes.title}>
					<Typography variant="h5" style={{ fontSize: "18px" }}>
						<FilterAltOutlinedIcon fontSize='small' className={classes.filterIcon} />{" "}
						Filter Options
					</Typography>
					<IconButton onClick={handleFilterClose}>
						<CloseOutlinedIcon fontSize="small" />
					</IconButton>
				</section>
			</Drawer>
		
		</div>
	)
}

export default MapFilter