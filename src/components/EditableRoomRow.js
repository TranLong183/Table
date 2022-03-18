import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { GithubPicker } from "react-color";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const ColorDialog = ({ editFormData, handleChangeComplete }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return <div></div>;
};

const EditableRow = ({
	editFormData,
	handleEditFormChange,
	handleCancelClick,
	color,
	handleChangeComplete,
}) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<TableRow>
			<TableCell>
				<TextField
					type="text"
					required="required"
					placeholder="Enter room name..."
					name="name"
					value={editFormData.name}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					type="text"
					required="required"
					placeholder="Enter room size..."
					name="size"
					value={editFormData.size}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<Box
					type="text"
					required="required"
					placeholder="Choose color..."
					name="color"
					// value={editFormData.color}
					onChange={handleEditFormChange}
				>
					<Box
						sx={{
							backgroundColor: `${color}`,
							padding: "10px",
							border: "1px solid black",
							width: "1rem",
							aspectRatio: "1",
						}}
						onClick={handleClickOpen}
					/>
					<Dialog open={open} onClose={handleClose}>
						<DialogContent>
							<DialogContentText>Choose color</DialogContentText>
							<Box>
								<GithubPicker
									color={editFormData.color}
									onChangeComplete={handleChangeComplete}
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>OK</Button>
						</DialogActions>
					</Dialog>
				</Box>
			</TableCell>
			<TableCell>
				<TextField
					type="text"
					required="required"
					placeholder="Enter an email..."
					name="peripheral"
					value={editFormData.peripheral}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					type="text"
					required="required"
					placeholder="Enter an email..."
					name="roomVip"
					value={editFormData.roomVip}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<Button type="submit">
					<SaveAltIcon />
				</Button>
				<IconButton
					color="primary"
					aria-label="cancel"
					component="span"
					type="button"
					onClick={handleCancelClick}
				>
					<CancelIcon />
				</IconButton>

				{/* <button type="button" onClick={handleCancelClick}>
					Cancel
				</button> */}
			</TableCell>
		</TableRow>
	);
};

export default EditableRow;
