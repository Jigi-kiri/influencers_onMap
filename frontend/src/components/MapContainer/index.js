import TuneIcon from "@mui/icons-material/Tune";
import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { lazy, useCallback, useState, useEffect } from "react";
import InfluencersList from "../../fixture/influencers.json";
import vBlogger from "../Icon/Blogger.png";
import Fashion from "../Icon/Fashion.png";
import Motivation from "../Icon/Motivation.png";
import SocialWorker from "../Icon/SocialWorker.png";
import Technology from "../Icon/Technology.png";
import axios from "axios";

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
	const [influencers, setInfluencers] = useState(InfluencersList);
	const classes = useStyle();
	const baseURL = "http://locahost:8000"

	useEffect(() => {
		axios.get(`${baseURL}/influencers`).then((res) => console.log("res", res))
	}, [])


	const onFilterClick = (e) => {
		let updatedInfluencers = [...influencers];
		if (!e?.target?.checked) {
			updatedInfluencers = influencers.filter(
				(el) => el.category !== e?.target?.name
			);
			return setInfluencers(updatedInfluencers);
		} else setInfluencers(InfluencersList);
	};

	const applyFilter = (val) => {
		const updatedData = influencers.filter(
			(el) => el.fullname.toLowerCase() === val.toLowerCase()
		);
		setInfluencers(updatedData);
	};

	const clearFilter = () => {
		setInfluencers(InfluencersList);
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
			<Map influencersList={influencers} getIcons={getIcon} />
			<MapFilter
				open={open}
				handleFilterClose={() => setOpen(false)}
				influencersList={influencers}
				getIcon={getIcon}
				toggleHandler={onFilterClick}
				clearFilter={clearFilter}
				applyFilter={applyFilter}
			/>
			<Fab
				color="primary"
				aria-label="add"
				className={classes.fab}
				onClick={() => setOpen(true)}
			>
				<TuneIcon />
			</Fab>
		</div>
	);
};

export default MapContainer;