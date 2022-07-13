import * as React from "react";
import PropTypes from "prop-types";
import { alpha, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import {theme} from '../../theme/color-theme'

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getMeetingsAsync} from "../../redux/users/thunks";

const formatStringToDate = (date) => {
	const [dateValues, timeValues] = date.split(' ');

	const [month, day, year] = dateValues.split('-');
	const [hours, minutes, seconds] = timeValues.split(':');
	return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
}

const formatDateToString = (date) => {
	return String(date.getMonth()).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + "-"
		+ date.getFullYear() + " " + String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0');
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: "name",
		numeric: true,
		disablePadding: false,
		label: "Meeting Name"
	},
	{
		id: "dateTimeUpdated",
		numeric: true,
		disablePadding: false,
		label: "Last Updated"
	},
	{
		id: "createdBy",
		numeric: true,
		disablePadding: false,
		label: "Created By"
	},
	{
		id: "link",
		numeric: true,
		disablePadding: false,
		label: "Link"
	}
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: theme.palette.common.black,
		color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		// border: 0,
	},
}));

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<ThemeProvider theme={theme}>
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts"
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<StyledTableCell
						key={headCell.id}
						// align={headCell.numeric ? "right" : "left"}
						align="right"
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							sx={{ fontWeight: 'bold' }}
							color="secondary"
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</StyledTableCell>
				))}
			</TableRow>
		</TableHead>
		</ThemeProvider>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
	const { numSelected } = props;

	return (
		<ThemeProvider theme={theme}>
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						)
				})
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : null }

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
		</ThemeProvider>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable() {
	const currentMeetings = useSelector((state) => state.usersReducer.list);

	useEffect(() => {
		dispatch(getMeetingsAsync("d515b255-0691-4778-9796-cb4f41840136"));
	}, []);
	const dispatch = useDispatch();

	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("meetingId");
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = currentMeetings.map((n) => n.meetingId);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleRedirectLink = (event, meetingId) => {
		window.location.href = "http://localhost:3000/home/" + meetingId;
	}

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - currentMeetings.length) : 0;

	return (
		<div className="">
		<ThemeProvider theme={theme}>
			<Typography
				sx={{ flex: '1 1 100%', fontWeight: 'bold', margin: "3% 0", "textAlign": "center"}}
				variant="h4"
				id="tableTitle"
				component="div"
			>
				All Meetings
			</Typography>

		<Box sx={{ mx: "auto", my: "3%", width: "80%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={currentMeetings.length}
						/>
						<TableBody>
							{stableSort(currentMeetings, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((meeting, index) => {
									const isItemSelected = isSelected(meeting.meetingId);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<StyledTableRow
											hover
											onClick={(event) => handleClick(event, meeting.meetingId)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={index}
											selected={isItemSelected}
										>
											<StyledTableCell padding="checkbox">
												<Checkbox
													color="primary"
													checked={isItemSelected}
													inputProps={{
														"aria-labelledby": labelId
													}}
												/>
											</StyledTableCell>
											<StyledTableCell
												sx={{ textDecoration: 'underline' }}
												id={labelId}
												scope="row"
												padding="none"
												align="right"
												onClick={(event) => handleRedirectLink(event,
													meeting.meetingId
													// "fc73754b-00be-4fa4-b02f-1efad9cffe05"
												)}
											>
												Test
												{/*{meeting.name}*/}
											</StyledTableCell>
											<StyledTableCell align="right">{meeting.dateTimeUpdated}</StyledTableCell>
											<StyledTableCell align="right">{meeting.createdBy}</StyledTableCell>
											<StyledTableCell align="right" numeric="true"
															 // component="a"
											>{"http://localhost:3000/availability/" + meeting.meetingId}
											</StyledTableCell>
										</StyledTableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={currentMeetings.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
		</ThemeProvider>
		</div>
	);
}
