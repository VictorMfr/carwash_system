'use client';

import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider } from "@mui/material";
import {
    AttachMoney,
    BarChart,
    Build,
    Home,
    Inventory,
    People,
    ProductionQuantityLimits,
    ExpandLess,
    ExpandMore,
    AccountBalance,
    Payment,
    DirectionsCar,
    Engineering,
    Assignment,
    LocalShipping,
    Business,
    Category,
    Assessment,
    PersonAdd,
    Receipt,
    BuildCircle,
    DirectionsCarFilled,
    ModelTraining,
    BusinessCenter,
    Group,
    SupportAgent,
    MenuBook,
    TwoWheeler,
    DirectionsBus,
    LocalGasStation,
    Speed,
    EngineeringOutlined,
    AssignmentInd,
    LocalCarWash,
    BuildOutlined,
    CategoryOutlined,
    BusinessOutlined,
    Settings,
    Notifications
} from "@mui/icons-material";
import NavBarHeader from "./NavBarHeader";
import Link from "next/link";
import useNavBarController from "./useNavBarController";

export default function NavBar() {

    const controller = useNavBarController();

    return (
        <List>
            <NavBarHeader />
            {/* Dashboard */}
            <Link href="/dashboard">
                <ListItemButton sx={{ borderRadius: '5px' }}>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                </ListItemButton>
            </Link>

            {/* Users */}
            <Link href="/dashboard/users">
                <ListItemButton sx={{ borderRadius: '5px' }}>
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItemButton>
            </Link>

            {/* Roles */}
            <Link href="/dashboard/roles">
                <ListItemButton sx={{ borderRadius: '5px' }}>
                    <ListItemIcon>
                        <AssignmentInd />
                    </ListItemIcon>
                    <ListItemText primary="Roles" />
                </ListItemButton>
            </Link>

            {/* Inventory Dashboard - Nested List */}
            <ListItemButton onClick={controller.handleInventoryClick} sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <Inventory />
                </ListItemIcon>
                <ListItemText primary="Inventario" />
                {controller.inventoryOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={controller.inventoryOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* Inventory */}
                    <Link href="/dashboard/stock">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <Inventory />
                            </ListItemIcon>
                            <ListItemText primary="Inventario" />
                        </ListItemButton>
                    </Link>

                    {/* Products */}
                    <Link href="/dashboard/stock/product">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <ProductionQuantityLimits />
                            </ListItemIcon>
                            <ListItemText primary="Productos" />
                        </ListItemButton>
                    </Link>

                    {/* Brands */}
                    <Link href="/dashboard/stock/brand">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <Business />
                            </ListItemIcon>
                            <ListItemText primary="Marcas" />
                        </ListItemButton>
                    </Link>

                    {/* States */}
                    <Link href="/dashboard/stock/state">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <Assessment />
                            </ListItemIcon>
                            <ListItemText primary="Estados" />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>


            {/* Finance - Nested List */}
            <ListItemButton onClick={controller.handleFinanceClick} sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <AttachMoney />
                </ListItemIcon>
                <ListItemText primary="Finanzas" />
                {controller.financeOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={controller.financeOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* Dashboard */}
                    <Link href="/dashboard/finance">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <AttachMoney />
                            </ListItemIcon>
                            <ListItemText primary="Transacciones" />
                        </ListItemButton>
                    </Link>

                    {/* Accounts */}
                    <Link href="/dashboard/finance/account">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <AccountBalance />
                            </ListItemIcon>
                            <ListItemText primary="Cuentas" />
                        </ListItemButton>
                    </Link>

                    {/* Payment Methods */}
                    <Link href="/dashboard/finance/method">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <Payment />
                            </ListItemIcon>
                            <ListItemText primary="Métodos de pago" />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>

            {/* Services - Nested List */}
            <ListItemButton onClick={controller.handleServicesClick} sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <LocalCarWash />
                </ListItemIcon>
                <ListItemText primary="Servicios" />
                {controller.servicesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={controller.servicesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/* Services Dashboard */}
                    <Link href="/dashboard/service">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <LocalCarWash />
                            </ListItemIcon>
                            <ListItemText primary="Operaciones" />
                        </ListItemButton>
                    </Link>

                    {/* Operators */}
                    <Link href="/dashboard/service/operator">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <Engineering />
                            </ListItemIcon>
                            <ListItemText primary="Operadores" />
                        </ListItemButton>
                    </Link>

                    {/* Recipes */}
                    <Link href="/dashboard/service/recipe">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <MenuBook />
                            </ListItemIcon>
                            <ListItemText primary="Recetas" />
                        </ListItemButton>
                    </Link>

                    {/* Vehicle */}
                    <Link href="/dashboard/service/vehicle">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <DirectionsCar />
                            </ListItemIcon>
                            <ListItemText primary="Vehículos" />
                        </ListItemButton>
                    </Link>

                    {/* Vehicle Models */}
                    <Link href="/dashboard/service/vehicle/model">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <ModelTraining />
                            </ListItemIcon>
                            <ListItemText primary="Modelos" />
                        </ListItemButton>
                    </Link>

                    {/* Vehicle Brands */}
                    <Link href="/dashboard/service/vehicle/brand">
                        <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                            <ListItemIcon>
                                <BusinessCenter />
                            </ListItemIcon>
                            <ListItemText primary="Marcas de vehículos" />
                        </ListItemButton>
                    </Link>
                </List>
                {/* Clients */}
                <Link href="/dashboard/client">
                    <ListItemButton sx={{ pl: 4, borderRadius: '5px' }}>
                        <ListItemIcon>
                            <Group />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                    </ListItemButton>
                </Link>
            </Collapse>

        <Divider />

        {/* Settings */}
        <Link href="/dashboard/settings">
            <ListItemButton sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary="Configuración" />
            </ListItemButton>
        </Link>

        {/* Notifications */}
        <Link href="/dashboard/notification">
            <ListItemButton sx={{ borderRadius: '5px' }}>
                <ListItemIcon>
                    <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notificaciones" />
            </ListItemButton>
        </Link>


        </List>
    )
}