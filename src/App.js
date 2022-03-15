import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddDialog = ({ handleAddFormChange, handleAddFormSubmit }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClickOpen}>
				<AddBoxIcon />
				Add new user
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add new contact</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter the information to add new contact</DialogContentText>
					<Box
						component="form"
						sx={{
							"& .MuiTextField-root": { m: 1, width: "25ch" },
						}}
						noValidate
						autoComplete="off"
						onSubmit={handleAddFormSubmit}
					>
						<TextField
							type="text"
							name="fullName"
							required="required"
							placeholder="Enter a name..."
							onChange={handleAddFormChange}
						/>
						<TextField
							type="text"
							name="address"
							required="required"
							placeholder="Enter an addres..."
							onChange={handleAddFormChange}
						/>
						<TextField
							type="text"
							name="phoneNumber"
							required="required"
							placeholder="Enter a phone number..."
							onChange={handleAddFormChange}
						/>
						<TextField
							type="email"
							name="email"
							required="required"
							placeholder="Enter an email..."
							onChange={handleAddFormChange}
						/>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button type="submit">Add</Button>
						</DialogActions>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
};
const App = () => {
	const [contacts, setContacts] = useState(data);
	const [addFormData, setAddFormData] = useState({
		fullName: "",
		address: "",
		phoneNumber: "",
		email: "",
	});

	const [editFormData, setEditFormData] = useState({
		fullName: "",
		address: "",
		phoneNumber: "",
		email: "",
	});

	const [editContactId, setEditContactId] = useState(null);

	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};

	const handleEditFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);
	};

	const handleAddFormSubmit = (event) => {
		event.preventDefault();

		const newContact = {
			id: nanoid(),
			fullName: addFormData.fullName,
			address: addFormData.address,
			phoneNumber: addFormData.phoneNumber,
			email: addFormData.email,
		};

		const newContacts = [...contacts, newContact];
		setContacts(newContacts);
	};

	const handleEditFormSubmit = (event) => {
		event.preventDefault();

		const editedContact = {
			id: editContactId,
			fullName: editFormData.fullName,
			address: editFormData.address,
			phoneNumber: editFormData.phoneNumber,
			email: editFormData.email,
		};

		const newContacts = [...contacts];

		const index = contacts.findIndex((contact) => contact.id === editContactId);

		newContacts[index] = editedContact;

		setContacts(newContacts);
		setEditContactId(null);
	};

	const handleEditClick = (event, contact) => {
		event.preventDefault();
		setEditContactId(contact.id);

		const formValues = {
			fullName: contact.fullName,
			address: contact.address,
			phoneNumber: contact.phoneNumber,
			email: contact.email,
		};

		setEditFormData(formValues);
	};

	const handleCancelClick = () => {
		setEditContactId(null);
	};

	const handleDeleteClick = (contactId) => {
		const newContacts = [...contacts];

		const index = contacts.findIndex((contact) => contact.id === contactId);

		newContacts.splice(index, 1);

		setContacts(newContacts);
	};

	return (
		<div className="app-container">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "1rem",
				}}
			>
				<AddDialog
					handleAddFormChange={handleAddFormChange}
					handleAddFormSubmit={handleAddFormSubmit}
				/>
				<Paper>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search "
						inputProps={{ "aria-label": "search google maps" }}
						variant="outlined"
					/>
					<Button type="submit" sx={{ p: "10px" }} aria-label="search">
						<SearchIcon />
					</Button>
				</Paper>
			</Box>
			<form onSubmit={handleEditFormSubmit}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>Phone Number</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{contacts.map((contact) => (
							<Fragment>
								{editContactId === contact.id ? (
									<EditableRow
										editFormData={editFormData}
										handleEditFormChange={handleEditFormChange}
										handleCancelClick={handleCancelClick}
									/>
								) : (
									<ReadOnlyRow
										contact={contact}
										handleEditClick={handleEditClick}
										handleDeleteClick={handleDeleteClick}
									/>
								)}
							</Fragment>
						))}
					</TableBody>
				</Table>
			</form>
		</div>
	);
};

export default App;
