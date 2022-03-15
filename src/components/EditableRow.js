import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
	return (
		<TableRow>
			<TableCell>
				<TextField
					type="text"
					required="required"
					placeholder="Enter a name..."
					name="fullName"
					value={editFormData.fullName}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					type="text"
					required="required"
					placeholder="Enter an address..."
					name="address"
					value={editFormData.address}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					type="text"
					required="required"
					placeholder="Enter a phone number..."
					name="phoneNumber"
					value={editFormData.phoneNumber}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<TextField
					type="email"
					required="required"
					placeholder="Enter an email..."
					name="email"
					value={editFormData.email}
					onChange={handleEditFormChange}
				></TextField>
			</TableCell>
			<TableCell>
				<Button type="submit">
					<SaveAltIcon />
				</Button>
				<IconButton
					color="primary"
					aria-label="upload picture"
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
