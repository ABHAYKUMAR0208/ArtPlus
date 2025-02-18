
export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "dryerballs", label: "Dryer Balls" },
        { id: "feltballs", label: "Felt Balls" },
        { id: "craftsupplies", label: "Craft Supplies" },
        { id: "feltshoes", label: "Felt Shoes" },
        { id: "petproduction", label: "Pet Production" },
        { id: "decors", label: "Decors" },
        { id: "rugs", label: "Rugs" },
        { id: "yarns", label: "Yarns" },
        { id: "fashion", label: "Fashion" },
        { id: "yogamats", label: "Yoga Mats" },
        { id: "colorchart", label: "Color Chart" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [{ id: "artplus", label: "Art Plus" }],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "dryerballs",
      label: "Dryer Balls",
      path: "/shop/listing",
    },
    {
      id: "feltballs",
      label: "Felt Balls",
      path: "/shop/listing",
    },
    {
      id: "craftsupplies",
      label: "Craft Supplies",
      path: "/shop/listing",
    },
    {
      id: "petproduction",
      label: "Pet Production",
      path: "/shop/listing",
    },
    {
      id: "feltshoes",
      label: "Felt Shoes",
      path: "/shop/listing",
    },
    {
      id: "decors",
      label: "Decors",
      path: "/shop/listing",
    },
    {
      id: "rugs",
      label: "Rugs",
      path: "/shop/listing",
    },
    {
      id: "yarns",
      label: "Yarns",
      path: "/shop/listing",
    },
    {
      id: "fashion",
      label: "Fashion",
      path: "/shop/listing",
    },
    {
      id: "yogamats",
      label: "Yoga Mats",
      path: "/shop/listing",
    },
    {
      id: "colorchart",
      label: "Color Chart",
      path: "/shop/listing",
    },
  ];
  
  export const categoryOptionsMap = {
    dryerballs: "Dryer Balls",
    feltballs: "Felt Balls", 
    craftsupplies: "Craft Supplies",
    feltshoes: "Felt Shoes",
    petproduction: "Pet Production",
    decors: "Decors",
    rugs: "Rugs",
    yarns: "Yarns",
    fashion: "Fashion",
    yogamats: "Yoga Mats",
    colorchart: "Color Chart",
  };
  
  export const brandOptionsMap = {
    artplus: "Art Plus", // This maps the brand correctly
  };
  

  export const filterOptions = {
    Category: [
      { id: "dryerballs", label: "Dryer Balls" },
      { id: "feltballs", label: "Felt Balls" },
      { id: "craftsupplies", label: "Craft Supplies" },
      { id: "feltshoes", label: "Felt Shoes" },
      { id: "petproduction", label: "Pet Production" },
      { id: "decors", label: "Decors" },
      { id: "rugs", label: "Rugs" },
      { id: "yarns", label: "Yarns" },
      { id: "fashion", label: "Fashion" },
      { id: "yogamats", label: "Yoga Mats" },
      { id: "colorchart", label: "Color Chart" },
    ],
    Brand: [
      { id: "artplus", label: "Art Plus" },
    ],
  };
  
  // export const decorsFilterOptions = {
  //   Category: [
  //     { id: "Trivate & Coaster", label: "Trivate & Coaster" },
  //     { id: "Stone Pouf/Stool", label: "Stone Pouf/Stool" },
  //     { id: "Chair Pads", label: "Chair Pads" },
  //     { id: "Felt Baskets", label: "Felt Baskets" },
  //     { id: "Felt Flowers & Plants", label: "Felt Flowers & Plants" },
  //     { id: "Felt Cusions", label: "Felt Cusions" },
  //     { id: "Mobile Hangers", label: "Mobile Hangers" },
  //     { id: "Wreath", label: "Wreath" },
  //     { id: "Christmas Tree Skirt", label: "Christmas Tree Skirt" },
  //     { id: "Felt Garland", label: "Felt Garland" },
  //   ],
  // };
  
  export const sortOptions = [
    
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];