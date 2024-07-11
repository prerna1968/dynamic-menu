import React, { useEffect, useState } from 'react';
import { Menu, Spin } from 'antd';
import { getMenuTree } from '../services/api';

const { SubMenu } = Menu;

interface MenuItem {
    menuId: number;
    parentId: number | null;
    displayOrder: number;
    type: string;
    item: string;
    condition: string | null;
    description: string | null;
    insDateTime: string;
    insUser: string | null;
    insUserId: number;
    parent: string | null;
    recordStatus: string;
    script: string;
    transactionId: string;
    updDateTime: string;
    updUser: string;
    updUserId: number;
    children?: MenuItem[];
}

const MenuComponent: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const menuTree = await getMenuTree();
                console.log('Fetched menu tree:', menuTree); // Log fetched menu tree
                setMenuItems(menuTree);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching menu
            }
        };
        fetchMenu();
    }, []);

    const renderMenu = (items: MenuItem[]) => {
        return items.map(item => {
            if (item.children && item.children.length > 0) {
                return (
                    <SubMenu key={item.menuId.toString()} title={item.item}>
                        {renderMenu(item.children)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={item.menuId.toString()}>
                        {item.item}
                    </Menu.Item>
                );
            }
        });
    };

    if (loading) {
        return <Spin tip="Loading menu..." />;
    }

    return (
        <Menu mode="vertical" theme="dark">
            {menuItems.length > 0 ? renderMenu(menuItems) : <Menu.Item>No menu items found</Menu.Item>}
        </Menu>
    );
};

export default MenuComponent;
