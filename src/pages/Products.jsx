import { useEffect, useState } from "react";

import useStockRequest from "../services/useStockRequest";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProductModal from "../components/ProductModal";
import ProductTable from "../components/ProductTable";
import { useSelector } from "react-redux";
import TableSkeleton, {
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages";

const Products = () => {
  const { getStock } = useStockRequest();
  const { error, loading, products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const initialState = { categoryId: "", brandId: "", name: "" };

  const [info, setInfo] = useState(initialState);

  const handleClose = () => {
    setOpen(false);
    setInfo(initialState);
  };

  useEffect(() => {
    getStock("products");
    getStock("categories");
    getStock("brands");
  }, []);

  return (
    <div>
      <Typography variant="h4" color={"error"} mb={2}>
        Product
      </Typography>

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ mb: 3 }}
        disabled={error}
      >
        New Product
      </Button>
      {loading && <TableSkeleton />}
      {error && <ErrorMessage />}
      {!error && !loading && products.length > 0 && <ProductTable />}
      {!error && !products.length && <NoDataMessage />}

      <ProductModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
    </div>
  );
};

export default Products;
