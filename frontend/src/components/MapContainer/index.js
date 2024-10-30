import TuneIcon from "@mui/icons-material/Tune";
import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { lazy, useCallback, useEffect, useState } from "react";
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

let InfluencersList;
const MapContainer = () => {
	const [open, setOpen] = useState(false);
	const [influencersData, setInfluencersData] = useState([]);
	const [loading, setLoading] = useState(false);
	const classes = useStyle();
	const baseURL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

	useEffect(() => {
		if (influencersData.length === 0) {
			setLoading(true);
			axios
				.get(`${baseURL}/influencers/`, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					setInfluencersData(res.data);
					InfluencersList = res.data;
				})
				.catch((err) => console.log("errrrr", err))
				.finally(() => setLoading(false));
		}
	}, []);

	const onFilterClick = useCallback(
		(e) => {
			let updatedInfluencers = [...influencersData];
			if (!e?.target?.checked) {
				updatedInfluencers = influencersData.filter(
					(el) => el.category !== e?.target?.name
				);
				return setInfluencersData(updatedInfluencers);
			} else setInfluencersData(InfluencersList);
		},
		[influencersData]
	);

	const applyFilter = (val) => {
		axios
			.get(`${baseURL}/influencer/${val.fullname}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => setInfluencersData(res.data))
			.catch((err) => console.log("err", err));
	};

	const clearFilter = () => {
		setInfluencersData(InfluencersList);
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

	return loading ? (
		"...Loading"
	) : (
		<div>
			<Map influencersList={influencersData} getIcons={getIcon} />
			<MapFilter
				open={open}
				handleFilterClose={() => setOpen(false)}
				influencersList={influencersData}
				optionList={InfluencersList}
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