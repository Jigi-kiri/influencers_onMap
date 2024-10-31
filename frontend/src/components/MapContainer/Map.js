import "leaflet/dist/leaflet.css";
import React, { lazy, Suspense } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
const InfluencerCard = lazy(() => import("./InfluencerCard"));

const useStyle = makeStyles((theme) => ({
	popupContainer: {
		"& .leaflet-popup-content": {
		margin: "13px 15px 13px 15px",
    lineHeight: 1.3,
    fontSize: 13,
		}
	}
}))

const Map = ({ influencersList, getIcons }) => {
	const position = [23.008072570408963, 72.52408749042945];
	const classes = useStyle()

	const iconConfiguration = (value) => {
		return L.icon({
			iconUrl: getIcons(value),
			iconSize: [30, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41],
		});
	};

	return (
		<MapContainer
			center={position}
			zoom={10}
			style={{ height: "100vh", width: "100%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{influencersList.length > 0 &&
				influencersList?.map((el, index) => (
					<Marker
						key={index}
						position={Object.values(el.location)}
						icon={iconConfiguration(el.category)}
						riseOnHover={() => console.log("it's cocmming")}
					>
						<React.Fragment>
							<Tooltip direction="left">
								<Typography variant="subtitle1" fontSize={12} fontWeight={600}>
									{el?.fullname}
								</Typography>
							</Tooltip>
							<Popup maxWidth={250} minWidth={200} className={classes.popupContainer}>
								<Suspense fallback={null}>
									<InfluencerCard data={el} />
								</Suspense>
							</Popup>
						</React.Fragment>
					</Marker>
				))}
		</MapContainer>
	);
};

export default Map;