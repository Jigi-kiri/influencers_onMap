import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import { Card } from "@mui/material";

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
			{markers.map((el, index) => (
				<Marker
					key={index}
					position={Object.values(el.location)}
					icon={iconConfiguration(el.category)}
				>
					<Popup>
						<Card>
							{el.fullname}
							<img src={el.img} style={{ width: "50px", height: "50px" }} />
						</Card>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default Map;