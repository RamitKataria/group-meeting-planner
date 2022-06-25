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


const formatStringtoDate = (date) => {
	const [dateValues, timeValues] = date.split(' ');

	const [month, day, year] = dateValues.split('-');
	const [hours, minutes, seconds] = timeValues.split(':');
	return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
}

const formatDatetoString = (date) => {
	return String(date.getMonth()).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0') + "-"
		+ date.getFullYear() + " " + String(date.getHours()).padStart(2, '0') + ":" +String(date.getMinutes()).padStart(2, '0');
}

function createData(meetingId, name, date, link, status) {
	return {
		meetingId: meetingId,
		name: name,
		dateCreated: formatStringtoDate(date),
		link: link,
		status: status,
	};
}

const rows = [
	createData("1001", "Hiking Day", "09-04-2021 07:30:34", "google.com",
		"More Info"),
	createData("1002", "Boxing Day", "10-04-2021 07:30:34",
		"yahoo.com", "More Info"),
	createData("1003", "Christmas Party", "11-04-2021 07:30:34",
		"amazon.com", "More Info"),
	createData("1004", "Brainstorming Day", "12-04-2021 07:30:34",
		"reddit.com", "More Info"),
	createData("1005", "Hiking Day", "09-04-2021 07:30:34", "google.com",
		"More Info"),
	createData("1006", "Boxing Day", "10-04-2021 07:30:34",
		"yahoo.com", "More Info"),
	createData("1007", "Christmas Party", "11-04-2021 07:30:34",
		"amazon.com", "More Info"),
	createData("1008", "Brainstorming Day", "12-04-2021 07:30:34",
		"reddit.com", "More Info"),
	createData("1009", "Hiking Day", "09-04-2021 07:30:34", "google.com",
		"More Info"),
	createData("1010", "Boxing Day", "10-04-2021 07:30:34",
		"yahoo.com", "More Info"),
	createData("1011", "Christmas Party", "11-04-2021 07:30:34",
		"amazon.com", "More Info"),
	createData("1012", "Brainstorming Day", "12-04-2021 07:30:34",
		"reddit.com", "More Info")
];

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
		id: "meetingId",
		numeric: false,
		disablePadding: true,
		label: "Meeting ID"
	},
	{
		id: "name",
		numeric: true,
		disablePadding: false,
		label: "Meeting Name"
	},
	{
		id: "dateCreated",
		numeric: true,
		disablePadding: false,
		label: "Date & Time Created"
	},
	{
		id: "link",
		numeric: true,
		disablePadding: false,
		label: "Meeting Link"
	},
	{
		id: "status",
		numeric: true,
		disablePadding: false,
		label: "Meeting Status"
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
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("meetingId");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.meetingId);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

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
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<div className="">
		<ThemeProvider theme={theme}>
			<Typography
				sx={{ flex: '1 1 100%', fontWeight: 'bold', margin: "3% 0", "text-align": "center"}}
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
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.meetingId);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<StyledTableRow
											hover
											onClick={(event) => handleClick(event, row.meetingId)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.meetingId}
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
												component="th"
												id={labelId}
												scope="row"
												padding="none"
												align="right"
											>
												{row.meetingId}
											</StyledTableCell>
											<StyledTableCell align="right">{row.name}</StyledTableCell>
											<StyledTableCell align="right">{formatDatetoString(row.dateCreated)}</StyledTableCell>
											<StyledTableCell align="right" numeric component="a" href={row.link}>{row.link}</StyledTableCell>
											<StyledTableCell align="right" numeric component="a" href={row.status}>{row.status}</StyledTableCell>
										</StyledTableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			{/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
		</Box>
		</ThemeProvider>
		</div>
	);
}
