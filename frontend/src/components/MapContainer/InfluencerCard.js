import {
	Box,
	Card,
	CardMedia,
	Typography,
	Divider,
	LinearProgress,
} from "@mui/material";
import React from "react";
import Youtube from "../Icon/youtube.svg";
import Facebook from "../Icon/facebook.svg";
import Instagram from "../Icon/instagram.svg";
import Tweeter from "../Icon/tweeter.svg";
import { makeStyles } from "@mui/styles";

const iconMapping = {
	Youtube: Youtube,
	Instagram: Instagram,
	Tweeter: Tweeter,
	Facebook: Facebook,
};

const useStyle = makeStyles((theme) => ({
	cardContainer: {
		display: "flex",
		flexDirection: "column",
		padding: 5,
		maxWidth: 300,
	},
	imageContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 5,
	},
	platformMain: {
		marginTop: 2,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 1,
	},
}));

const formatNumber = (value) => {
	if (value >= 1000) {
		return (value / 1000).toFixed(1) + "K";
	}
	return value.toString();
};

const InfluencerCard = ({ data }) => {
	const classes = useStyle();
	return (
		<div>
			<Card className={classes.cardContainer}>
				<CardMedia
					component="img"
					image={data.img}
					sx={{ width: 100, borderRadius: 2, margin: "0 auto" }}
					alt={`${data.fullname}'s profile`}
				/>
				<Box sx={{ textAlign: "center", mt: 1 }}>
					<Typography variant="h6" fontSize={18} fontWeight={600}>
						{data.fullname}
					</Typography>
					<Typography variant="caption" textAlign="end" color="textSecondary">
						{data.category}
					</Typography>
				</Box>

				<Box sx={{ mt: 2 }}>
					<Typography variant="subtitle2">Subscribers</Typography>
					<LinearProgress
						variant="determinate"
						value={(data.subscriber_count / 100000) * 100}
					/>
					<Typography variant="caption">
						{formatNumber(data.subscriber_count)}
					</Typography>

					<Typography variant="subtitle2" sx={{ mt: 1 }}>
						Followers
					</Typography>
					<LinearProgress
						variant="determinate"
						value={(data.follower_count / 100000) * 100}
					/>
					<Typography variant="caption">
						{formatNumber(data.follower_count)}
					</Typography>

					<Typography variant="subtitle2" sx={{ mt: 1 }}>
						Daily Reach
					</Typography>
					<LinearProgress
						variant="determinate"
						value={(data.daily_reach / 100000) * 100}
					/>
					<Typography variant="caption">
						{formatNumber(data.daily_reach)}
					</Typography>
				</Box>

				<Box className={classes.platformMain}>
					<Typography variant="subtitle2">Platforms:</Typography>
					<div className={classes.imageContainer}>
						{data.platforms.map((platform, index) => (
							<img key={index} src={iconMapping[platform]} sizes="small" />
						))}
					</div>
				</Box>
			</Card>
		</div>
	);
};

export default InfluencerCard;