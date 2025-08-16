import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function CustomPagination({ pageObj, onPageChange }) {
  const { page_size, max_products, paginator } = pageObj;
  const { current_page } = paginator;

  // Calcula o número de páginas
  const num_pages = Math.ceil(max_products / page_size);

  if (num_pages <= 1) return null; // não mostra nada se só tiver uma página

  return (
    <Stack spacing={2} alignItems="center" className="my-3">
      <Pagination
        count={num_pages}
        page={current_page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

export default CustomPagination;