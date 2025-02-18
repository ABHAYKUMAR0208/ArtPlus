import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
  fetchSaleProducts,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { toast } from "react-toastify";
import { getFeatureImages } from "@/store/common-slice";
import ReactPlayer from "react-player"; 
import { motion, useInView } from "framer-motion";

const categories = [
  { id: "dryerballs", label: "Dryer Balls" },
  { id: "feltballs", label: "Felt Balls" },
  { id: "craftsupplies", label: "Craft Supplies" },
  { id: "feltshoes", label: "Felt Shoes" },
  { id: "petproduction", label: "Pet Production" },
  { id: "decors", label: "Decors" },
  { id: "yarns", label: "Yarns" },
  { id: "fashion", label: "Fashion" },
];

function ShoppingHome() {
  const location = useLocation();
  const isHomePage = location.pathname === "/shop/home";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails, saleProducts } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList = [] } = useSelector((state) => state.commonFeature || {});
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px" });

  // Handle navigation to category listing page
  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  // Get product details
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // Add product to cart
  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart");
      }
    });
  }

  // Filter products added in the last week
  const getLastWeekProducts = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);
    return productList.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= oneWeekAgo;
    });
  };

  // Set up interval for carousel
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  // Fetch filtered products
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  // Fetch feature images
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Fetch sale products on component mount
  useEffect(() => {
    dispatch(fetchSaleProducts());
  }, [dispatch]);

  // Function to filter products on sale
  const getProductsOnSale = () => {
    return saleProducts;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Carousel Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[400px] overflow-hidden">
        {featureImageList && featureImageList.length > 0 ? featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            alt={`Slide ${index + 1}`}
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          />
        )) : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Template Section */}
      <section className="py-4  bg-gradient-to-r from-indigo-800 to-purple-600 mt-2">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white ">
            Shop Things You Love 🩶
          </h2>
          <h1 className="text-xl text-white mb-4">
            Discover Amazing Products with 🌍 Free Global Shipping
          </h1>
          <Button
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full shadow-lg"
            onClick={() => navigate("/shop/listing")}
          >
            Explore Now
          </Button>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((categoryItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


     {/* Wholesale Purchase */}
    <div ref={ref} className="flex justify-center my-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center my-8"
      >
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 shadow-lg hover:shadow-xl rounded-2xl max-w-4xl w-full transition-shadow duration-300">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl md:text-2xl font-semibold text-purple-800"
              >
                LOOKING FOR BULK ORDER?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-sm md:text-base text-purple-600 mt-1"
              >
                Make the most of our wholesale program.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                className="bg-purple-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base font-medium hover:bg-purple-800 transition-colors duration-300 transform hover:scale-105"
                onClick={() => navigate("/useful-links/wholesale")}
              >
                REQUEST QUOTE
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>


      {/* New Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">New Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getLastWeekProducts().length > 0 ? (
              getLastWeekProducts().map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                  key={productItem.id}
                />
              ))
            ) : (
              <p className="text-center">No products added in the 15 days.</p>
            )}
          </div>
        </div>
      </section>

      {/* Products on Sale Section (Conditional Rendering) */}
      {isHomePage && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Products on Sale</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getProductsOnSale().length > 0 ? (
                getProductsOnSale().map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    key={productItem.id}
                  />
                ))
              ) : (
                <p className="text-center">No products on sale.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Community Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* Left Content */}
            <div className="flex-1 text-gray-800">
              <h2 className="text-3xl font-bold mb-6">
                Crafting <span className="text-green-600">Sustainable Community</span>
              </h2>
              <p className="text-lg mb-4">
                Discover premium, ethically produced, and eco-friendly handcrafted felt supplies at ArtPlus Pvt. Ltd.
                From home decor to cozy shoes, novelty cat caves, rugs, yarns, and more, our range offers something for
                everyone.
              </p>
              <p className="text-lg mb-4">
                Our efforts have positively impacted over <strong>10,000+ families</strong> so far, empowering homemakers to
                become <a href="/useful-links/wholesale" className="text-blue-500 underline">skilled craftswomen</a>. With your every purchase,
                you contribute to building a sustainable community in Nepal.
              </p>
              <Button
                className="bg-green-600 text-white hover:bg-green-700 font-bold py-3 px-6 rounded-full shadow-lg"
                onClick={() => navigate("/about/career")}
              >
                Learn More
              </Button>
            </div>

            {/* Right Content - Video Player */}
            <div className="flex-1 w-full max-w-md">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                {!isPlaying ? (
                  <img
                    src="/feltvdo" // Replace with the actual image path
                    alt="Craftwomen"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                  />
                ) : (
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=06XCqFX1wq0"
                    playing={true}
                    controls={true}
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
