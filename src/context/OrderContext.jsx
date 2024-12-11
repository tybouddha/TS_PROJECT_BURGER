import { createContext, useEffect, useRef, useState } from "react"
import { useMenu } from "../hooks/useMenu"
import { useBasket } from "../hooks/useBasket"
import { findObjectById } from "../utils/array"
import { EMPTY_PRODUCT } from "../enums/product"
import { useParams } from "react-router-dom"
import { initialiseUserSession } from "../components/pages/order/helpers/initialiseUserSession"

// 1. Création du context
const OrderContext = createContext({
  username: "",
  isModeAdmin: false,
  setIsModeAdmin: () => {},

  isCollapsed: false,
  setIsCollapsed: () => {},

  currentTabSelected: false,
  setCurrentTabSelected: () => {},

  menu: [],
  handleAdd: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  resetMenu: () => {},

  newProduct: {},
  setNewProduct: () => {},

  productSelected: {},
  setProductSelected: () => {},
  handleProductSelected: () => {},

  titleEditRef: {},

  basket: [],
  handleAddToBasket: () => {},
  handleDeleteBasketProduct: () => {},
})

export default OrderContext

// 2. Installation du context

export const OrderContextProvider = ({ children }) => {
  const [isModeAdmin, setIsModeAdmin] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentTabSelected, setCurrentTabSelected] = useState("add")
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT)
  const [productSelected, setProductSelected] = useState(EMPTY_PRODUCT)
  const titleEditRef = useRef()
  const { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu } = useMenu()
  const { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct } = useBasket()
  const { username } = useParams()

  const handleProductSelected = async (idProductClicked) => {
    const productClickedOn = findObjectById(idProductClicked, menu)
    await setIsCollapsed(false)
    await setCurrentTabSelected("edit")
    await setProductSelected(productClickedOn)
    titleEditRef.current.focus()
  }

  useEffect(() => {
    initialiseUserSession(username, setMenu, setBasket)
  }, [])

  const orderContextValue = {
    username,
    isModeAdmin,
    setIsModeAdmin,
    isCollapsed,
    setIsCollapsed,
    currentTabSelected,
    setCurrentTabSelected,
    menu,
    handleAdd,
    handleDelete,
    resetMenu,
    newProduct,
    setNewProduct,
    productSelected,
    setProductSelected,
    handleEdit,
    titleEditRef,
    basket,
    handleAddToBasket,
    handleDeleteBasketProduct,
    handleProductSelected,
  }

  return <OrderContext.Provider value={orderContextValue}>{children}</OrderContext.Provider>
}

// 3. Consommation du context
