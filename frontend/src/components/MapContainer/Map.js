import "leaflet/dist/leaflet.css";
import React, { lazy, Suspense, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import { Typography } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
const InfluencerCard = lazy(() => import("./InfluencerCard"));

const Map = ({ influencersList, getIcons }) => {
	const position = [23.008072570408963, 72.52408749042945];
	const [markers, setMarkers] = useState(influencersList);

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
							<Popup maxWidth={250} minWidth={200}>
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