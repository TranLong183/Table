import { TableCell } from "@mui/material";
import React from "react";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
	return (
		<TableRow>
			<TableCell>{contact.fullName}</TableCell>
			<TableCell>{contact.address}</TableCell>
			<TableCell>{contact.phoneNumber}</TableCell>
			<TableCell>{contact.email}</TableCell>
			<TableCell>
				<IconButton
					color="primary"
					aria-label="upload picture"
					component="span"
					onClick={(event) => handleEditClick(event, contact)}
				>
					<EditIcon />
				</IconButton>
				<IconButton
					color="primary"
					aria-label="upload picture"
					component="span"
					onClick={() => handleDeleteClick(contact.id)}
				>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default ReadOnlyRow;
