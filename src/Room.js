import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./room.json";
import ReadOnlyRow from "./components/ReadOnlyRoomRow";
import EditableRow from "./components/EditableRoomRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, Paper, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { GithubPicker } from "react-color";

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}
TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
const AddDialog = ({
	handleAddFormChange,
	handleAddFormSubmit,
	color,
	addFormData,
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
		<div>
			<Button onClick={handleClickOpen}>
				<AddBoxIcon />
				Add new room
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add new room</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter the information to add new room</DialogContentText>
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
							name="name"
							required="required"
							placeholder="Enter room name..."
							onChange={handleAddFormChange}
						/>
						<TextField
							type="text"
							name="size"
							required="required"
							placeholder="Enter room size..."
							onChange={handleAddFormChange}
						/>
						{/* <TextField
							type="text"
							name="roomColor"
							required="required"
							placeholder="Enter room color..."
							onChange={handleAddFormChange}
						/> */}

						<TextField
							type="text"
							name="peripheral"
							required="required"
							placeholder="Please check..."
							onChange={handleAddFormChange}
						/>
						<TextField
							type="text"
							name="roomVip"
							required="required"
							placeholder="Please check..."
							onChange={handleAddFormChange}
						/>
						<Box sx={{ marginRight: "1rem", padding: ".5rem" }}>
							<Box
								sx={{
									backgroundColor: `${color}`,
									padding: "10px",
									border: "1px solid black",
									width: "1rem",
									aspectRatio: "1",
								}}
							/>
							<GithubPicker color={color} onChangeComplete={handleChangeComplete} />
						</Box>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button onClick={handleClose} type="submit">
								Add
							</Button>
						</DialogActions>
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
};
function Room() {
	const [searchValue, setSearchValue] = useState();
	const [page, setPage] = React.useState(0);
	const [color, setColor] = useState("blue");
	const handleChangeComplete = (color) => {
		setColor(color.hex);
	};
	const [rowsPerPage, setRowsPerPage] = React.useState(2);
	const [rooms, setRooms] = useState(data);
	const [addFormData, setAddFormData] = useState({
		name: "",
		size: "",
		color: "",
		peripheral: "",
		roomVip: "",
	});

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rooms.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [editFormData, setEditFormData] = useState({
		name: "",
		size: "",
		color: "",
		peripheral: "",
		roomVip: "",
	});

	const [editRoomId, setEditRoomId] = useState(null);

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

		const newRoom = {
			id: nanoid(),
			name: addFormData.name,
			size: addFormData.size,
			color: color,
			peripheral: addFormData.peripheral,
			roomVip: addFormData.roomVip,
		};

		const newRooms = [...rooms, newRoom];
		setRooms(newRooms);
	};

	const handleEditFormSubmit = (event) => {
		event.preventDefault();

		const editedRoom = {
			id: editRoomId,
			name: editFormData.name,
			size: editFormData.size,
			color: color,
			peripheral: editFormData.peripheral,
			roomVip: editFormData.roomVip,
		};

		const newRooms = [...rooms];

		const index = rooms.findIndex((room) => room.id === editRoomId);

		newRooms[index] = editedRoom;

		setRooms(newRooms);
		setEditRoomId(null);
	};

	const handleEditClick = (event, room) => {
		event.preventDefault();
		setEditRoomId(room.id);

		const formValues = {
			name: room.name,
			size: room.size,
			color: room.color,
			peripheral: room.peripheral,
			roomVip: room.roomVip,
		};

		setEditFormData(formValues);
	};

	const handleCancelClick = () => {
		setEditRoomId(null);
	};

	const handleDeleteClick = (roomId) => {
		const newRooms = [...rooms];

		const index = rooms.findIndex((contact) => contact.id === roomId);

		newRooms.splice(index, 1);

		setRooms(newRooms);
	};

	const handleSearchClick = ({ searchValue, rooms }) => {
		const result = rooms.find(({ fullName }) => fullName === searchValue);
		console.log(result);
	};
	return (
		<Box className="app-container" sx={{ padding: "1rem" }}>
			<Paper
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					// padding: "1rem",
					padding: ".5rem",
				}}
			>
				<AddDialog
					handleAddFormChange={handleAddFormChange}
					handleAddFormSubmit={handleAddFormSubmit}
					color={color}
					handleChangeComplete={handleChangeComplete}
					addFormData={addFormData}
				/>
				<Paper>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search "
						inputProps={{ "aria-label": "search google maps" }}
						variant="outlined"
						value={searchValue}
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
					<Button
						sx={{ p: "10px" }}
						aria-label="search"
						onClick={handleSearchClick({ rooms, searchValue })}
					>
						<SearchIcon />
					</Button>
				</Paper>
			</Paper>
			<Paper sx={{ marginTop: "1rem" }}>
				<form onSubmit={handleEditFormSubmit}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Room Size</TableCell>
								<TableCell>Room Color</TableCell>
								<TableCell>Peripheral</TableCell>
								<TableCell>Room Vip</TableCell>
								<TableCell>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: rooms
							).map((room) => (
								<Fragment>
									{editRoomId === room.id ? (
										<EditableRow
											editFormData={editFormData}
											handleEditFormChange={handleEditFormChange}
											handleCancelClick={handleCancelClick}
											handleChangeComplete={handleChangeComplete}
											color={color}
										/>
									) : (
										<ReadOnlyRow
											room={room}
											handleEditClick={handleEditClick}
											handleDeleteClick={handleDeleteClick}
										/>
									)}
								</Fragment>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[2, 5, 10, 25, { label: "All", value: -1 }]}
									count={rooms.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										inputProps: {
											"aria-label": "rows per page",
										},
										native: true,
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</TableRow>
							{/* <Box
							sx={{
								backgroundColor: `${color}`,
								padding: "10px",
								border: "1px solid black",
								width: "1rem",
								aspectRatio: "1",
							}}
						/>
						<GithubPicker color={color} onChangeComplete={handleChangeComplete} /> */}
						</TableFooter>
					</Table>
				</form>
			</Paper>
		</Box>
	);
}

export default Room;
