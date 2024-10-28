import TuneIcon from "@mui/icons-material/Tune";
import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { lazy, useCallback, useState } from "react";
import InfluencersList from "../../fixture/influencers.json";
import vBlogger from "../Icon/Blogger.png";
import Fashion from "../Icon/Fashion.png";
import Motivation from "../Icon/Motivation.png";
import SocialWorker from "../Icon/SocialWorker.png";
import Technology from "../Icon/Technology.png";

const Map = lazy(() => import("./Map"));
const MapFilter = lazy(() => import("./MapFilter"));

const useStyle = makeStyles((theme) => ({
	fab: {
		zIndex: 1000,
		position: "absolute !important",
		right: 50,
		top: 50,
	},
}));

const MapContainer = () => {
	const [open, setOpen] = useState(false);
	const classes = useStyle();

	const onFilterClick = () => {
		setOpen(true);
	};

	const getIcon = useCallback((val) => {
		switch (val) {
			case "Motivation":
				return Motivation;
				break;
			case "Fashion":
				return Fashion;
				break;
			case "Vloger":
				return vBlogger;
				break;
			case "SocialWorker":
				return SocialWorker;
				break;
			case "Technology":
				return Technology;
				break;
			default:
				return;
		}
	}, []);
	return (
		<div>
			<Map influencersList={InfluencersList} getIcons={getIcon} />
			<MapFilter
				open={open}
				handleFilterClose={() => setOpen(false)}
				influencersList={InfluencersList}
				getIcon={getIcon}
			/>
			<Fab
				color="primary"
				aria-label="add"
				className={classes.fab}
				onClick={onFilterClick}

			>
				<TuneIcon />
			</Fab>
		</div>
	);
};

export default MapContainer;