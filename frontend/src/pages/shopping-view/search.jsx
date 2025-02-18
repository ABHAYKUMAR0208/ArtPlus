import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { toast } from "react-toastify"; 
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { useLocation, useNavigate } from "react-router-dom"; 

function SearchProducts() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} quantity can be added for this item`); 
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart"); 
      }
    });
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleSearch = (keyword) => {
    if (keyword && keyword.trim() !== "") {
      dispatch(getSearchResults(keyword));
      navigate(`?search=${encodeURIComponent(keyword)}`); 
    } else {
      dispatch(resetSearchResults());
      navigate('/'); 
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('search');
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [location.search]); 

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          {/* <Input
            onChange={(event) => handleSearch(event.target.value)} 
            className="py-6"
            placeholder="Search Products..."
          /> */}
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
            key={item.id}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;