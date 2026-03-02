import { TextField } from "@mui/material";

export default function SearchBar({  searchTerm, setSearchTerm }) {
  return (
    <TextField
      size="small"
      placeholder="Search by ID or Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ width: 280 }}
    />
  );
}