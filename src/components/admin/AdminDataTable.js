import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const AdminDataTable = ({
  columns,
  data,
  onRowClick,
  onEdit,
  onDelete,
  onView,
  selectable = false,
  selected = [],
  onSelectAll,
  onSelect,
  pagination = true,
  page = 0,
  rowsPerPage = 10,
  totalRows = 0,
  onPageChange,
  onRowsPerPageChange,
  emptyMessage = "No data available"
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRowId, setSelectedRowId] = React.useState(null);

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleAction = (action) => {
    if (action === 'edit' && onEdit) {
      onEdit(selectedRowId);
    } else if (action === 'delete' && onDelete) {
      onDelete(selectedRowId);
    } else if (action === 'view' && onView) {
      onView(selectedRowId);
    }
    handleMenuClose();
  };

  const renderCellContent = (value, column) => {
    switch (column.type) {
      case 'avatar':
        return <Avatar src={value} sx={{ width: 32, height: 32 }} />;
      case 'chip':
        return (
          <Chip
            label={value}
            color={column.getColor ? column.getColor(value) : 'default'}
            size="small"
            variant="outlined"
          />
        );
      case 'currency':
        return `₹${parseFloat(value).toFixed(2)}`;
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'image':
        return (
          <Box
            component="img"
            src={value}
            alt=""
            sx={{
              width: 40,
              height: 40,
              objectFit: 'cover',
              borderRadius: 1
            }}
          />
        );
      default:
        return value;
    }
  };

  return (
    <Paper elevation={1}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={onSelectAll}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{ fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onEdit || onDelete || onView) && (
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (selectable ? 1 : 0) + ((onEdit || onDelete || onView) ? 1 : 0)}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => onRowClick && onRowClick(row.id)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.indexOf(row.id) !== -1}
                        onChange={() => onSelect(row.id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {renderCellContent(row[column.id], column)}
                    </TableCell>
                  ))}
                  {(onEdit || onDelete || onView) && (
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuClick(e, row.id);
                        }}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {onView && (
          <MenuItem onClick={() => handleAction('view')}>
            <VisibilityIcon sx={{ mr: 1 }} fontSize="small" />
            View
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem onClick={() => handleAction('edit')}>
            <EditIcon sx={{ mr: 1 }} fontSize="small" />
            Edit
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
            Delete
          </MenuItem>
        )}
      </Menu>

      {/* Pagination */}
      {pagination && (
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </Paper>
  );
};

export default AdminDataTable;