import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
	Autocomplete,
	Drawer,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	IconButton,
	Switch,
	TextField,
	Typography,
	Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";

const useStyle = makeStyles((theme) => ({
	drawer: {
		width: 300,
		height: "75% !important",
		marginTop: 30,
		marginRight: 15,
		borderRadius: 10,
	},
	filterContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",
		paddingBottom: 20,
		padding: 15,
	},
	filterIcon: {
		marginBottom: -5,
		marginRight: 5,
		marginLeft: -5,
	},
	filters: {
		flex: 1,
		paddingTop: 2,
		marginTop: 10,
		paddingBottom: 30,
		display: "flex",
		flexDirection: "column",
		gap: 20,
	},
	title: {
		verticalAlign: "middle",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	buttonWrapper: {
		marginBottom: 10,
	},
	labelControl: {
		display: "flex",
		flexDirection: "row",
		width: 100,
		gap: 5,
		alignItems: "center",
	},
	root: {
		"& .MuiIconButton-root": {
			padding: 0,
		},
	},
	swtichContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 8,
	},
}));

const category = [
	"Motivation",
	"Fashion",
	"Vloger",
	"SocialWorker",
	"Technology",
];

const MapFilter = ({
	open,
	handleFilterClose,
	influencersList,
	getIcon,
	toggleHandler,
	applyFilter,
	clearFilter,
}) => {
	const [influencer, setInfluencer] = React.useState("");
	const classes = useStyle();

	return (
		<div>
			<Drawer
				anchor="right"
				open={open}
				PaperProps={{ className: classes.drawer }}
				onClose={handleFilterClose}
			>
				<section className={classes.filterContent}>
					<section className={classes.title}>
						<Typography variant="h5" style={{ fontSize: "18px" }}>
							<FilterAltOutlinedIcon
								fontSize="small"
								className={classes.filterIcon}
							/>{" "}
							Filter Options
						</Typography>
						<IconButton onClick={handleFilterClose}>
							<CloseOutlinedIcon fontSize="small" />
						</IconButton>
					</section>
					<section className={classes.filters}>
						<span>
							<FormControl component="fieldset">
								<FormLabel
									component="label"
									style={{ fontWeight: "bold", fontSize: 15, marginBottom: 5 }}
								>
									Visibility Filters
								</FormLabel>
							</FormControl>
							<FormGroup>
								<section className={classes.swtichContainer}>
									{category?.length > 0 &&
										category.map((el, index) => (
											<FormControlLabel
												key={index}
												control={
													<Switch
														color="primary"
														checked={influencersList
															.map((el) => el.category)
															.includes(el)}
														name={el}
														size="small"
														onChange={toggleHandler}
													/>
												}
												label={
													<div className={classes.labelControl}>
														<img src={getIcon(el)} height="25px" />
														<Typography variant="body2">{`${el}`} </Typography>
													</div>
												}
											/>
										))}
								</section>
							</FormGroup>
						</span>
						<section>
							<Autocomplete
								id="asynchronious"
								style={{ width: "100%" }}
								options={influencersList?.map((el) => el?.fullname) || []}
								value={influencer}
								onChange={(el, val) => setInfluencer(val)}
								renderInput={(params) => (
									<TextField
										className={classes.root}
										label="Influencer"
										variant="standard"
										placeholder="Type Influencer Name"
										{...params}
									/>
								)}
							/>
						</section>
					</section>
					<span className={classes.buttonWrapper}>
						<Button
							size="small"
							sx={{ mr: 2 }}
							onClick={() => {
								setInfluencer("");
								clearFilter();
							}}
						>
							Clear filters
						</Button>
						<Button
							color="primary"
							variant="contained"
							size="small"
							onClick={() => applyFilter(influencer)}
							disabled={!influencer}
						>
							Apply filters
						</Button>
					</span>
				</section>
			</Drawer>
		</div>
	);
};

export default MapFilter;